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

  const poolId = '0xE7334EAE666C2FAC73FD610603C0138DB48D188B0000000000000000000007EF';
  const poolAddress = '0xE7334EAe666c2Fac73fd610603C0138dB48d188B';

  const tokens = [
    {
      ...TOKENS['FANTOM'].MFTM,
      balance: parseUnits('0.05', TOKENS['FANTOM'].MFTM.decimals),
    },
    {
      ...TOKENS['FANTOM'].SFTMX,
      balance: parseUnits('0.05', TOKENS['FANTOM'].SFTMX.decimals),
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
