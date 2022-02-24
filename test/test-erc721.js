const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('NEON-EARTH ERC721', () => {

  before(async () => {
    [owner, frodo] = await ethers.getSigners();
    MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))

    BOX_1 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BOX_1"))
    BOX_2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BOX_2"))
    BOX_3 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BOX_3"))
    BOX_4 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BOX_4"))
    BOX_5 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BOX_5"))
    BOX_6 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BOX_6"))
    BOX_7 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BOX_7"))
    BOX_8 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BOX_8"))

    _5_BUSD = ethers.utils.parseEther("5.0")
    _15_BUSD = ethers.utils.parseEther("15.0")
    _50_BUSD = ethers.utils.parseEther("50.0")
    _100_BUSD = ethers.utils.parseEther("100.0")
    _150_BUSD = ethers.utils.parseEther("150.0")
    _250_BUSD = ethers.utils.parseEther("250.0")
    _500_BUSD = ethers.utils.parseEther("500.0")
    _1000_BUSD = ethers.utils.parseEther("1000.0")
    
    SALE_ON = true;
    SALE_OFF = false;
  });

  beforeEach(async () => {
    const BUSD = await ethers.getContractFactory('TestToken');
      busd = await BUSD.deploy();
      await busd.deployed();

      const NeonEarthERC721 = await ethers.getContractFactory('ERC721NeonEarth');
      neonEarthERC721 = await NeonEarthERC721.deploy();
      await neonEarthERC721.deployed();

      // deploy NeonBox
      const NeonBox = await ethers.getContractFactory('NeonBox');
      neonBox = await NeonBox.deploy(busd.address, neonEarthERC721.address);
      await neonBox.deployed();

      // grant minter role to NeonBox contract
      await neonEarthERC721.grantRole(MINTER_ROLE, neonBox.address);
  });

  describe('NEARTH ERC721 local testing...', () => {

    it('Purchase Box: 5', async function () {
      await expect(neonBox.buyBox(BOX_1)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      await busd.mint(owner.address, _5_BUSD)
      await busd.approve(neonBox.address, _5_BUSD)
      await expect(neonBox.buyBox(BOX_1)).to.emit(neonBox,'BoxBought');
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(1);
      expect(await busd.balanceOf(owner.address)).to.be.equal(0);
    })

    it('Purchase Box: 15', async function () {
      await expect(neonBox.buyBox(BOX_2)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      await busd.mint(owner.address, _15_BUSD)
      await busd.approve(neonBox.address, _15_BUSD)
      await expect(neonBox.buyBox(BOX_2)).to.emit(neonBox,'BoxBought');
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(1);
      expect(await busd.balanceOf(owner.address)).to.be.equal(0);
    })

    it('Purchase Box: 50', async function () {
      await expect(neonBox.buyBox(BOX_3)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      await busd.mint(owner.address, _50_BUSD)
      await busd.approve(neonBox.address, _50_BUSD)
      await expect(neonBox.buyBox(BOX_3)).to.emit(neonBox,'BoxBought');
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(1);
      expect(await busd.balanceOf(owner.address)).to.be.equal(0);
    })

    it('Purchase Box: 100', async function () {
      await expect(neonBox.buyBox(BOX_4)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      await busd.mint(owner.address, _100_BUSD)
      await busd.approve(neonBox.address, _100_BUSD)
      await expect(neonBox.buyBox(BOX_4)).to.emit(neonBox,'BoxBought');
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(1);
      expect(await busd.balanceOf(owner.address)).to.be.equal(0);
    })

    it('Purchase Box: 150', async function () {
      await expect(neonBox.buyBox(BOX_5)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      await busd.mint(owner.address, _150_BUSD)
      await busd.approve(neonBox.address, _150_BUSD)
      await expect(neonBox.buyBox(BOX_5)).to.emit(neonBox,'BoxBought');
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(1);
      expect(await busd.balanceOf(owner.address)).to.be.equal(0);
    })

    it('Purchase Box: 250', async function () {
      await expect(neonBox.buyBox(BOX_6)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      await busd.mint(owner.address, _250_BUSD)
      await busd.approve(neonBox.address, _250_BUSD)
      await expect(neonBox.buyBox(BOX_6)).to.emit(neonBox,'BoxBought');
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(1);
      expect(await busd.balanceOf(owner.address)).to.be.equal(0);
    })

    it('Purchase Box: 500', async function () {
      await expect(neonBox.buyBox(BOX_7)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      await busd.mint(owner.address, _500_BUSD)
      await busd.approve(neonBox.address, _500_BUSD)
      await expect(neonBox.buyBox(BOX_7)).to.emit(neonBox,'BoxBought');
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(1);
      expect(await busd.balanceOf(owner.address)).to.be.equal(0);
    })

    it('Purchase Box: 1000', async function () {
      await expect(neonBox.buyBox(BOX_8)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      await busd.mint(owner.address, _1000_BUSD)
      await busd.approve(neonBox.address, _1000_BUSD)
      await expect(neonBox.buyBox(BOX_8)).to.emit(neonBox,'BoxBought');
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(1);
      expect(await busd.balanceOf(owner.address)).to.be.equal(0);
    })

    it('Purchase Box When Sale is Over: 5 (negative)', async function () {
      await neonBox.setBoxStatus(BOX_1, SALE_OFF)

      await busd.mint(owner.address, _5_BUSD)
      await busd.approve(neonBox.address, _1000_BUSD)
      await expect(neonBox.buyBox(BOX_1)).to.be.revertedWith("NeonBox: sale for the selected type is over");
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(0);
      expect(await busd.balanceOf(owner.address)).to.be.equal(_5_BUSD);
    })

    it('Purchase Box When Sale is Over: 15 (negative)', async function () {
      await neonBox.setBoxStatus(BOX_2, SALE_OFF)

      await busd.mint(owner.address, _15_BUSD)
      await busd.approve(neonBox.address, _15_BUSD)
      await expect(neonBox.buyBox(BOX_2)).to.be.revertedWith("NeonBox: sale for the selected type is over");
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(0);
      expect(await busd.balanceOf(owner.address)).to.be.equal(_15_BUSD);
    })

    it('Purchase Box When Sale is Over: 50 (negative)', async function () {
      await neonBox.setBoxStatus(BOX_3, SALE_OFF)

      await busd.mint(owner.address, _50_BUSD)
      await busd.approve(neonBox.address, _50_BUSD)
      await expect(neonBox.buyBox(BOX_3)).to.be.revertedWith("NeonBox: sale for the selected type is over");
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(0);
      expect(await busd.balanceOf(owner.address)).to.be.equal(_50_BUSD);
    })

    it('Purchase Box When Sale is Over: 100 (negative)', async function () {
      await neonBox.setBoxStatus(BOX_4, SALE_OFF)

      await busd.mint(owner.address, _100_BUSD)
      await busd.approve(neonBox.address, _100_BUSD)
      await expect(neonBox.buyBox(BOX_4)).to.be.revertedWith("NeonBox: sale for the selected type is over");
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(0);
      expect(await busd.balanceOf(owner.address)).to.be.equal(_100_BUSD);
    })

    it('Purchase Box When Sale is Over: 150 (negative)', async function () {
      await neonBox.setBoxStatus(BOX_5, SALE_OFF)

      await busd.mint(owner.address, _150_BUSD)
      await busd.approve(neonBox.address, _150_BUSD)
      await expect(neonBox.buyBox(BOX_5)).to.be.revertedWith("NeonBox: sale for the selected type is over");
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(0);
      expect(await busd.balanceOf(owner.address)).to.be.equal(_150_BUSD);
    })

    it('Purchase Box When Sale is Over: 250 (negative)', async function () {
      await neonBox.setBoxStatus(BOX_6, SALE_OFF)

      await busd.mint(owner.address, _250_BUSD)
      await busd.approve(neonBox.address, _250_BUSD)
      await expect(neonBox.buyBox(BOX_6)).to.be.revertedWith("NeonBox: sale for the selected type is over");
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(0);
      expect(await busd.balanceOf(owner.address)).to.be.equal(_250_BUSD);
    })
    
    it('Purchase Box When Sale is Over: 500 (negative)', async function () {
      await neonBox.setBoxStatus(BOX_7, SALE_OFF)

      await busd.mint(owner.address, _500_BUSD)
      await busd.approve(neonBox.address, _500_BUSD)
      await expect(neonBox.buyBox(BOX_7)).to.be.revertedWith("NeonBox: sale for the selected type is over");
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(0);
      expect(await busd.balanceOf(owner.address)).to.be.equal(_500_BUSD);
    })

    it('Purchase Box When Sale is Over: 1000 (negative)', async function () {
      await neonBox.setBoxStatus(BOX_8, SALE_OFF)

      await busd.mint(owner.address, _1000_BUSD)
      await busd.approve(neonBox.address, _1000_BUSD)
      await expect(neonBox.buyBox(BOX_8)).to.be.revertedWith("NeonBox: sale for the selected type is over");
      expect(await neonEarthERC721.balanceOf(owner.address)).to.be.equal(0);
      expect(await busd.balanceOf(owner.address)).to.be.equal(_1000_BUSD);
    })

    it('ERC721: mint from frodo`s address (negative)', async function () {
      await expect(neonEarthERC721.connect(frodo).mint(frodo.address))
      .to.be.revertedWith("ERC721PresetMinterPauserAutoId: must have minter role to mint");
    })

  });


});
