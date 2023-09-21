// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_OP } from './constants';
import { fp } from '../src/helpers/numbers';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_OP);

  // BEGIN ====== variables ====== BEGIN

  const poolId = '0x9DA11FF60BFC5AF527F58FD61679C3AC98D040D9000000000000000000000100';
  const poolAddress = '0x9Da11Ff60bfc5aF527f58fd61679c3AC98d040d9';

  const tokens = [
    {
      ...TOKENS['OPTIMISM'].USDCE,
      balance: parseUnits('0.1', TOKENS['OPTIMISM'].USDCE.decimals),
    },
    {
      ...TOKENS['OPTIMISM'].USDC,
      balance: parseUnits('0.1', TOKENS['OPTIMISM'].USDC.decimals),
    },
    {
      ...TOKENS['OPTIMISM'].USDT,
      balance: parseUnits('0.1', TOKENS['OPTIMISM'].USDT.decimals),
    },
    {
      ...TOKENS['OPTIMISM'].DAI,
      balance: parseUnits('0.1', TOKENS['OPTIMISM'].DAI.decimals),
    },
    {
      address: poolAddress,
      balance: fp(10_000_000_000_000_000),
    },
  ];

  // END ====== variables ====== END

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address));

  console.log({ sortedTokens });

  //linear 1
  await initJoinPool(
    {
      vault,
      poolId,
      tokens: sortedTokens.map((token) => token.address),
      initialBalances: sortedTokens.map((token) => token.balance),
    },
    true
  );

  //linear 2
  // await joinPool({
  //   vault: vault,
  //   poolId: DAIPLUS_LINEAR_POOLID,
  //   tokens: [DAI],
  //   initialBalances: [parseUnits('0.1', 18)],
  // });

  //composable
  // await joinPool({
  //   vault: vault,
  //   poolId: WSTETH_META_POOLID,
  //   tokens: [WSTETH, WETH],
  //   initialBalances: [parseUnits('0.002', 18), parseUnits('0.002', 18)],
  // });
}

join().catch((e) => {
  console.log('error', e);
});
