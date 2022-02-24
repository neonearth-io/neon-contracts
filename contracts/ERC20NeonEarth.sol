// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

//
//   ══════════════════════════════════════════════════════════════════════
//   ██   ██ ██████  █████  ██   ██    ██████     ███  █████  ██████ ██   ██
//   ███  ██ ██     ██   ██ ███  ██    ██        █ ██  ██  ██   ██   ██   ██
//   ██ █ ██ ██████ ██   ██ ██ █ ██    ██████   █  ██  ██  ██   ██   ███████
//   ██  ███ ██     ██   ██ ██  ███    ██      ██████  ████     ██   ██   ██
//   ██   ██ ██████  █████  ██   ██    ██████ ██   ██  ██  ██   ██   ██   ██
//   ══════════════════════════════════════════════════════════════════════
//

contract ERC20NeonEarth is ERC20PresetMinterPauser {
    string private _name = "Neon Earth";
    string private _symbol = "NEARTH";
    uint8 private _decimals = 8;

    uint256 public constant STAGE_1 = 1672531200; //Sun, 01 Jan 2023 00:00:00 GMT
    uint256 public constant STAGE_2 = 1704067200; //Mon, 01 Jan 2024 00:00:00 GMT
    uint256 public constant STAGE_3 = 1735689600; //Wed, 01 Jan 2025 00:00:00 GMT
    uint256 public constant STAGE_4 = 1767225600; //Thu, 01 Jan 2026 00:00:00 GMT
    uint256 public constant STAGE_5 = 1798761600; //Fri, 01 Jan 2027 00:00:00 GMT
    uint256 public constant STAGE_EXTRA = 1830297600; //Sat, 01 Jan 2028 00:00:00 GMT
    uint256 public constant PUBLIC_SALE = 1645547400; //Tue, 22 Feb 2022 16:30:00 GMT

    uint256 constant DECIMALS = 10**8;
    uint256 public constant CAP_STAGE_1 = 400_000_000 * DECIMALS;
    uint256 public constant CAP_STAGE_2 = 650_000_000 * DECIMALS;
    uint256 public constant CAP_STAGE_3 = 800_000_000 * DECIMALS;
    uint256 public constant CAP_STAGE_4 = 920_000_000 * DECIMALS;
    uint256 public constant CAP_STAGE_5 = 1_000_000_000 * DECIMALS;
    uint256 public constant CAP_STAGE_EXTRA = 1_100_000_000 * DECIMALS;

    bool public EXTRA_DISTRIBUTION_STAGE;

    uint256 public basePercent = 1000; //10%

    constructor() ERC20PresetMinterPauser(_name, _symbol) {
    }

    function unlockExtraDistribution() public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            block.timestamp >= STAGE_EXTRA,
            "NEARTH: invalid unlock time for extra distribution"
        );
        EXTRA_DISTRIBUTION_STAGE = true;
    }

    function _checkEmission(uint256 _amount) internal view {
        if(block.timestamp <= STAGE_1)
        require(ERC20.totalSupply() + _amount <= CAP_STAGE_1, "NEARTH: exceeds allowable total supply STAGE_1");

        if(STAGE_1 < block.timestamp && block.timestamp <= STAGE_2)
        require(ERC20.totalSupply() + _amount <= CAP_STAGE_2, "NEARTH: exceeds allowable total supply STAGE_2");

        if(STAGE_2 < block.timestamp && block.timestamp <= STAGE_3)
        require(ERC20.totalSupply() + _amount <= CAP_STAGE_3, "NEARTH: exceeds allowable total supply STAGE_3");

        if(STAGE_3 < block.timestamp && block.timestamp <= STAGE_4)
        require(ERC20.totalSupply() + _amount <= CAP_STAGE_4, "NEARTH: exceeds allowable total supply STAGE_4");

        if(STAGE_4 < block.timestamp && block.timestamp <= STAGE_5)
        require(ERC20.totalSupply() + _amount <= CAP_STAGE_5, "NEARTH: exceeds allowable total supply STAGE_5");

        if(STAGE_5 < block.timestamp && !EXTRA_DISTRIBUTION_STAGE)
        require(ERC20.totalSupply() + _amount <= CAP_STAGE_5, "NEARTH: exceeds allowable total supply");

        if(EXTRA_DISTRIBUTION_STAGE)
        require(ERC20.totalSupply() + _amount <= CAP_STAGE_EXTRA, "NEARTH: exceeds allowable total supply STAGE_EXTRA");
    }

    function getTxValues(uint256 amount)
        public
        view
        returns (uint256 transferAmount, uint256 txFee)
    {
        require(amount >= 10, "NEARTH: transfer amount is too small");
        txFee = (amount * basePercent) / 10000;
        transferAmount = amount - txFee;
        return (transferAmount, txFee);
    }

    function drainAdminFee(address vault)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (bool)
    {
        uint256 totalAmount = super.balanceOf(address(this));
        uint256 part = totalAmount / 2;
        super._burn(address(this), part);
        super._transfer(address(this), vault, part);
        return true;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal view override(ERC20PresetMinterPauser) {
        if (!hasRole(DEFAULT_ADMIN_ROLE, _msgSender()))
            require(!paused(), "ERC20Pausable: token transfer while paused!");

        if (from == address(0)) _checkEmission(amount);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        require(
            block.timestamp > PUBLIC_SALE,
            "TokenTimelock: closed until Public Sale (Tue, 22 Feb 2022 16:30:00 GMT)"
        );

        (uint256 transferAmount, uint256 fee) = getTxValues(amount);

        uint256 dust = amount - (transferAmount + fee);
        if (dust > 0) transferAmount += dust;

        super._transfer(from, to, transferAmount);
        super._transfer(from, address(this), fee);
    }
}
