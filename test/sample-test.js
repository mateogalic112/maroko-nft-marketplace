const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT minting", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy()
    await nft.deployed()

    const nftPrice = ethers.utils.parseUnits('20', 'ether')
    const metadataURI = 'cid/test.png';
    const [, , , buyerAddress] = await ethers.getSigners()

    let balance = await nft.balanceOf(buyerAddress.address);
    expect(balance).to.equal(0);

    const mintedToken = await nft.payToMint(buyerAddress.address, metadataURI, nftPrice, {value: ethers.utils.parseEther('100')})
    await mintedToken.wait()

    balance = await nft.balanceOf(buyerAddress.address);
    expect(balance).to.equal(1);

    const myNftList = await nft.connect(buyerAddress.address).fetchMyNfts()
    expect(myNftList.length).to.equal(1);

    expect(await nft.isContentOwned(metadataURI)).to.equal(true)

    const contractBalance = await nft.getBalance()
    console.log(ethers.utils.formatEther(contractBalance));

    await nft.transferFunds()
    
  });
});
