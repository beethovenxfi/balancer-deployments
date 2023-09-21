export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const POOL_OWNER_FTM = '0xCd983793ADb846dcE4830c22F30C7Ef0C864a776';
export const VAULT_ADDRESS_FTM = '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce';
export const PROTOCOL_FEE_PERCENTAGES_PROVIDER_FTM = '0xe101551C4772F771FEDEBecc786931E61000657C';
export const WEIGHTED_POOL_V4_FACTORY_FTM = '0xb841Df73861E65E6D61a80F503F095a91ce75e15';
export const COMPOSABLE_STABLE_POOL_V5_FACTORY_FTM = '0x23F03a4fb344d8B98833d2ACe093cc305E03474f';

export const POOL_OWNER_OP = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';
export const VAULT_ADDRESS_OP = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
export const COMPOSABLE_STABLE_POOL_V5_FACTORY_OP = '0x043A2daD730d585C44FB79D2614F295D2d625412';

export const TOKENS: {
  [chain: string]: {
    [token: string]: {
      address: string;
      decimals: number;
      rateProvider: string;
      cache: number;
    };
  };
} = {
  ['FANTOM']: {
    WFTM: {
      address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    WPGUNK: {
      address: '0x2b6850bf31874d96a21ed4dc7c6415b9640be2a4',
      decimals: 9,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    FBOMB: {
      address: '0x74ccbe53f77b08632ce0cb91d3a545bf6b8e0979',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    MCLB: {
      address: '0x5deb27e51dbeef691ba1175a2e563870499c2acb',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    TAROT: {
      address: '0xb7C2ddB1EBAc1056231ef22c1b0A13988537a274',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
  },
  ['OPTIMISM']: {
    USDCE: {
      address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      decimals: 6,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    DOLA: {
      address: '0x8ae125e8653821e851f12a49f7765db9a9ce7384',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    USDC: {
      address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      decimals: 6,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    USDT: {
      address: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
      decimals: 6,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    DAI: {
      address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
      decimals: 18,
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
      rateProvider: '0x658843BB859B7b85cEAb5cF77167e3F0a78dFE7f',
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
    DUSD: {
      address: '0xb396b31599333739a97951b74652c117be86ee1d',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    ANKRETH: {
      address: '0xe05a08226c49b636acf99c40da8dc6af83ce5bb3',
      decimals: 18,
      rateProvider: '0x97b323fc033323B66159402bcDb9D7B9DC604235',
      cache: 30,
    },
    CSP_NATIVE_STABLE_BEETS: {
      address: '0x9Da11Ff60bfc5aF527f58fd61679c3AC98d040d9',
      decimals: 18,
      rateProvider: '0x9Da11Ff60bfc5aF527f58fd61679c3AC98d040d9',
      cache: 30,
    },
  },
};
