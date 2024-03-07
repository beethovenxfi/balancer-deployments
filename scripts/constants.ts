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
    MFTM: {
      address: '0x62227c75908b7d358a9d70ea4670f57f8b012ccc',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    FBUX: {
      address: '0x1e2ea3f3209d66647f959cf00627107e079b870d',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    GOAT: {
      address: '0xcd62f054eee65c8d23fe2adc8bae0443d4ec82db',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    LZUSDC: {
      address: '0x28a92dde19d9989f39a49905d7c9c2fac7799bdf',
      decimals: 6,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    AXLUSDC: {
      address: '0x1b6382dbdea11d97f24495c9a90b7c88469134a4',
      decimals: 6,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    WFTM: {
      address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    SFTMX: {
      address: '0xd7028092c830b5C8FcE061Af2E593413EbbC1fc1',
      decimals: 18,
      rateProvider: '0x629d4c27057915e59dd94bca8d48c6d80735b521',
      cache: 30,
    },
    BEETS: {
      address: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e',
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
    LZFMULTI: {
      address: '0xf386eb6780a1e875616b5751794f909095283860',
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
    FSONIC: {
      address: '0x05e31a691405d06708A355C029599c12d5da8b28',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    KIRBY: {
      address: '0x97bdAfe3830734acF12Da25359674277fcc33729',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    CEKKE: {
      address: '0x3bc34d8Ace32D768a3F76e17AAEF2B1D8f261e1D',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    SANIK: {
      address: '0x73E30eb2e469cc542d86397bECA97Ea6547e1cA7',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    DEUS: {
      address: '0xDE55B113A27Cc0c5893CAa6Ee1C020b6B46650C0',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    CATRONJE: {
      address: '0x96312c36cB278bB84BB1c180E33f17b8857fFFab',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    HYPERION: {
      address: '0xA7C79841E7e9D751Bb25c08684b10c649C60fC86',
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
    ERN: {
      address: '0xc5b001dc33727f8f26880b184090d3e252470d45',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
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
    WSTETH: {
      address: '0x1f32b1c2345538c0c6f582fcb022739c4a194ebb',
      decimals: 18,
      rateProvider: '0x9aa3cd420f830E049e2b223D0b07D8c809C94d15',
      cache: 30,
    },
    LZBEETS: {
      address: '0xb4Bc46bc6cB217B59ea8F4530BaE26Bf69F677f0',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    FRAX: {
      address: '0x2e3d870790dc77a83dd1d18184acc7439a53f475',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    SFRAX: {
      address: '0x2dd1b4d4548accea497050619965f91f78b3b532',
      decimals: 18,
      rateProvider: '0xde3b7ec86b67b05d312ac8fd935b6f59836f2c41',
      cache: 30,
    },
    FRXETH: {
      address: '0x6806411765af15bddd26f8f544a34cc40cb9838b',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    SFRXETH: {
      address: '0x484c2D6e3cDd945a8B2DF735e079178C1036578c',
      decimals: 18,
      rateProvider: '0xf752dd899F87a91370C1C8ac1488Aef6be687505',
      cache: 30,
    },
    STERN: {
      address: '0x3ee6107d9c93955acbb3f39871d32b02f82b78ab',
      decimals: 18,
      rateProvider: '0xbcebb4dcdec1c12bf7eb31bd26bc9c3b8f55c966',
      cache: 30,
    },
  },
};
