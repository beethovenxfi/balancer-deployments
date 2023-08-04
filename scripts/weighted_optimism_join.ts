// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_OP } from './constants';


async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_OP);

  const POOL_ID = '0x8a2872fd28f42bd9f6559907235e83fbf4167f480001000000000000000000f2';
  const tokens = [
    { ...TOKENS['OPTIMISM'].BBRFUSDC, balance: parseUnits('0.1', TOKENS['OPTIMISM'].BBRFUSDC.decimals) },
    {
      ...TOKENS['OPTIMISM'].BBRFWSTETH,
      balance: parseUnits('0.00010582010582', TOKENS['OPTIMISM'].BBRFWSTETH.decimals),
    },
    { ...TOKENS['OPTIMISM'].BBRFWBTC, balance: parseUnits('0.00000335', TOKENS['OPTIMISM'].BBRFWBTC.decimals) },
  ];

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address));

  await initJoinPool(
    {
      vault: vault,
      poolId: POOL_ID,
      tokens: sortedTokens.map((token) => token.address),
      initialBalances: sortedTokens.map((token) => token.balance),
    },
    true
  );
}

join().catch((e) => {
  console.log('error', e);
});
