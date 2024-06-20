// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';

import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_FTM } from './constants';
import { fp } from '../src/helpers/numbers';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_FTM);

  // BEGIN ====== variables ====== BEGIN

  const poolId = '0xaac7b8d6d7009428d6ddad895bdf50c6fcbbe2c000000000000000000000080d';
  const poolAddress = '0xaAc7B8d6D7009428d6DdaD895bdf50C6FCBbe2C0';

  const tokens = [
    {
      ...TOKENS['FANTOM'].LZUSDC,
      balance: parseUnits('0.1', TOKENS['FANTOM'].LZUSDC.decimals),
    },
    {
      ...TOKENS['FANTOM'].AXLUSDC,
      balance: parseUnits('0.1', TOKENS['FANTOM'].AXLUSDC.decimals),
    },
    {
      ...TOKENS['FANTOM'].USDCE,
      balance: parseUnits('0.1', TOKENS['FANTOM'].USDCE.decimals),
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
    false
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
