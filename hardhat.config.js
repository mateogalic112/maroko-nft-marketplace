require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path: `${__dirname}/.env`})

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [process.env.METAMASK_ACCOUNT_KEY]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [process.env.METAMASK_ACCOUNT_KEY]
    }
  },
  solidity: "0.8.4",
};
