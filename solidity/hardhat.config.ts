import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")

interface NetworkConfig {
  url: string;
  accounts: any;
}

interface Config extends HardhatUserConfig {
  networks: {
    hardhat: {
      chainId: number;
    };
    mumbai: NetworkConfig;
    // goerli: NetworkConfig;
  };
  solidity: {
    version: string;
    settings: {
      optimizer: {
        enabled: boolean;
        runs: number;
      };
    };
  };
}

const config: Config = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/rIic2zcbYmfGTaRE3EeZw2gHCPGw5l5X",
      accounts: ['57275cecd7bba47c84c3d087ca38fd84839e9b060decec03ffcdf199a21c3a92'],
    },
    // goerli: {
    //   url: "https://rpc.goerli.mudit.blog/",
    //   accounts: [`${process.env.NEXT_PUBLIC_PRIVATE_KEY}`],
    // },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;


