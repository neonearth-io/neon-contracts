// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//
//   ══════════════════════════════════════════════════════════════════════
//   ██   ██ ██████  █████  ██   ██    ██████     ███  █████  ██████ ██   ██
//   ███  ██ ██     ██   ██ ███  ██    ██        █ ██  ██  ██   ██   ██   ██
//   ██ █ ██ ██████ ██   ██ ██ █ ██    ██████   █  ██  ██  ██   ██   ███████
//   ██  ███ ██     ██   ██ ██  ███    ██      ██████  ████     ██   ██   ██
//   ██   ██ ██████  █████  ██   ██    ██████ ██   ██  ██  ██   ██   ██   ██
//   ══════════════════════════════════════════════════════════════════════
//

contract Mining is Ownable {
    IERC20 nearth20;
    using Counters for Counters.Counter;

    mapping(address => Counters.Counter) private _nonces;

    bytes32 private immutable _TYPEHASH =
        keccak256(
            "GetReward(address spender,uint256 value,uint256 nonce,uint256 deadline)"
        );

    constructor(IERC20 neonEarthERC20) {
        nearth20 = neonEarthERC20;
    }

    function getReward(
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        require(block.timestamp <= deadline, "expired deadline");

        bytes32 structHash = keccak256(
            abi.encodePacked(
                _TYPEHASH,
                address(this),
                spender,
                value,
                _useNonce(spender),
                deadline
            )
        );

        address signer = ECDSA.recover(ECDSA.toEthSignedMessageHash(structHash), v, r, s);
        require(signer == this.owner(), "invalid signature");

        SafeERC20.safeTransfer(nearth20, spender, value);
    }

    function nonces(address owner) public view returns (uint256) {
        return _nonces[owner].current();
    }

    function _useNonce(address owner) internal returns (uint256 current) {
        Counters.Counter storage nonce = _nonces[owner];
        current = nonce.current();
        nonce.increment();
    }
}