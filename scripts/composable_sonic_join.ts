// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../v2/tasks/20210418-vault/artifact/Vault.json';

import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_CANONCIAL } from './constants';
import { fp } from '../src/helpers/numbers';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_CANONCIAL);

  // BEGIN ====== variables ====== BEGIN

  const poolId = '0x4534c46c3d967988b2c81fa7834f5be86d51430100000000000000000000008b';
  const poolAddress = '0x4534c46c3d967988b2c81fa7834f5be86d514301';

  const tokens = [
    {
      ...TOKENS['SONIC'].STS,
      balance: parseUnits('0.101', TOKENS['SONIC'].STS.decimals),
    },
    {
      ...TOKENS['SONIC'].ATS,
      balance: parseUnits('0.1', TOKENS['SONIC'].ATS.decimals),
    },
    {
      address: poolAddress,
      balance: fp(10_000_000_000_000_000),
    },
  ];

  // END ====== variables ====== END

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address));

  console.log({ sortedTokens });

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
