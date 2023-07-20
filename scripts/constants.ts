export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const TOKENS: Record<
  string,
  Record<string, { address: string; decimals: number; rateProvider: string; cache: number }>
> = {
  ['FANTOM']: {
    WFTM: {
      address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
  },
  ['OPTIMISM']: {
    ETH: {
      address: 'AddressZero',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    USDC: {
      address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      decimals: 6,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    WETH: {
      address: '0x4200000000000000000000000000000000000006',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    RETH: {
      address: '0x9Bcef72be871e61ED4fBbc7630889beE758eb81D',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    BBRFUSDC: {
      address: '0xDc2007D9e9A33f50630F26069FAab69c25f7758C',
      decimals: 18,
      rateProvider: '0xDc2007D9e9A33f50630F26069FAab69c25f7758C',
      cache: 30,
    },
    BBRFWSTETH: {
      address: '0xB85245929dc65B5EDdb56c4b4E84b20BcE69Db35',
      decimals: 18,
      rateProvider: '0xB85245929dc65B5EDdb56c4b4E84b20BcE69Db35',
      cache: 30,
    },
    BBRFWBTC: {
      address: '0xd32F78F5aE235269c6d2cABBD26A57fF9FD62967',
      decimals: 18,
      rateProvider: '0xd32F78F5aE235269c6d2cABBD26A57fF9FD62967',
      cache: 30,
    },
    BBRFUSDT: {
      address: '0xBEF1ccAaDA458a570C37B11A8872988bA1E4FDb9',
      decimals: 18,
      rateProvider: '0xBEF1ccAaDA458a570C37B11A8872988bA1E4FDb9',
      cache: 30,
    },
    BBRFOP: {
      address: '0x55b1F937B1335Be355C82e207FD437182c986Ba1',
      decimals: 18,
      rateProvider: '0x55b1F937B1335Be355C82e207FD437182c986Ba1',
      cache: 30,
    },
    BBRFWETH: {
      address: '0x8003eec4aDD35C6D23eB1Ef61b4fA6bbBB23a41a',
      decimals: 18,
      rateProvider: '0x8003eec4aDD35C6D23eB1Ef61b4fA6bbBB23a41a',
      cache: 30,
    },
    BBRFDAI: {
      address: '0x8fE33d737484CA194dedF64AaFa8485327fC5372',
      decimals: 18,
      rateProvider: '0x8fE33d737484CA194dedF64AaFa8485327fC5372',
      cache: 30,
    },
  },
};
