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

  const poolId = '0xacfe9b4782910a853b68abba60f3fd8049ffe6380000000000000000000000ff';
  const poolAddress = '0xacfe9b4782910a853b68abba60f3fd8049ffe638';

  const tokens = [
    {
      ...TOKENS['OPTIMISM'].DOLA,
      balance: parseUnits('0.1', TOKENS['OPTIMISM'].DOLA.decimals),
    },
    {
      ...TOKENS['OPTIMISM'].USDC,
      balance: parseUnits('0.1', TOKENS['OPTIMISM'].USDC.decimals),
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
