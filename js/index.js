// src/index.mjs
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import { createPXEClient, waitForPXE } from '@aztec/aztec.js';
import { fileURLToPath } from '@aztec/foundation/url';

import { getCounter } from './contracts.mjs';


const { PXE_URL = 'http://localhost:8080' } = process.env;

async function main() {
  const pxe = await createPXEClient(PXE_URL);
  const { l1ChainId } = await pxe.getNodeInfo();
  console.log(`Connected to chain ${l1ChainId}`);
  showAccounts(pxe);
  showPrivateCounter(pxe);
}

main().catch(err => {
  console.error(`Error in app: ${err}`);
  process.exit(1);
});

async function showAccounts(pxe) {
    const accounts = await pxe.getRegisteredAccounts();
    console.log(`User accounts:\n${accounts.map(a => a.address).join('\n')}`);
}


async function showPrivateCounter(pxe) {
    const [owner] = await getInitialTestAccountsWallets(pxe);
    const counter = await getCounter(owner);

    const accounts = await pxe.getRegisteredAccounts();

    for (const account of accounts) {
      const counterAmount = await counter.methods.get_counter(account.address).simulate();
      console.log(`counter of ${account.address}: ${counterAmount}`);
    }
}
