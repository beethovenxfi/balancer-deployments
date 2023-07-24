// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import ERC4626LinearFactory from '../tasks/20230409-erc4626-linear-pool-v4/artifact/ERC4626LinearPoolFactory.json';
import ERC4626Linear from '../tasks/20230409-erc4626-linear-pool-v4/artifact/ERC4626LinearPool.json';
import VaultAbi from '../tasks/20210418-vault/artifact/Vault.json';
import ERC20Abi from './abi/ERC20.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { getAddress } from '@ethersproject/address';
import { fp } from '../src/helpers/numbers';
import { parseUnits } from 'ethers/lib/utils';
import { FundManagement, SingleSwap } from '@balancer-labs/sdk';
import { MAX_UINT256 } from '../src/helpers/constants';

const WBTC = getAddress('0x68f180fcce6836688e9084f035309e29bf0a2095');
const RFSOWBTC = getAddress('0x73e51b0368Ef8bD0070b12DD992C54aA53BCB5F4'); //reaper crypt
const RFSOWSTETH = getAddress('0x3573De618AE4A740fb24215d93f4483436FbB2b6'); //reaper crypt

const OP = '0x4200000000000000000000000000000000000042';
const WSTETH = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb';
const WETH = '0x4200000000000000000000000000000000000006';
const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';
const USDT = '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58';
const DAI = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1';
const MAI = '0xdFA46478F9e5EA86d57387849598dbFB2e964b02';

const ERC4626_v4_FACOTRY = '0x7ADbdabaA80F654568421887c12F09E0C7BD9629';

const rfusdc = '0x508734b52ba7e04ba068a2d4f67720ac1f63df47';
const rfusdt = '0x51868bb8b71fb423b87129908fa039b880c8612d';
const rfdai = '0xc0f5da4fb484ce6d8a6832819299f7cd0d15726e';
const rfweth = '0x1bad45e92dce078cf68c2141cd34f54a02c92806';
const rfwsteth = '0xb19f4d65882f6c103c332f0bc012354548e9ce0e';
const rfwbtc = '0xf6533b6fcb3f42d2fc91da7c379858ae6ebc7448';
const rfop = '0xcecd29559a84e4d4f6467b36bbd4b9c3e6b89771';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';
const sender = process.env.DEPLOYER_ADDRESS || ''; //deployer

async function create() {
  // SET VARIABLES HERE
  const MAINTOKEN = OP;
  const WRAPPETDOKEN = rfop;
  const poolName = 'Beets Reaper Boosted OP';
  const poolSymbol = 'bb-rfOP';
  const randomString = '0xceba09fe92ede77aeb3a932f4b3c9a03310c2f5ee5504787d62a8ca9822b4c86';
  const swapAmount = parseUnits('1', 18);
  // END SET VARIABLES

  const factory = await ethers.getContractAt(ERC4626LinearFactory.abi, ERC4626_v4_FACOTRY);

  console.log('Calling create on the ERC4626LinearFactory...');

  const tx = await factory.create(
    poolName,
    poolSymbol,
    MAINTOKEN,
    WRAPPETDOKEN,
    fp(300000),
    fp(0.00001),
    POOL_OWNER,
    10, //reaper protocol id
    randomString
  );
  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);
  const pool = await ethers.getContractAt(ERC4626Linear.abi, poolAddress);
  const poolId = await pool.getPoolId();

  // const poolId = '0x2e2b8b82123789d895fd79913f6dfa51f5b5a0e60000000000000000000000eb';
  // const poolAddress = '0x2e2b8b82123789d895fd79913f6dfa51f5b5a0e6';

  console.log(`Successfully deployed the ERC4626Linear at address ${poolAddress} with id ${poolId}`);
  console.log(`Pool deployment block hash: ${blockHash}`);

  // Init the pool. On OP, contracts are automatically verified.
  console.log(`Swapping to init the pool.`);
  const vault = await ethers.getContractAt(VaultAbi.abi, '0xBA12222222228d8Ba445958a75a0704d566BF2C8');

  const token = await ethers.getContractAt(ERC20Abi, MAINTOKEN);
  console.log(`Approving ${swapAmount} of ${MAINTOKEN}`);
  await token.approve('0xBA12222222228d8Ba445958a75a0704d566BF2C8', swapAmount);

  const data: SingleSwap = {
    poolId: poolId,
    kind: 0, //0 means the amount is givenIn. 1 is for giventOut
    assetIn: MAINTOKEN,
    assetOut: poolAddress,
    amount: swapAmount,
    userData: '0x', //the user data here is not relevant on the swap
  };

  const funds: FundManagement = {
    sender,
    fromInternalBalance: false,
    toInternalBalance: false,
    recipient: sender,
  };

  console.log(`Swapping`);
  const transaction = await vault.swap(data, funds, '0', MAX_UINT256);
  await transaction.wait();
  console.log(`Done`);
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
