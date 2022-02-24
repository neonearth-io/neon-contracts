// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";

//
//   ══════════════════════════════════════════════════════════════════════
//   ██   ██ ██████  █████  ██   ██    ██████     ███  █████  ██████ ██   ██
//   ███  ██ ██     ██   ██ ███  ██    ██        █ ██  ██  ██   ██   ██   ██
//   ██ █ ██ ██████ ██   ██ ██ █ ██    ██████   █  ██  ██  ██   ██   ███████
//   ██  ███ ██     ██   ██ ██  ███    ██      ██████  ████     ██   ██   ██
//   ██   ██ ██████  █████  ██   ██    ██████ ██   ██  ██  ██   ██   ██   ██
//   ══════════════════════════════════════════════════════════════════════
//

interface IERC721 {
    function mint(address to) external;
}

contract NeonBox is Ownable {
    address public BUSD;
    address public ERC721NeonEarth;

    bool private constant SALE_ON = true;
    bool private constant SALE_OFF = false;

    event BoxSet(bytes32 box, uint256 price, bool status);
    event BoxBought(bytes32 box, uint256 price, address buyer);

    struct BoxData {
        uint256 price;
        bool status;
    }

    mapping(bytes32 => BoxData) private _boxes;

    constructor(address _busd, address _nearth721) {
        BUSD = _busd;
        ERC721NeonEarth = _nearth721;
        _setupBox(keccak256("BOX_1"), 5 ether, SALE_ON);
        _setupBox(keccak256("BOX_2"), 15 ether, SALE_ON);
        _setupBox(keccak256("BOX_3"), 50 ether, SALE_ON);
        _setupBox(keccak256("BOX_4"), 100 ether, SALE_ON);
        _setupBox(keccak256("BOX_5"), 150 ether, SALE_ON);
        _setupBox(keccak256("BOX_6"), 250 ether, SALE_ON);
        _setupBox(keccak256("BOX_7"), 500 ether, SALE_ON);
        _setupBox(keccak256("BOX_8"), 1000 ether, SALE_ON);
    }

    function setupBox(
        bytes32 box,
        uint256 price,
        bool status
    ) external onlyOwner {
        _setupBox(box, price, status);
    }

    function _setupBox(
        bytes32 box,
        uint256 price,
        bool status
    ) internal {
        _boxes[box].price = price;
        _boxes[box].status = status;
        emit BoxSet(box, price, status);
    }

    function setBoxStatus(bytes32 box, bool status) external onlyOwner {
        _boxes[box].status = status;
        emit BoxSet(box, _boxes[box].price, status);
    }

    function buyBox(bytes32 box) public {
        require(
            _boxes[box].status,
            "NeonBox: sale for the selected type is over"
        );
        uint256 boxPrice = _boxes[box].price;
        SafeERC20.safeTransferFrom(
            IERC20(BUSD),
            _msgSender(),
            address(this),
            boxPrice
        );
        IERC721(ERC721NeonEarth).mint(_msgSender());

        emit BoxBought(box, boxPrice, _msgSender());
    }

    function drainContractBalance(address to) public onlyOwner {
        uint256 thisBalance = IERC20(BUSD).balanceOf(address(this));
        SafeERC20.safeTransfer(IERC20(BUSD), to, thisBalance);
    }
}
