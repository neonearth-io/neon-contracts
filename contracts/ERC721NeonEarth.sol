// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract ERC721NeonEarth is ERC721PresetMinterPauserAutoId {
    string private _name = "Neon Earth NFT";
    string private _symbol = "NEARTHNFT";
    string private _baseTokenURI = "https://neonearth.io/nfts/";

    constructor() ERC721PresetMinterPauserAutoId(_name, _symbol, _baseTokenURI) {
    }
}
