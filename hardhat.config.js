/**

* @type import('hardhat/config').HardhatUserConfig

*/

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "bsc",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    "bsc testnet": {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [
        "cb9dc2617f3969def9696ff2265b36ac61becc550635258a8d676447f783f812",
      ],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [
        "cb9dc2617f3969def9696ff2265b36ac61becc550635258a8d676447f783f812",
      ],
    },
  },
};
