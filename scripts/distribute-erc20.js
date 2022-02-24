const NEARTH_ADDRESS = process.env.NEARTH_ADDRESS || "0x0000000000000000000000000000000000000000";
const fs = require("fs");
const hre = require("hardhat");
const clients = require('./scr/clients.json')

async function main() {
  console.log("\nNEARTH Token Distribution\n");
  const [deployer] = await ethers.getSigners();
  console.log("NEARTH_ADDRESS:", NEARTH_ADDRESS);
  console.log("Network:", network.name);
  console.log("Network Id:", await web3.eth.net.getId());
  console.log(`Account: ${deployer.address}`);
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance.toString())}`);
  console.log("\nProcessing distribution...");

  const NeonEarthERC20 = await ethers.getContractFactory('ERC20NeonEarth');
  const neonEarthERC20 = await NeonEarthERC20.attach(NEARTH_ADDRESS);

  for (cl of clients) {
    let tx = await neonEarthERC20.mint(cl.address, cl.amount);
    console.log(`\nAddress: ${cl.address} Amount: ${cl.amount}} Tx: ${tx.hash}}`);

    await sleep(7500);
  }


  // fs.writeFileSync("../.env", JSON.stringify(deployInfo, undefined, 2));

}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
