// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LuxeRacingTricolore is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;
  mapping(string => uint8) existingURIs;
  uint256 public totalSupply = 500;
  address public sender;
  address payable public nftOwner;

  address LuxeToken = 0xAF8A43D8a80DEb18B29ffa370ed84cF0Bf387Ae6;

  address mintSmall = payable(0x4aeaD0847A9018eADe64051073593c4B4E0B8142);
  address mintBig = payable(0xa957A7F4d684966909680119a0CB06a593dC0645);
  address royalty = payable(0x1Aef2e32563B98480173014509352532D9a507a9);

  constructor() ERC721("LuxeRacingNFT Tricolore", "LUXETRICOLORE") {
    sender = msg.sender;
  }

  function payoutToSeller() public payable {
    if (msg.sender == sender) {
      nftOwner.transfer(address(this).balance);
    }
  }

  function _baseURI() internal pure override returns (string memory) {
    return
      "https://gateway.pinata.cloud/ipfs/QmazVoGFKpbr2js23Mio8rxQpsR2sAhLY7SAtK2xpyS7vX/";
  }

  function safeMint(address to, string memory uri) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
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

  function isContentOwned(string memory uri) public view returns (bool) {
    return existingURIs[uri] == 1;
  }

  function payToMint(address recipient, uint8[] memory metadataURIs)
    public
    payable
    returns (uint256[] memory)
  {
    uint256 currentCount = count();

    // check if price is paid
    uint256 iterCount = metadataURIs.length;

    uint256[] memory newItemsIds = new uint256[](iterCount);

    // for every metadataURI
    for (uint8 i = 0; i < iterCount; i++) {
      string memory metadataURI = Strings.toString(
        metadataURIs[i] + currentCount
      );
      require(existingURIs[metadataURI] != 1, "NFT already minted!");
      uint256 newItemId = _tokenIdCounter.current() + 1;
      _tokenIdCounter.increment();
      _mint(recipient, newItemId);
      _setTokenURI(newItemId, metadataURI);
      existingURIs[metadataURI] = 1;
      newItemsIds[i] = newItemId;
    }

    payoutToSeller();
    if (isAllowListActive) {
      _allowList[msg.sender] = false;
    }
    return newItemsIds;
  }

  function count() public view returns (uint256) {
    return _tokenIdCounter.current() + 1;
  }

  function luxeMint() public payable returns (uint256[] memory) {
    if (isAllowListActive) {
      require(_allowList[msg.sender] == true, "Not on allowedlist");
    }
    ERC20 token = ERC20(LuxeToken);
    token.transferFrom(msg.sender, mintBig, 145500 * 10**18);
    token.transferFrom(msg.sender, mintSmall, 4500 * 10**18);
    return payToMint(msg.sender, new uint8[](1));
  }

  mapping(address => bool) private _allowList;
  bool public isAllowListActive = false;

  function setIsAllowListActive(bool _isAllowListActive) external onlyOwner {
    isAllowListActive = _isAllowListActive;
  }

  function setAllowList(address[] calldata addresses) external onlyOwner {
    for (uint256 i = 0; i < addresses.length; i++) {
      _allowList[addresses[i]] = true;
    }
  }

  event NftBought(address _seller, address _buyer, uint256 _price);

  mapping(uint256 => uint256) public tokenIdToPrice;

  function allowBuy(uint256 _tokenId, uint256 _price) external {
    require(msg.sender == ownerOf(_tokenId), "Not owner of this token");
    require(_price > 0, "Price zero");
    tokenIdToPrice[_tokenId] = _price;
  }

  function disallowBuy(uint256 _tokenId) external {
    require(msg.sender == ownerOf(_tokenId), "Not owner of this token");
    tokenIdToPrice[_tokenId] = 0;
  }

  function buyWithRoyalty(uint256 _tokenId) external payable {
    uint256 price = tokenIdToPrice[_tokenId];
    require(price > 0, "This token is not for sale");
    require(msg.value >= price, "Incorrect value");

    address seller = ownerOf(_tokenId);
    _transfer(seller, msg.sender, _tokenId);
    tokenIdToPrice[_tokenId] = 0; // not for sale anymore
    payable(seller).transfer((msg.value * 97) / 100);
    payable(royalty).transfer((msg.value * 3) / 100);
  }

  function buy(uint256 _tokenId) external payable {
    uint256 price = tokenIdToPrice[_tokenId];
    require(price > 0, "This token is not for sale");
    require(msg.value >= price, "Incorrect value");
    address seller = ownerOf(_tokenId);
    _transfer(seller, msg.sender, _tokenId);
    tokenIdToPrice[_tokenId] = 0; // not for sale anymore
    payable(seller).transfer(msg.value);
  }
}
