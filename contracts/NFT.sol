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
    mapping(uint256 => address) private mintedIdToAddress;

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
        address recipient,
        string memory metadataURI,
        uint price
    ) public payable returns (uint256) {
        require(existingURIs[metadataURI] == false, 'NFT already minted!');
        require (price >= 20 ether, 'Price is at least 20!');
        require (msg.value >= price, 'Need to pay up!');

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = true;
        mintedIdToAddress[newItemId] = recipient;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }

    // Get NFTs I own
    function fetchMyNfts() public view returns (uint256[] memory) {
        uint totalMintedCount = _tokenIdCounter.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalMintedCount; i++) {
            if (mintedIdToAddress[i] == msg.sender) {
                itemCount += 1;
            }
        } 

        uint256[] memory items = new uint256[](itemCount);
        for (uint i = 0; i < totalMintedCount; i++) {
            if (mintedIdToAddress[i] == msg.sender) {
                items[currentIndex] = i;
                currentIndex += 1;
            }
        } 

        return items;
    }

    function getBalance() public onlyOwner view returns (uint) {
        return address(this).balance;
    }

    function transferFunds() public onlyOwner {
        owner.transfer(getBalance());
    }
}