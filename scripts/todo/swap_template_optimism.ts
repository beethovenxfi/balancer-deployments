// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { BatchSwap, FundManagement, SingleSwap } from '@balancer-labs/sdk';
import { MAX_UINT256 } from '../src/helpers/constants';
import { BigNumber } from 'ethers';
import VaultAbi from '../tasks/20210418-vault/artifact/Vault.json';
import { fp } from '../src/helpers/numbers';
import { getAddress } from '@ethersproject/address';
import ERC20 from './abi/ERC20.json';
import { parseUnits } from 'ethers/lib/utils';

const USDC = getAddress('0x7F5c764cBc14f9669B88837ca1490cCa17c31607');
const DAI = getAddress('0xda10009cbd5d07dd0cecc66161fc93d7c9000da1');

const USDPLUS_LINEAR_POOLID = '0x88d07558470484c03d3bb44c3ecc36cafcf43253000000000000000000000051';
const BBUSDPLUS = '0x88D07558470484c03d3bb44c3ECc36CAfCF43253';
const DAIPLUS_LINEAR_POOLID = '0xb5ad7d6d6f92a77f47f98c28c84893fbccc9480900000000000000000000006c';
const BBDAIPLUS = '0xb5ad7d6d6f92a77f47f98c28c84893fbccc94809';

const WBTC = getAddress('0x68f180fcce6836688e9084f035309e29bf0a2095');
const BB_RF_WBTC_ID = '0x6af3737f6d58ae8bcb9f2b597125d37244596e590000000000000000000000d1'; //reaper crypt
const BB_RF_WBTC = '0x6af3737F6d58Ae8Bcb9f2B597125D37244596E59';

const BB_RF_WSTETH_ID = '0x7e9250cc13559eb50536859e8c076ef53e275fb30000000000000000000000ce';
const BB_RF_WSTETH = '0x7e9250cC13559eB50536859e8C076Ef53e275Fb3';

const OP = '0x4200000000000000000000000000000000000042';
const WSTETH = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb';
const WETH = '0x4200000000000000000000000000000000000006';
const USDT = getAddress('0x94b008aA00579c1307B0EF2c499aD98a8ce58e58');
const MAI = '0xdFA46478F9e5EA86d57387849598dbFB2e964b02';

// const bbrfUSDC = '0xDc2007D9e9A33f50630F26069FAab69c25f7758C';
// const id = '0xdc2007d9e9a33f50630f26069faab69c25f7758c0000000000000000000000d6';

const bbrfUSDT = getAddress('0xBEF1ccAaDA458a570C37B11A8872988bA1E4FDb9');
const id = '0xf970659221bb9d01b615321b63a26e857ffc030b0000000000000000000000e9';

// const bbrfDAI = '0x8fE33d737484CA194dedF64AaFa8485327fC5372';
// const id = '0x8fe33d737484ca194dedf64aafa8485327fc53720000000000000000000000d8';

// const bbrfWETH = getAddress('0x8003eec4aDD35C6D23eB1Ef61b4fA6bbBB23a41a');
// const id = '0x8003eec4add35c6d23eb1ef61b4fa6bbbb23a41a0000000000000000000000d9';

// const brfWSTETH = '0xB85245929dc65B5EDdb56c4b4E84b20BcE69Db35';
// const id = '0xb85245929dc65b5eddb56c4b4e84b20bce69db350000000000000000000000da';

// const bbrfWBTC = '0xd32F78F5aE235269c6d2cABBD26A57fF9FD62967';
// const id = '0xd32f78f5ae235269c6d2cabbd26a57ff9fd629670000000000000000000000db';

// const bbrfOP = '0x55b1F937B1335Be355C82e207FD437182c986Ba1';
// const id = '0x55b1f937b1335be355c82e207fd437182c986ba10000000000000000000000dc';

const bbrfusd = '0x64cee2338369aa9b36fc756ea231eb9bc242926f';

const sender = process.env.DEPLOYER_ADDRESS || ''; //deployer

const rfUSDC = getAddress('0x508734b52ba7e04ba068a2d4f67720ac1f63df47');

const vaultTokenAddress = rfUSDC;
const linearPoolId = '0xf970659221bb9d01b615321b63a26e857ffc030b0000000000000000000000e9';
const mainTokenAddress = USDC;

const direction: 'wrap' | 'unwrap' = 'wrap';

const VAULT_ADDRESS_OP = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';

async function swap() {
  const vault = await ethers.getContractAt(VaultAbi.abi, '0xBA12222222228d8Ba445958a75a0704d566BF2C8');

  //6,901.066037322872044353
  // amount: fp(972.167293540831277497),
  // const data: SingleSwap = {
  //   poolId: bbyv4poolId,
  //   kind: 0, //0 means the amount is givenIn. 1 is for giventOut
  //   assetIn: bbyv4pool,
  //   assetOut: bbyvUSDC,
  //   amount: fp(1488.21782946969),
  //   userData: '0x', //the user data here is not relevant on the swap
  // };

  // const token = await ethers.getContractAt(ERC20, USDC);
  // await token.approve('0xBA12222222228d8Ba445958a75a0704d566BF2C8', parseUnits('0.1', 6));

  const data: SingleSwap = {
    poolId: id,
    kind: 0, //0 means the amount is givenIn. 1 is for giventOut
    assetIn: rfUSDC,
    assetOut: USDC,
    amount: parseUnits('0.1', 6),
    userData: '0x', //the user data here is not relevant on the swap
  };

  const funds: FundManagement = {
    sender,
    fromInternalBalance: false,
    toInternalBalance: false,
    recipient: sender,
  };

  const transaction = await vault.swap(data, funds, '0', MAX_UINT256);
  const receipt = await transaction.wait();

  console.log('receipt', receipt);
}

swap().catch((e) => {
  console.log('error', e);
});
