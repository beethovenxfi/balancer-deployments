// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../v2/tasks/20210418-vault/artifact/Vault.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_CANONCIAL } from './constants';
import { fp } from '../src/helpers/numbers';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_CANONCIAL);

  // BEGIN ====== variables ====== BEGIN

  const poolId = '0xc9eb4b8ce914ee451360b315ffd1d1af8df96be9000000000000000000000143';
  const poolAddress = '0xc9eb4b8ce914ee451360b315ffd1d1af8df96be9';

  const tokens = [
    {
      ...TOKENS['OPTIMISM'].INSTETH,
      balance: parseUnits('0.001', TOKENS['OPTIMISM'].INSTETH.decimals),
    },
    {
      ...TOKENS['OPTIMISM'].WSTETH,
      balance: parseUnits('0.001', TOKENS['OPTIMISM'].WSTETH.decimals),
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
