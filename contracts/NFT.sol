// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
    // keep count of minted tokens
    mapping(string => bool) existingURIs;
    // keep track who owns which token
    mapping(address => uint256[]) myNfts;
    // _paused is used to pause the contract in case of an emergency
    bool public _paused;
    // maximum token supply
    uint256 public maxTokenIds = 300;
    // total number of tokenIds minted
    uint256 public tokenIds;

    constructor() ERC721("Maroko Design", "MRK") {}

    modifier onlyWhenNotPaused() {
        require(!_paused, "Contract currently paused!");
        _;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    // Get NFTs I own
    function fetchMyNfts() external view returns (uint256[] memory) {
        return myNfts[msg.sender];
    }

    // Check if NFT is already minted
    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == true;
    }

    // Mint NFT
    function payToMint(string memory metadataURI, uint256 price)
        public
        payable
        onlyWhenNotPaused
        returns (uint256)
    {
        require(tokenIds < maxTokenIds, "Exceed maximum Maroko supply");
        require(existingURIs[metadataURI] == false, "NFT already minted!");
        require(msg.value >= price, "Need to pay up!");

        tokenIds += 1;
        existingURIs[metadataURI] = true;
        myNfts[msg.sender].push(tokenIds);

        _safeMint(msg.sender, tokenIds);

        return tokenIds;
    }

    function setPaused(bool paused) public onlyOwner {
        _paused = paused;
    }

    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function transferFunds() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
