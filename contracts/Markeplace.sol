// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

// OpenZeppelin Helper Contracts For Counters & Reentrancy Guard
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// NFT contract to inherit from.
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Makes Debugging Easy
import "hardhat/console.sol";
import "https://github.com/AFKDAO/ERC4610/blob/main/contracts/ERC4610.sol";

contract Rental is ReentrancyGuard {

      // We will use counters for tracking itemIds, itemsRented & itemsPaidBack
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsRented;
  Counters.Counter private _itemsPaidBack;

  // Address of Contract Owner
  address payable owner;

  // listingPrice -> Price The Seller Needs To Pay For Listing In This NFT Rental Marketplace 
  uint256 listingPrice = 0.025 ether;


  /// @notice Constructor function initializes the owner of the contract
  /// @dev The contract deployer is assigned as the owner of the contract. The address of owner is stored as payable to enable owner to receive the ether stored in contract
  constructor() {
    owner = payable(msg.sender);
  }

  // MarketItem Struct Is Used To Track Details Of NFTs Listed
  struct MarketItem {
      uint itemId;
      bool isActive;
      address NFTContract;
      uint256 tokenId;
      address payable seller;
      address payable renter;
      uint256 rental_price;
      uint256 collateral_price;
      uint256 expiresAt;
    }
  
  // A mapping from an itemId => MarketItem Struct. 
  // Store the tokenId of the listed NFT item and reference it later.
  mapping(uint256 => MarketItem) private idToMarketItem;

  // Event To Show NFT Item has been listed in the marketplace 
  event MarketItemCreated (
    uint indexed itemId,
    bool isActive,
    address indexed NFTContract,
    uint256 indexed tokenId,
    address seller,
    address renter,
    uint256 rental_price,
    uint256 collateral_price,
    uint256 expiresAt
  );

  /// @notice View Listing Fee to list the NFTs
  /// @dev public view function to return the listing fee of the contract
  /// @return listingPrice - returns the listing price of the contract
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  /// @notice Set Listing Fee of the contract
  /// @dev Only Owner of the contract will be able to access this function to set the listing fee of the contract
  /// OnlyOwner ensures that only the owner of the contract will be able to access this function.
  function setListingPrice(uint256 _listingPrice) external onlyOwner{
    listingPrice = _listingPrice ;
  }
  
  /// @notice List the NFT in the marketplace by paying listing fee and sending all input parameters
  /// @dev Lists the NFT in the marketplace by creating itemId, marketItem struct and creating a mapping between the two. 
  /// @dev NFT is transferred from the owner to the marketplace. 
  /// @dev Payable Function To Receive The Lisiting Fees. 
  /// @dev nonReentrant is used to prevent reentrancy attack
  /// @param nftContract -> Contract Address of the NFT the user is listing in the marketplace
  /// @param tokenId -> tokenId of the NFT in the NFT Contract
  /// @param rental_price -> The price the renter needs to pay to rent the NFT for the rental duration
  /// @param expiresAt -> Time in seconds, to set the rental duration of the NFT
  function createMarketItem(address nftContract, uint256 tokenId, uint256 rental_price, uint256 collateral_price, uint256 expiresAt ) public payable nonReentrant 
  {
    
    require(rental_price > 0, "Rental Price must be at least 1 wei");
    require(collateral_price > 0, "Rental Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _itemIds.increment();
    uint256 itemId = _itemIds.current();
    

    idToMarketItem[itemId] =  MarketItem(
      itemId,
      false,
      address(nftContract),
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      rental_price,
      collateral_price,
      expiresAt
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    payable(owner).transfer(listingPrice);

    emit MarketItemCreated(
      itemId,
      false,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      rental_price,
      collateral_price,
      expiresAt
    );

  }

  
  /// @notice Renters can use this function to rent NFTs listed in the marketplace
  /// @dev Payable Function To Receive The Renting Fee Of NFT
  /// @dev nonReentrant is used to prevent reentrancy attack
  /// @dev Transfers Renting Fee From Renter To Seller
  /// @dev Transfers ownership of the NFT to renter, as well as funds between parties.
  /// @dev Sets The Rental Status Of NFT to TRUE in NFT Contract. 
  /// @param itemId -> itemId of the NFT in the marketplace
  function rentMarketItem(
    uint256 itemId
    ) public payable nonReentrant {
      MarketItem storage _rental = idToMarketItem[itemId];
      uint rental_price = _rental.rental_price;
      uint collateral_price = _rental.collateral_price;
      uint tokenId = _rental.tokenId;

      require(msg.value == rental_price + collateral_price, "Please submit the asking price in order to complete the purchase");
      require(IERC721(_rental.NFTContract).ownerOf(tokenId) == address(this), "This Token Is Not Available For Rent");
      
      _rental.seller.transfer(rental_price);
      payable(address(this)).transfer(collateral_price);

      idToMarketItem[itemId].expiresAt = idToMarketItem[itemId].expiresAt + block.timestamp;
      idToMarketItem[itemId].renter = payable(msg.sender);
      idToMarketItem[itemId].isActive = true;
      _itemsRented.increment();
      
      IERC721(_rental.NFTContract).transferFrom(address(this), msg.sender, tokenId);
            
  }

  /// @notice Anyone can call this function to return the rented NFTs that have crossed expiry time 
  /// @dev Transfers ownership of the NFT from renter to seller
  /// @dev nonReentrant is used to prevent reentrancy attack
  /// @dev Sets The Rental Status Of NFT to FALSE in NFT Contract
  /// @dev Performs Transfer of NFT From Renter To Seller
  /// @dev Deletes The MarketItem from The Mapping, thus delisting the NFT from the marketplace
  /// @param itemId -> itemId of the NFT in the marketplace
  function finishRenting(uint256 itemId) external nonReentrant
  {
        
        MarketItem storage _rental = idToMarketItem[itemId];
        
        require(
            msg.sender == _rental.renter &&
                block.timestamp <= _rental.expiresAt,
            "RentableNFT: you are not the renter"
        );

        require(_rental.isActive, "NFT is not on rent");
        
        _rental.isActive = false;
        // (bool success, ) = (_rental.NFTContract).call(
        //       abi.encodeWithSignature("modifyRental(bool,uint256)", false, _rental.tokenId)
        // );
        // require(success);

        // (bool success2, ) = (_rental.NFTContract).call(
        //       abi.encodeWithSignature("performTokenTransfer(address,address,uint256)", _rental.renter, _rental.seller, _rental.tokenId)
        // );
        // require(success2);

        IERC721(_rental.NFTContract).transferFrom(msg.sender, address(this), _rental.tokenId);
        _rental.renter.transfer(_rental.collateral_price);

        console.log("Renter Address From Contract-> ", _rental.renter);
        console.log("Seller Address From Contract-> ", _rental.seller);
        
        _itemsPaidBack.increment();
        delete idToMarketItem[itemId];        

    }

    
  /// @notice Returns all items listed for rent in marketplace 
  /// @dev View function that loops through all listed items in the marketplace, and returns that in an arrray
  /// @return MarketItem Array -> Array of all items listed in the marketplace
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsRented.current();
    uint currentIndex = 0;
    
    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    console.log("Address Zero",address(0));
    for (uint i = 0; i < itemCount; i++) {

      console.log("Item ID",idToMarketItem[i + 1].itemId);
      console.log("Item Renter",idToMarketItem[i + 1].renter);
      
      if ( (idToMarketItem[i + 1].itemId != 0) && (idToMarketItem[i + 1].renter == address(0)) ) {

        uint currentId = i + 1;
        console.log("Item On Market", i);
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;

      }

    }
    return items;
  }

  /// @notice Returns only items that a user owns
  /// @dev View function that loops through all listed items in the marketplace, and returns an arrray of items where user is the seller
  /// @return MarketItem Array -> An arrray of items where user is the seller
  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /// @notice Returns only items that a user has rented
  /// @dev View function that loops through all listed items in the marketplace, and returns an arrray of items where user is the renter
  /// @return MarketItem Array -> An arrray of items where user is the renter
  function fetchRentedNFTs() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].renter == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].renter == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /// @notice Returns only items that is past the rental duration
  /// @dev View function that loops through all listed items in the marketplace, and returns an arrray of items where the item has crossed the rental duration
  /// @return MarketItem Array -> An arrray of items where the item has crossed the rental duration
  function fetchItemsClaimable() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;


    console.log("Time Now", block.timestamp);

    for (uint i = 0; i < totalItemCount; i++) {
      // Rent is Active && Time Has Crossed
      if (idToMarketItem[i + 1].isActive && idToMarketItem[i + 1].expiresAt <= block.timestamp) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].isActive && idToMarketItem[i + 1].expiresAt <= block.timestamp) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
  
  /// @notice Modifier Used To Restrict Access Of Certain Functions Only To Owner
  /// @dev Function Caller is checked against the owner of the contract  
  modifier onlyOwner() {
      
      require(msg.sender == owner, "Only Owner Can Access This Function");
      _;

  }


}
