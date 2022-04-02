import Web3 from "web3";

import { Contract } from 'web3-eth-contract'
import { AbiItem } from "web3-utils";
import usersJInt from '../build/contracts/Users.json';

const USERS_CONTRACT_ADDRESS = "0xECf3E679987A04fD82AA826A2f8691EFa23aAD3b";

async function main() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    let my_account = '0x66DA5d784b81381d15973EAf6bA033d2473ABb75';
    let my_pk = 'ef5f34a1fd50262c8ad61c6596a2ae6125939f8f0fd21a75819210b1e28abc16';

    const abiItems = usersJInt.abi as AbiItem[]
    // const usersContract = new Contract(
        // abiItems,
        // USERS_CONTRACT_ADDRESS
    // )

    // usersContract.methods.getUserData(my_account).call().then(console.log).catch(console.error)

}

main()