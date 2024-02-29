> [!WARNING]
> Currently this demo only works with the `STBLTEST` adapter and token, for which there is no
> public faucet. If and when USDC deploys the adapter and the Celo community votes to make USDC an 
> accepted fee currency, we'll have to update the addresses in [`constants.ts`](./constants.ts).

# Fee Currencies on Celo

> [!TIP] 
> Code examples for
> [docs.celo.org > Paying for Gas in Tokens](https://docs.celo.org/protocol/transaction/erc20-transaction-fees#alfajores-testnet).
> Visit that page for more information.

Fee currency transactions are unique to Celo. Fee currency transactions are made using a custom
transaction type described here: [`celo-org/txtypes`](https://github.com/celo-org/txtypes). Visit
that repository for an explainer and more context on the lower-level implementation of fee currency
transactions.

This repo provides as a higher-level explainer on making fee currency transactions with popular
JS/TS client libraries.

## Guide

### `viem` (Recommended ✅)

We recommend you build with `viem`, if you are starting from scratch. See demo in
[`viem.ts`](/viem.ts).

### `web3js` + `@celo/connect` (Discouraged ❌)

We don't recommend you build with `web3js` and `@celo/connect`, if you are starting from scratch.

That's because `@celo/connect` only supports `web3js@1.10`, and not the latest version
`web3js@4.5.0`.

Instead, we recommend you build with `viem`. But, for completeness, we included a demo in
[`web3.ts`](/web3.ts) so you can see usage patterns.

### `@celo/contractkit` (Discouraged ❌)

We don't recommend you build with `@celo/contractkit`, if you are starting from scratch.

That's because `@celo/contractkit` is a library for developers who want to interact with
[core contracts](https://docs.celo.org/contract-addresses) like `Governance.sol` or `Election.sol`.

Instead, we recommend you build with `viem`. But, for completeness, we included a demo in
[`contractkit.ts`](/contractkit.ts) so you can see usage patterns.

### Raw transaction (Experts-only 🟠)

We don't recommend constructing fee currency transactions without client libraries, if you are not
an expert.

That's because constructing fee currency transactions without client libraries requires a thorough
understanding of cryptographic signatures, transaction serialization, and typed transaction
envelopes.

But, if you would really like to construct fee currency transactions this way, you can learn more
about the transaction arguments and format here: `celo-org/txtypes`.

## Demo usage

### Requirements

-   The private key of a Celo wallet with at least 1 USDC on the Alfajores testnet (you can get free
    USDC testnet tokens from [faucet.circle.com](https://faucet.circle.com/))

### Installing Node.js

We use [Node.js](https://nodejs.org/en/) to run the project locally. You need to install the
**Node.js version** specified in [.nvmrc](./.nvmrc). To do so, run:

```sh
$ nvm install
$ nvm use
```

### Installing dependencies

Once in the project's root directory, run the following command to install the project's
dependencies:

```sh
$ yarn install
```

### Set up environment variables

Create a `.env` file in the root directory of the project:

```sh
cp .env.example .env
```

Paste the private key of an account you'd like to play with into the `.env` file.

### Run the demo

After installing the dependencies and pasting a private key, the project is ready to be run.

```sh
$ yarn ts-node <scrip-name>
```

### Expected output

When you execute a script, you will see something akin to this output:

```sh
$ yarn ts-node viem.ts

Initiating fee currency transaction...
STBLTEST balance of 0x303C22e6ef01CbA9d03259248863836CB91336D5: 59.946671
Done! Transaction hash: 0x8646968a8fe025fc7fd47a4e754953ddb4fe2936b43c06d82313463cb7851071
✨  Done in 8.23s.
```
