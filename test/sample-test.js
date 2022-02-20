const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT minting", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy()
    await nft.deployed()

    const nftPrice = ethers.utils.parseUnits('20', 'ether')

    const recipient = '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199';
    const metadataURI = 'cid/test.png';

    let balance = await nft.balanceOf(recipient);
    expect(balance).to.equal(0);

    const mintedToken = await nft.payToMint(recipient, metadataURI, nftPrice, {value: ethers.utils.parseEther('100')})
    await mintedToken.wait()

    balance = await nft.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await nft.isContentOwned(metadataURI)).to.equal(true)

    const contractBalance = await nft.getBalance()
    console.log(ethers.utils.formatEther(contractBalance));

    await nft.transferFunds()
    
  });
});
