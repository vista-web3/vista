// based on https://github.com/kaymomin/soulbound-nft-token-smart-contract/blob/main/soulbound.sol
// and https://github.com/coinbase/nft-dapp-starter-kit/tree/main/smart-contracts

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Membership is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using Address for address payable;
    using Strings for uint256;

    string private baseURI;
    string private collectionURI;

    Counters.Counter private _tokenIdCounter;

    event SetBaseURI(string indexed uri);

    event SetCollectionURI(string indexed uri);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    modifier isExistingToken(uint256 tokenId) {
        require(_exists(tokenId), "Non-existent token");
        _;
    }
    function getBaseURI() external view returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newbaseURI) external onlyOwner {
        baseURI = newbaseURI;

        emit SetBaseURI(newbaseURI);
    }

    function getLastTokenId() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function contractURI() public view returns (string memory) {
        return collectionURI;
    }

    function setCollectionURI(string memory _collectionURI) external onlyOwner {
        collectionURI = _collectionURI;

        emit SetCollectionURI(_collectionURI);
    }

    function _beforeTokenTransfer(
        address from, 
        address to, 
        uint256 tokenId
    ) internal override virtual {
    require(from == address(0), "Err: token transfer is BLOCKED"); 
    super._beforeTokenTransfer(from, to, tokenId);  
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}