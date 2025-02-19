// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../v2/tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_CANONCIAL } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_CANONCIAL);

  const POOL_ID = '0xbd4a2ecdcd7acb0d2b20744ac4cc1368dd8fdc410001000000000000000000a8';
  const tokens = [
    { ...TOKENS['SONIC'].SCETH, balance: parseUnits('0.0002054', TOKENS['SONIC'].SCETH.decimals) },
    { ...TOKENS['SONIC'].SCBTC, balance: parseUnits('0.00000543', TOKENS['SONIC'].SCBTC.decimals) },
    { ...TOKENS['SONIC'].SCUSD, balance: parseUnits('0.58308', TOKENS['SONIC'].SCUSD.decimals) },
    { ...TOKENS['SONIC'].STS, balance: parseUnits('0.843', TOKENS['SONIC'].STS.decimals) },
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
