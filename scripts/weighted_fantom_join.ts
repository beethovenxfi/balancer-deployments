// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_FTM } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_FTM);

  const POOL_ID = '0xBA8183F0C67E8A84BED641B9EC8F5A2BA2F5285F0001000000000000000007CB';
  const tokens = [
    { ...TOKENS['FANTOM'].FSONIC, balance: parseUnits('0.000108536564307784', TOKENS['FANTOM'].FSONIC.decimals) },
    { ...TOKENS['FANTOM'].KIRBY, balance: parseUnits('28.19308376447694717', TOKENS['FANTOM'].KIRBY.decimals) },
    { ...TOKENS['FANTOM'].CEKKE, balance: parseUnits('41284310.0785056015', TOKENS['FANTOM'].CEKKE.decimals) },
    { ...TOKENS['FANTOM'].SANIK, balance: parseUnits('36331.2602886496726', TOKENS['FANTOM'].SANIK.decimals) },
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
