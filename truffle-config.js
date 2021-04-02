require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { API_URL, MNEMONIC, PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider([PRIVATE_KEY], API_URL)
      },
      network_id: 42,
      gas: 4000000 //4M is the max
    }
  }
};