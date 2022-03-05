// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // keep count of minted tokens 
    mapping(string => bool) existingURIs;

    // keep track who owns which token
    mapping(address => uint256[]) myNfts;

    address payable owner;

    constructor() ERC721("Maroko Design", "MRK") {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        existingURIs[uri] = true;
        myNfts[to].push(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

     // Get NFTs I own
    function fetchMyNfts() external view returns (uint256[] memory) {
        return myNfts[msg.sender];
    }

    // Check if NFT is already minted
    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == true;
    }

    // Get total number of minted NFTs
    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // Mint NFT
    function payToMint(
        string memory metadataURI,
        uint price
    ) public payable returns (uint256) {
        require(existingURIs[metadataURI] == false, 'NFT already minted!');
        require (price >= 20 ether, 'Price is at least 20!');
        require (msg.value >= price, 'Need to pay up!');

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = true;
        myNfts[msg.sender].push(newItemId);

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }

    function getBalance() public onlyOwner view returns (uint) {
        return address(this).balance;
    }

    function transferFunds() public onlyOwner {
        owner.transfer(getBalance());
    }
}