import { Web3 } from 'web3';
import { Connection, CeloProvider } from '@celo/connect';

const web3 = new Web3("https://alfajores-forno.celo-testnet.org") // Celo testnet
const connection = new Connection(web3)

connection.setProvider(CeloProvider)