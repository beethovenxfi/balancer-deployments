// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import YearnLinearPoolFactory from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPoolFactory.json';
import BooLinearPoolFactory from '../tasks/20221205-boo-linear-pool-v2/build-info/BooLinearPoolFactory.json';
import YearnLinearPool from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPool.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { getAddress } from '@ethersproject/address';
import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const USDC = '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75';
const yvUSDC = getAddress('0xEF0210eB96c7EB36AF8ed1c20306462764935607');
const DAI = '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E';
const yvDAI = getAddress('0x637eC617c86D24E421328e6CAEa1d92114892439');
const FTM = getAddress('0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83');
const yvFTM = getAddress('0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0');

const rftUSDC = '0x7a688cfc89bafa29f5027ee457454bec919caef2';

const BOO = getAddress('0x841fad6eae12c286d1fd18d1d525dffa75c7effe');
const xBOO = getAddress('0xa48d959ae2e88f1daa7d5f611e01908106de7598');

const WBTC = getAddress('0x321162Cd933E2Be498Cd2267a90534A804051b11');
const yvWBTC = getAddress('0xd817A100AB8A29fE3DBd925c2EB489D67F758DA9');

const WETH = getAddress('0x74b23882a30290451A17c44f4F05243b6b58C76d');
const yvWETH = getAddress('0xCe2Fc0bDc18BD6a4d9A725791A3DEe33F3a23BB7');

const fUSDT = getAddress('0x049d68029688eAbF473097a2fC38ef61633A3C7A');
const yvUSDT = getAddress('0x148c05caf1Bb09B5670f00D511718f733C54bC4c');

// const BOO_LINEAR_POOL_FACTORY = '0xba306e3Cf84751d8Ef5e812C18cAa6C567c783E8';
const YEARN_LINEAR_POOL_FACTORY = '0xe6332A48bE7496489561ab4CfAb71407B1Ac8cA4';
// const REAPER_LINEAR_POOL_FACTORY = '0xD448c4156b8dE31E56fDFC071C8D96459BB28119';

const FRAX = '0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355';
const yvFRAX = getAddress('0x357ca46da26E1EefC195287ce9D838A6D5023ef3');
const rfgrFTM = '0xC5B29D59d0b4717Aa0Dd8D11597d9fd3a05D86bb';
const sFTMx = '0xd7028092c830b5C8FcE061Af2E593413EbbC1fc1';
const rfgrsFTMx = '0xAb30A4956C7d838234e24F1c3E50082C0607F35F';

async function create() {
  const factory = await ethers.getContractAt(YearnLinearPoolFactory, YEARN_LINEAR_POOL_FACTORY);

  console.log('Calling create on the YearnLinearPoolFactory...');

  const tx = await factory.create(
    'Beets Yearn Boosted Pool v2 (USDC)',
    'bb-yv-USDC-v2',
    USDC,
    yvUSDC,
    fp(1_000_000),
    fp(0.0001),
    getAddress('0xCd983793ADb846dcE4830c22F30C7Ef0C864a776')
  );
  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);
  const pool = await ethers.getContractAt(YearnLinearPool, poolAddress);
  const poolId = await pool.getPoolId();

  console.log(`Successfully deployed the YearnLinearPoolFactory at address ${poolAddress} with id ${poolId}`);
  console.log(`Pool deployment block hash: ${blockHash}`);
}

async function getPoolAddressAndBlockHashFromTransaction(
  // eslint-disable-next-line
  tx: any
): Promise<{ poolAddress: string; blockHash: string }> {
  const receipt = await tx.wait();
  const events = receipt.events.filter((e: { event: string }) => e.event === 'PoolCreated');

  return { poolAddress: events[0].args.pool, blockHash: receipt.blockHash };
}

create().catch((e) => {
  console.log('error', e);
});
