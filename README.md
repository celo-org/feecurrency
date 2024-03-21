# Fee Currencies on Celo

> [!TIP] 
> Code examples for [docs.celo.org > Paying for Gas in Tokens](https://docs.celo.org/protocol/transaction/erc20-transaction-fees#alfajores-testnet).
> Visit that page for more information.

Fee currency transactions are unique to Celo. Fee currency transactions are made using a custom
transaction type described here: [`celo-org/txtypes`](https://github.com/celo-org/txtypes). Visit
that repository for an explainer and more context on the lower-level implementation of fee currency
transactions.

This repo provides as a higher-level explainer on making fee currency transactions with popular
JS/TS client libraries.

## Guide

### `viem` (Recommended ✅)

We recommend you build with `viem`, if you are starting from scratch. For a demo, see
[`viem.ts`](/viem.ts). You can run the demo as follows:

```sh
$ yarn ts-node viem.ts

Initiating fee currency transaction...
USDC balance of 0x303C22e6ef01CbA9d03259248863836CB91336D5: 10
Done! Transaction hash: 0x5242bb5340baa534f14285feac24fd8eac57cdd779b9a5cb2e88bbb5c3e6bb3d
✨  Done in 4.66s.
```

### `web3js` + `@celo/connect` (Discouraged ❌)

To make fee currency transactions with `web3js` you need to use it in conjunction with
`@celo/connect`. Bu, we don't recommend you build with `web3js` and `@celo/connect`, if you are
starting from scratch. That's because `@celo/connect` only supports `web3js@1.10`, and not the 
latest version `web3js@4.5.0`. Instead, we recommend you build with `viem`. 

But, for completeness, we included a demo in
[`web3.ts`](/web3.ts) so you can see usage patterns. You can run the demo as follows:

```sh
$ yarn ts-node web3.ts

Initiating fee currency transaction...
USDC balance of 0x303c22e6ef01cba9d03259248863836cb91336d5: 9.989236
Done! Transaction hash: 0x49fa99caa6c2a4aade1d3a979fedea5037542a7a7a39c70eeec14b7661a9b030
✨  Done in 4.78s.
```

### `@celo/contractkit` (Discouraged ❌)

We don't recommend you build with `@celo/contractkit`, if you are starting from scratch.
That's because `@celo/contractkit` is a library for developers who want to interact with
[core contracts](https://docs.celo.org/contract-addresses) like `Governance.sol` or `Election.sol`.
Instead, we recommend you build with `viem`. 

But, for completeness, we included a demo in [`contractkit.ts`](/contractkit.ts) so you can see 
usage patterns. You can run the demo as follows:

```sh
$ yarn ts-node contractkit.ts

Initiating fee currency transaction...
USDC balance of 0x303C22e6ef01CbA9d03259248863836CB91336D5: 9.957260999999999
Done! Transaction hash: 0x6a2c32283971ca90463fb58b00d4fe4c4d75b340bc3f646667a4bdc368f31a65
✨  Done in 5.85s.
```

### Raw transaction (Experts-only 🟠)

We don't recommend constructing fee currency transactions without client libraries, if you are not
an expert.

That's because constructing fee currency transactions without client libraries requires a thorough
understanding of cryptographic signatures, transaction serialization, and typed transaction
envelopes.

But, if you would really like to construct fee currency transactions this way, you can learn more
about the transaction arguments and format here: `celo-org/txtypes`.

## Demos

### Requirements

-   The private key of a Celo wallet with at least 1 USDC on the Alfajores testnet (you can get free
    USDC testnet tokens from [faucet.circle.com](https://faucet.circle.com/))

-   We use [Node.js](https://nodejs.org/en/) to run the project locally. You need to install the
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
USDC balance of 0x303C22e6ef01CbA9d03259248863836CB91336D5: 10
Done! Transaction hash: 0x5242bb5340baa534f14285feac24fd8eac57cdd779b9a5cb2e88bbb5c3e6bb3d
✨  Done in 4.66s.
```
