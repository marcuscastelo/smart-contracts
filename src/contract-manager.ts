import usersJsonContract from '../build/contracts/Users.json';
const makeContract = require('@truffle/contract');
import Web3 from 'web3';
import { UsersInstance } from '../types/truffle-contracts';

const DEFAULT_PROVIDER_URL = 'http://127.0.0.1:7545';

interface IUsersContract {
    deployed: () => Promise<UsersInstance>;
}

export function createUserContract(providerUrl: string = DEFAULT_PROVIDER_URL): IUsersContract {
    const provider = new Web3.providers.HttpProvider(DEFAULT_PROVIDER_URL);
    const web3 = new Web3(provider);
    const contract = makeContract(usersJsonContract);
    contract.setProvider(provider);
    return contract as IUsersContract;
}

export async function getContractInstance(contract?: IUsersContract): Promise<UsersInstance> {
    return await contract?.deployed() ?? createUserContract().deployed();
}