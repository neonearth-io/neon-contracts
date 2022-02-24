## Curve GSN Proxy
Gasless transaction support for curve pools with up to 6 assets

### Prerequisites
hardhat, npx, gsn

### Deploy
Supported main networks: eth_mainnet, bsc_mainnet, polygon_mainnet, huobi_mainnet<br />  
Supported test networks: eth_testnet, bsc_testnet, polygon_testnet, huobi_testnet
```
npx hardhat run scripts/deploy.js --network <NETWORK>
```

### Run tests
```
ganache-cli -i 1337 --chainId 1337
```
```
npx hardhat test
```

