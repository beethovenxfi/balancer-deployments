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

  const poolId = '0xcd7b2232b7435595bbc7fd7962f1f352fc2cc61a0000000000000000000000f0';
  const poolAddress = '0xCd7B2232B7435595bBc7FD7962f1f352fc2cC61a';

  const tokens = [
    {
      ...TOKENS['OPTIMISM'].BBRFDAI,
      balance: parseUnits('0.1', TOKENS['OPTIMISM'].BBRFDAI.decimals),
    },
    {
      ...TOKENS['OPTIMISM'].BBRFUSDC,
      balance: parseUnits('0.1', TOKENS['OPTIMISM'].BBRFUSDC.decimals),
    },
    { ...TOKENS['OPTIMISM'].BBRFUSDT, balance: parseUnits('0.1', TOKENS['OPTIMISM'].BBRFUSDT.decimals) },
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
