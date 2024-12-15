export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const POOL_OWNER_FTM = '0xCd983793ADb846dcE4830c22F30C7Ef0C864a776';
export const VAULT_ADDRESS_FTM = '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce';
export const PROTOCOL_FEE_PERCENTAGES_PROVIDER_FTM = '0xe101551C4772F771FEDEBecc786931E61000657C';
export const WEIGHTED_POOL_V4_FACTORY_FTM = '0xb841Df73861E65E6D61a80F503F095a91ce75e15';
export const COMPOSABLE_STABLE_POOL_V5_FACTORY_FTM = '0x23F03a4fb344d8B98833d2ACe093cc305E03474f';

export const POOL_OWNER_OP = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';
export const VAULT_ADDRESS_CANONCIAL = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
export const COMPOSABLE_STABLE_POOL_V6_FACTORY_OP = '0x4bdCc2fb18AEb9e2d281b0278D946445070EAda7';

export const POOL_OWNER_SONIC = '0x97079F7E04B535FE7cD3f972Ce558412dFb33946'
export const COMPOSABLE_STABLE_POOL_V6_FACTORY_SONIC = '0x993767E29726dDb7F5e8A751fAF54d4b83F3FC62';

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
  ['SONIC']: {
    BEETS: {
      address: '0x2D0E0814E62D80056181F5cd932274405966e4f0',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    STS: {
      address: '0xe5da20f15420ad15de0fa650600afc998bbe3955',
      decimals: 18,
      rateProvider: '0xe5da20f15420ad15de0fa650600afc998bbe3955',
      cache: 30,
    },
    WS: {
      address: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
  },
  ['FANTOM']: {
    NATIS: {
      address: '0x5be1789a6928f8659305bf86ad3054530501f424',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    SPEEDY: {
      address: '0x0ce12ae7c899ebf2bcda7aa570c5af98b6688c95',
      decimals: 9,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    CABRON: {
      address: '0x1d631adc479309aa073949e0d67973555bbbdcd0',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    LFG: {
      address: '0xc8065302b6877416c095ace72278ec4ccea664bb',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    PXL: {
      address: '0x24b06ef70da341486ebf96a5ea6de1ae8881d106',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    BPEPE: {
      address: '0x46e64b8cd1811ddc9899d607f24debc46b7a611c',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    POOH: {
      address: '0x29cfbab01ca34864402f4c0f20837a5f05490d69',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    CONK2: {
      address: '0x4cae69117657f1f10c2aaa9c8c79dc3e5306f7ec',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    FDUCK: {
      address: '0x79a6a56645d11f6d3464aaf422afb82d462177b7',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    FTAILS: {
      address: '0x5cf90b977c86415a53ce3b7be13b26f6abddfee2',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    BAY: {
      address: '0xd361474bb19c8b98870bb67f5759cdf277dee7f9',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    GOAT: {
      address: '0x9ab1070d74216a5f627c6937c0767ea5b990c3d8',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    GROK: {
      address: '0x0e3b1c9be555ec9806f6eab9bd101487f53cf0c9',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    BLACKY: {
      address: '0xb5fd949436772e07cbbf35fb6524e79924c54cb3',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    MUTTSKI: {
      address: '0xa80058bdf71f4044942107e33a802752b3bfb4d0',
      decimals: 9,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    FKNUCKLES: {
      address: '0x1f008f9af47b387bdf67a25f2b8219942207298f',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    FANTIE: {
      address: '0x5a27c97bf717f455c9eeb838a53fb9f044509c59',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    SGOAT: {
      address: '0x43f9a13675e352154f745d6402e853fecc388aa5',
      decimals: 18,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
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
    GOAT404: {
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
    USDCE: {
      address: '0x2F733095B80A04b38b0D10cC884524a3d09b836a',
      decimals: 6,
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
    WEETH: {
      address: '0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF',
      decimals: 18,
      rateProvider: '0xef42D000a3e85C4e71C57e2C6A1E600e86f5a91B',
      cache: 30,
    },
    UNIBTC: {
      address: '0x93919784c523f39cacaa98ee0a9d96c3f32b593e',
      decimals: 8,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    WBTC: {
      address: '0x68f180fcce6836688e9084f035309e29bf0a2095',
      decimals: 8,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    INETH: {
      address: '0x5A7a183B6B44Dc4EC2E3d2eF43F98C5152b1d76d',
      decimals: 18,
      rateProvider: '0x210ABdFD989f3eE5C08614a8f4e096Cf8408f5DF',
      cache: 30,
    },
    INSTETH: {
      address: '0xd08C3F25862077056cb1b710937576Af899a4959',
      decimals: 18,
      rateProvider: '0xC092E0a4f5a2AdF3CF91E27cf4B7d7917D12CA2B',
      cache: 30,
    },
    WRSETH: {
      address: '0x87eee96d50fb761ad85b1c982d28a042169d61b1',
      decimals: 18,
      rateProvider: '0x1373a61449c26cc3f48c1b4c547322edaa36eb12',
      cache: 30,
    },
  },
};
