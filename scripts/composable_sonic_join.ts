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

  const poolId = '0x374641076b68371e69d03c417dac3e5f236c32fa000000000000000000000006';
  const poolAddress = '0x374641076b68371e69d03c417dac3e5f236c32fa';

  const tokens = [
    {
      ...TOKENS['SONIC'].STS,
      balance: parseUnits('0.5', TOKENS['SONIC'].STS.decimals),
    },
    {
      ...TOKENS['SONIC'].WS,
      balance: parseUnits('0.5', TOKENS['SONIC'].WS.decimals),
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
