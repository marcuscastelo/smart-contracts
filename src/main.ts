import Web3 from 'web3';
import usersJsonContract from '../build/contracts/Users.json';
import { UsersInstance } from '../types/truffle-contracts';

const makeContract = require('@truffle/contract');
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');

async function main() {
    const web3 = new Web3(provider);
    
    const Users = makeContract(usersJsonContract);
    Users.setProvider(provider);
    
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    
    const users = await Users.deployed() as UsersInstance;
    
    await users.updateUserInfo(account, "John", "Doe", {from: account});

    const user = await users.getUserInfo(account);
    console.log(user);
}

main()

export {};