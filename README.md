# Fee Currencies on Celo

> [!TIP]
> Code examples for [docs.celo.org > Paying for Gas in Tokens](https://docs.celo.org/protocol/transaction/erc20-transaction-fees#alfajores-testnet). Visit that page for more information.

Fee currency transactions are unique to Celo. Fee currency transactions are made using a 
custom transaction type described here: `celo-org/txtypes` (TODO(Arthur): link repo). Visit that repository for an explainer 
and more context on the lower-level implementation of fee currency transactions.

This repo provides as a higher-level explainer on making fee currency transactions with popular 
JS/TS client libraries.

## Usage

### `viem` (Recommended ✅)

We recommend you build with `viem`, if you are starting from scratch. 
See demo in [`viem.ts`](/viem.ts).

## RPC client (Experts-only 🟠)

We don't recommend constructing fee currency transactions without client libraries, if you are 
not an expert.

That's because constructing fee currency transactions without client libraries requires a thorough
understanding of cryptographic signatures, transaction serialization, and typed transaction 
envelopes.

But, if you would really like to construct fee currency transactions this way, you 
can learn more about the transaction arguments and format here: `celo-org/txtypes`.

### `web3js` + `@celo/connect` (Discouraged ❌)

We don't recommend you build with `web3js` and `@celo/connect`, if you are starting from scratch.

That's because `@celo/connect` only supports `web3js@1.10`, and not the latest version 
`web3js@4.5.0`.

Instead, we recommend you build with `viem`. But, for completeness, we included a demo in 
[`web3.ts`](/web3.ts) so you can see usage patterns.

### `@celo/contractkit` (Discouraged ❌)

We don't recommend you build with `@celo/contractkit`, if you are starting from scratch.

That's because `@celo/contractkit` is a library for developers who want to 
interact with core contracts (TODO(Arthur): link docs.celo.org) like `Governance.sol` or 
`Election.sol`. 

Instead, we recommend you build with `viem`. But, for completeness, we included a demo in 
[`contractkit.ts`](/contractkit.ts) so you can see usage patterns.
