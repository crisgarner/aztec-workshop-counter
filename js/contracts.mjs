// src/contracts.mjs
import { Contract, loadContractArtifact } from '@aztec/aztec.js';
import CounterContractJson from "../contracts/counter/target/counter-Counter.json" assert { type: "json" };
import { readFileSync } from 'fs';

const CounterContractArtifact = loadContractArtifact(CounterContractJson);

export async function getCounter(wallet) {
    const addresses = JSON.parse(readFileSync('addresses.json'));
    const contract = await Contract.at(addresses.counter, CounterContractArtifact, wallet);
    return contract
}
