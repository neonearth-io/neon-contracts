const { expect } = require('chai')
const { ethers } = require('hardhat')
const VAULT_ADDRESS = process.env.VAULT_ADDRESS;

async function setNetworkTime(timestamp) {
  await network.provider.send("evm_setNextBlockTimestamp", [timestamp])
  await network.provider.send("evm_mine")
}

const increaseTime = async (duration) => {
  if (!ethers.BigNumber.isBigNumber(duration)) {
    duration = ethers.BigNumber.from(duration);
  }

  if (duration.isNegative())
    throw Error(`Cannot increase time by a negative amount (${duration})`);

  await hre.network.provider.request({
    method: "evm_increaseTime",
    params: [duration.toNumber()],
  });

  await hre.network.provider.request({
    method: "evm_mine",
  });
};

const takeSnapshot = async () => {
  return await hre.network.provider.request({
    method: "evm_snapshot",
    params: [],
  })
};

const restoreSnapshot = async (id) => {
  await hre.network.provider.request({
    method: "evm_revert",
    params: [id],
  });
};

const useSnapshot = async () => {
  await restoreSnapshot(snapshotId);
  snapshotId = await takeSnapshot();
};

describe('NEON-EARTH ERC20', () => {

  before(async () => {
    [owner, recipient, frodo] = await ethers.getSigners();
    DECIMALS = new web3.utils.BN(10).pow(new web3.utils.BN(8)); //8 decimals
    testAmount = new web3.utils.BN(1000).mul(DECIMALS).toString();
    totalSupply = new web3.utils.BN(1100000000).mul(DECIMALS).toString();
    supplyStage1 = new web3.utils.BN(400000000).mul(DECIMALS).toString();
    supplyStage2 = new web3.utils.BN(250000000).mul(DECIMALS).toString();
    supplyStage3 = new web3.utils.BN(150000000).mul(DECIMALS).toString();
    supplyStage4 = new web3.utils.BN(120000000).mul(DECIMALS).toString();
    supplyStage5 = new web3.utils.BN(80000000).mul(DECIMALS).toString();
    supplyStageExtra = new web3.utils.BN(100000000).mul(DECIMALS).toString();

    stage1 = 1672531200;       //Sun, 01 Jan 2023 00:00:00 GMT
    stage2 = 1704067200;       //Mon, 01 Jan 2024 00:00:00 GMT
    stage3 = 1735689600;       //Wed, 01 Jan 2025 00:00:00 GMT
    stage4 = 1767225600;       //Thu, 01 Jan 2026 00:00:00 GMT
    stage5 = 1798761600;       //Fri, 01 Jan 2027 00:00:00 GMT
    stageExtra = 1830297600;   //Sat, 01 Jan 2028 00:00:00 GMT
    publicSale = 1645488000;   //Tue, 22 Feb 2022 00:00:00 GMT
  });

  beforeEach(async () => {
    const NeonEarthERC20 = await ethers.getContractFactory('ERC20NeonEarth');
    neonEarthERC20 = await NeonEarthERC20.deploy();
    await neonEarthERC20.deployed();
  });

  describe('NEARTH ERC20 local testing...', () => {

    it('Transfer: Public sale (negative)', async function () {
      await expect(neonEarthERC20.connect(frodo).transfer(owner.address, testAmount)).to.be.revertedWith('TokenTimelock: closed until Public Sale (Tue, 22 Feb 2022 00:00:00 GMT)');
      await setNetworkTime(publicSale)
    })

    it('Mint: Check for minter role (negative)', async function () {
      await expect(neonEarthERC20.connect(frodo).mint(recipient.address, testAmount)).to.be.revertedWith('ERC20PresetMinterPauser: must have minter role to mint');
    })

    it('Mint: Stage 1 (with negative)', async function () {
      await neonEarthERC20.mint(recipient.address, supplyStage1) //new web3.utils.BN(supplyStage1.sub(testAmount)).toString()
      await expect(neonEarthERC20.mint(recipient.address, testAmount)).to.be.revertedWith('NEARTH: exceeds allowable total supply STAGE_1');
    })

    it('Mint: Stage 2 (with negative)', async function () {
      await setNetworkTime(stage1)
      await neonEarthERC20.mint(recipient.address, supplyStage1)
      await neonEarthERC20.mint(recipient.address, supplyStage2)
      await expect(neonEarthERC20.mint(recipient.address, testAmount)).to.be.revertedWith('NEARTH: exceeds allowable total supply STAGE_2');
    })

    it('Mint: Stage 3 (with negative)', async function () {
      await setNetworkTime(stage2)
      await neonEarthERC20.mint(recipient.address, supplyStage1)
      await neonEarthERC20.mint(recipient.address, supplyStage2)
      await neonEarthERC20.mint(recipient.address, supplyStage3)
      await expect(neonEarthERC20.mint(recipient.address, testAmount)).to.be.revertedWith('NEARTH: exceeds allowable total supply STAGE_3');
    })

    it('Mint: Stage 4 (with negative)', async function () {
      await setNetworkTime(stage3)
      await neonEarthERC20.mint(recipient.address, supplyStage1)
      await neonEarthERC20.mint(recipient.address, supplyStage2)
      await neonEarthERC20.mint(recipient.address, supplyStage3)
      await neonEarthERC20.mint(recipient.address, supplyStage4)
      await expect(neonEarthERC20.mint(recipient.address, testAmount)).to.be.revertedWith('NEARTH: exceeds allowable total supply STAGE_4');
    });

    it('Mint: Stage 5 (with negative)', async function () {
      await setNetworkTime(stage4)
      await neonEarthERC20.mint(recipient.address, supplyStage1)
      await neonEarthERC20.mint(recipient.address, supplyStage2)
      await neonEarthERC20.mint(recipient.address, supplyStage3)
      await neonEarthERC20.mint(recipient.address, supplyStage4)
      await neonEarthERC20.mint(recipient.address, supplyStage5)
      await expect(neonEarthERC20.mint(recipient.address, testAmount)).to.be.revertedWith('NEARTH: exceeds allowable total supply STAGE_5');
    });

    it('Mint: Stage 5 onwards (negative)', async function () {
      await setNetworkTime(stage5)
      await neonEarthERC20.mint(recipient.address, supplyStage1)
      await neonEarthERC20.mint(recipient.address, supplyStage2)
      await neonEarthERC20.mint(recipient.address, supplyStage3)
      await neonEarthERC20.mint(recipient.address, supplyStage4)
      await neonEarthERC20.mint(recipient.address, supplyStage5)
      await expect(neonEarthERC20.mint(recipient.address, testAmount)).to.be.revertedWith('NEARTH: exceeds allowable total supply');
    });

    it('Mint: Unlock extra distribution before the specified time (negative)', async function () {
      await expect(neonEarthERC20.unlockExtraDistribution()).to.be.revertedWith('NEARTH: invalid unlock time for extra distribution');
    });

    it('Mint: Unlock extra distribution from frodo`s address (negative)', async function () {
      await expect(neonEarthERC20.connect(frodo).unlockExtraDistribution()).to.be.revertedWith(
        `AccessControl: account ${frodo.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });

    it('Transfer: transfer while paused (with negative)', async function () {
      await neonEarthERC20.mint(recipient.address, supplyStage1)
      await neonEarthERC20.connect(recipient).transfer(owner.address, testAmount)

      await neonEarthERC20.pause()
      await expect(neonEarthERC20.connect(recipient).transfer(owner.address, testAmount)).to.be.revertedWith('ERC20Pausable: token transfer while paused');

      await neonEarthERC20.transfer(owner.address, testAmount) //should not revert while on pause

      await expect(neonEarthERC20.connect(recipient).transfer(owner.address, testAmount)).to.be.revertedWith('ERC20Pausable: token transfer while paused');

      await neonEarthERC20.unpause()
      await neonEarthERC20.connect(recipient).transfer(owner.address, testAmount)
      await neonEarthERC20.transfer(owner.address, testAmount)
    });

    it('Transfer: check standart transfer (10% fee)', async function () {
      const testAddress = web3.utils.randomHex(20)
      const randomnum = Math.random() * (100000 - 10) + 10;
      const testAmount = new web3.utils.BN(randomnum).mul(DECIMALS).toString();
      await neonEarthERC20.mint(owner.address, testAmount)

      beforeBalance = parseInt(await neonEarthERC20.balanceOf(owner.address))
      await neonEarthERC20.connect(owner).transfer(testAddress, testAmount)
      afterBalance = parseInt(await neonEarthERC20.balanceOf(testAddress))

      // check fee percentage (should be 10%)
      expect(parseInt((beforeBalance - afterBalance).toString()) / beforeBalance).to.be.equal(0.1)
      // console.log("Fee percent:", parseInt((beforeBalance - afterBalance).toString()) / beforeBalance * 100 + "%")
    });

    it('Admin: drain admin fee', async function () {
      const testAddress = web3.utils.randomHex(20)
      const randomnum = Math.random() * (100000 - 10) + 10;
      const testAmount = new web3.utils.BN(randomnum).mul(DECIMALS).toString();
      await neonEarthERC20.mint(owner.address, testAmount)

      await neonEarthERC20.connect(owner).transfer(testAddress, testAmount)
      balanceAfter = parseInt(await neonEarthERC20.balanceOf(testAddress))

      // drainAdminFee
      await neonEarthERC20.drainAdminFee(VAULT_ADDRESS)
      const vaultBalance = parseInt(await neonEarthERC20.balanceOf(await neonEarthERC20.vault()))
      expect(vaultBalance).to.be.greaterThan(0)
      expect(vaultBalance * 2 + balanceAfter).to.be.equal(parseInt(testAmount))
    });

    it('Mint: Stage Extra (with negative)', async function () {
      await setNetworkTime(stageExtra)
      await neonEarthERC20.unlockExtraDistribution()

      await neonEarthERC20.mint(recipient.address, supplyStage1)
      await neonEarthERC20.mint(recipient.address, supplyStage2)
      await neonEarthERC20.mint(recipient.address, supplyStage3)
      await neonEarthERC20.mint(recipient.address, supplyStage4)
      await neonEarthERC20.mint(recipient.address, supplyStage5)
      await neonEarthERC20.mint(recipient.address, supplyStageExtra)
      await expect(neonEarthERC20.mint(recipient.address, testAmount)).to.be.revertedWith('NEARTH: exceeds allowable total supply STAGE_EXTRA');
    });

  });



});