// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ProofOfEngagement is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using Address for address payable;
    using Strings for uint256;

    Counters.Counter private tokenCounter;

    string private baseURI;

    string private collectionURI;
    
    string public provenanceHash;
 
    // ============ CUSTOMIZE VALUES BELOW ============
    // uint256 public constant MAX_TOTAL_SUPPLY = 8000;

    // ==================== EVENTS ====================
    event SetBaseURI(string indexed uri);

    event SetCollectionURI(string indexed uri);

    event Withdraw(address indexed dest);

    event WithdrawToken(address indexed tokenAddress, address indexed dest);

    // ================================================

    constructor(string _name, string _symbol) ERC721(_name, _symbol)
    {}

    // ============ ACCESS CONTROL MODIFIERS ============
    modifier canMint(uint256 numberOfTokens) {
        require(
            tokenCounter.current() + numberOfTokens <=
                MAX_TOTAL_SUPPLY - MAX_RESERVE_TOKENS + numReservedTokens,
            "Insufficient tokens remaining"
        );
        _;
    }

    modifier hasAddresses(address[] calldata addresses) {
        require(addresses.length > 0, "Addresses array empty");
        _;
    }

    modifier isExistingToken(uint256 tokenId) {
        require(_exists(tokenId), "Non-existent token");
        _;
    }

    // ============ PUBLIC FUNCTIONS FOR MINTING ============
    // /**
    //  * @dev gift token directly to list of recipients
    //  */
    // function giftTokens(address[] calldata addresses)
    //     external
    //     nonReentrant
    //     onlyOwner
    //     canReserveTokens(addresses.length)
    //     hasAddresses(addresses)
    // {
    //     numReservedTokens += addresses.length;

    //     for (uint256 i = 0; i < addresses.length; i++) {
    //         _safeMint(addresses[i], nextTokenId());
    //     }

    //     emit GiftTokens(addresses);
    // }

    // ============ PUBLIC READ-ONLY FUNCTIONS ============
    function getBaseURI() external view returns (string memory) {
        return baseURI;
    }

    function getLastTokenId() external view returns (uint256) {
        return tokenCounter.current();
    }

    // ============ SUPPORTING FUNCTIONS ============
    function nextTokenId() private returns (uint256) {
        tokenCounter.increment();
        return tokenCounter.current();
    }

    // ============ FUNCTION OVERRIDES ============
    function contractURI() public view returns (string memory) {
        return collectionURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        isExistingToken(tokenId)
        returns (string memory)
    {
        return
            string(abi.encodePacked(baseURI, "/", tokenId.toString(), ".json"));
    }

    /**
     * @dev used for art reveals
     */
    function setBaseURI(string memory newbaseURI) external onlyOwner {
        baseURI = newbaseURI;

        emit SetBaseURI(newbaseURI);
    }

    function setCollectionURI(string memory _collectionURI) external onlyOwner {
        collectionURI = _collectionURI;

        emit SetCollectionURI(_collectionURI);
    }
    
    function setProvenanceHash(string calldata _hash) public onlyOwner {
        provenanceHash = _hash;
    }

    function withdraw(address payable _dest) external onlyOwner {
        uint256 _balance = address(this).balance;
        _dest.sendValue(_balance);

        emit Withdraw(_dest);    
    }

    function withdrawToken(address _tokenAddress, address _dest) external onlyOwner {
        uint256 _balance = IERC20(_tokenAddress).balanceOf(address(this));
        SafeERC20.safeTransfer(IERC20(_tokenAddress), _dest, _balance);

        emit WithdrawToken(_tokenAddress, _dest);
    }

    /**
     * @dev enable contract to receive ethers in royalty
     */
    receive() external payable {}
}
