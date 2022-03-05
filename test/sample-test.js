const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT minting", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy()
    await nft.deployed()

    const nftPrice = ethers.utils.parseUnits('20', 'ether')
    const metadataURI = 'cid/test.png';
    const metadataURI2 = 'cid/test2.png';
    const [, buyerAddress, secondBuyerAddress] = await ethers.getSigners()

    let balance = await nft.balanceOf(buyerAddress.address);
    expect(balance).to.equal(0);

    const mintedToken = await nft.connect(buyerAddress).payToMint(metadataURI, nftPrice, {value: ethers.utils.parseEther('100')})
    await mintedToken.wait()

    balance = await nft.balanceOf(buyerAddress.address);
    expect(balance).to.equal(1);

    let myNftList = await nft.connect(buyerAddress.address).fetchMyNfts()
    console.log(myNftList);
    expect(myNftList.length).to.equal(1);

    const mintedToken2 = await nft.connect(secondBuyerAddress).payToMint(metadataURI2, nftPrice, {value: ethers.utils.parseEther('100')})
    await mintedToken2.wait()

    balance = await nft.balanceOf(secondBuyerAddress.address);
    expect(balance).to.equal(1);

    myNftList = await nft.connect(buyerAddress.address).fetchMyNfts()
    console.log(myNftList);
    expect(myNftList.length).to.equal(1);

    expect(await nft.isContentOwned(metadataURI)).to.equal(true)

    const contractBalance = await nft.getBalance()
    console.log(ethers.utils.formatEther(contractBalance));

    await nft.transferFunds()
    
  });
});
