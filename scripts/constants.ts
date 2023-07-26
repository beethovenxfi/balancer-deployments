export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const POOL_OWNER_OP = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';
export const VAULT_ADDRESS_OP = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';

export const TOKENS = {
  ['FANTOM']: {
    WFTM: {
      address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
  },
  ['OPTIMISM']: {
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
      address: '0xf970659221bb9d01b615321b63a26e857ffc030b',
      decimals: 18,
      rateProvider: '0xf970659221bb9d01b615321b63a26e857ffc030b',
      cache: 30,
    },
    BBRFWSTETH: {
      address: '0x48ace81c09382bfc08ed102e7eadd37e3b049752',
      decimals: 18,
      rateProvider: '0x48ace81c09382bfc08ed102e7eadd37e3b049752',
      cache: 30,
    },
    BBRFWBTC: {
      address: '0x8025586ac5fb265a23b9492e7414beccc2059ec3',
      decimals: 18,
      rateProvider: '0x8025586ac5fb265a23b9492e7414beccc2059ec3',
      cache: 30,
    },
    BBRFUSDT: {
      address: '0x20715545c15c76461861cb0d6ba96929766d05a5',
      decimals: 18,
      rateProvider: '0x20715545c15c76461861cb0d6ba96929766d05a5',
      cache: 30,
    },
    BBRFOP: {
      address: '0x3e9cbffd270ae67abb09d28988e7e785498c7373',
      decimals: 18,
      rateProvider: '0x3e9cbffd270ae67abb09d28988e7e785498c7373',
      cache: 30,
    },
    BBRFWETH: {
      address: '0x2e2b8b82123789d895fd79913f6dfa51f5b5a0e6',
      decimals: 18,
      rateProvider: '0x2e2b8b82123789d895fd79913f6dfa51f5b5a0e6',
      cache: 30,
    },
    BBRFDAI: {
      address: '0xa5d4802b4ce6b745b0c9e1b4a79c093d197869c8',
      decimals: 18,
      rateProvider: '0xa5d4802b4ce6b745b0c9e1b4a79c093d197869c8',
      cache: 30,
    },
    ERN: {
      address: '0xc5b001dc33727f8f26880b184090d3e252470d45',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    BBDAIPLUS: {
      address: '0xb5ad7d6d6F92a77F47f98C28C84893FBccc94809',
      decimals: 18,
      rateProvider: '0xb5ad7d6d6F92a77F47f98C28C84893FBccc94809',
      cache: 30,
    },
    BBUSDPLUS: {
      address: '0x88D07558470484c03d3bb44c3ECc36CAfCF43253',
      decimals: 18,
      rateProvider: '0x88D07558470484c03d3bb44c3ECc36CAfCF43253',
      cache: 30,
    },
  },
};
