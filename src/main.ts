import Web3 from 'web3';
import usersJsonContract from '../build/contracts/Users.json';
import { UsersInstance } from '../types/truffle-contracts';

// Stuff stored in the blockchain
interface UserInfo {
    name: string;
    email: string;
}

// Identity data
interface UserCreds {
    address: string;
    // public_key: string;
    privateKey: string;
}

class UserManager {
    constructor(private userCreds: UserCreds, private users: UsersInstance) { }

    async getUserInfo(from: string): Promise<UserInfo> {
        const user = await this.users.getUserInfo(this.userCreds.address, { from });
        //TODO: try-catch
        //TODO: check if from is legit (signature?)
        return user;
    }

    async updateUserInfo(from: string, newInfo: Partial<UserInfo>) {
        const userAddress = this.userCreds.address;
        
        // Replace undefined fields with info already in the blockchain
        const currentInfo = await this.getUserInfo(from);
        const updatedInfo = { ...currentInfo, ...newInfo };
        
        // Update on blockchain the user info with new values
        const { name, email } = updatedInfo;
        await this.users.updateUserInfo(userAddress, name, email, { from });
        //TODO: try-catch
        //TODO: check if from is legit (signature?)
    }
}

async function main() {
    const makeContract = require('@truffle/contract');
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    const web3 = new Web3(provider);
    const UsersContract = makeContract(usersJsonContract);
    UsersContract.setProvider(provider);
    const users = await UsersContract.deployed() as UsersInstance;


    const user1: UserCreds = {
        address: '0x64e96dFB728b9DEb809C601076f9FA094213Ad92',
        privateKey: 'c2f756520fbeb7f8831c295e47099973ab6caaed38770de80f2ff0fc04e30bb9',
    }

    const company1: UserCreds = {
        address: '0xd6A39cf9257D63C0E63aec2662579295f4E13d32',
        privateKey: '8f52cd6c4d3167dada9c276128f798d022434484a0ff3efda1bdf23c43cc08ea',
    }

    const userManager = new UserManager(user1, users);

    console.log(await userManager.getUserInfo(company1.address));
    await userManager.updateUserInfo(company1.address, { name: "John" });
    console.log(await userManager.getUserInfo(company1.address));
}

main()

export { };