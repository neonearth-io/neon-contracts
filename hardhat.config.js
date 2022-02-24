require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const BSC_TESTNET_PRIVATE_KEY = process.env.BSC_TESTNET_PRIVATE_KEY || "0x0000000000000000000000000000000000000000";
const BSC_MAINNET_PRIVATE_KEY = process.env.BSC_MAINNET_PRIVATE_KEY || "0x0000000000000000000000000000000000000000";
const EXPLORER_API_KEY = process.env.EXPLORER_API_KEY || "0x0000000000000000000000000000000000000000";


module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.0",
        settings: {},
      }
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    bsc_mainnet: {
      url: process.env.BSC_MAINNET_URL,
      accounts: [BSC_MAINNET_PRIVATE_KEY]
    },
    bsc_testnet: {
      url: process.env.BSC_TESTNET_URL,
      accounts: [BSC_TESTNET_PRIVATE_KEY]
    },
    hardhat: {
     
    },
  },
  etherscan: {
    apiKey: EXPLORER_API_KEY
  },
  mocha: {
    timeout: 300000
  }
};

