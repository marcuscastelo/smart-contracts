import { sys } from 'typescript';
import { UsersInstance } from '../types/truffle-contracts';
import { getContractInstance } from './contract-manager';


// Stuff stored in the blockchain
export interface UserInfo {
    name: string;
    email: string;
}

// Identity data
export interface UserCreds {
    address: string;
    // public_key: string;
    privateKey: string;
}

export default class UserManager {
    constructor(private userCreds: UserCreds, private users: UsersInstance) { }

    async getUserInfo(from: string): Promise<UserInfo> {
        const userAddress = this.userCreds.address;
        try {
            const user = await this.users.getUserInfo(userAddress, { from });

            const halfLen = user.name.length / 2; // For some reason, fields are stored in the blockchain twice
            const halfKeys = Object.keys(user).filter((_, idx) => idx >= halfLen);
            const halfEntries = Object.entries(user).filter(([key, _]) => halfKeys.includes(key));

            //TODO: maybe check perfomance? (it's js though)
            const newUser = halfEntries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as UserInfo);

            return newUser;
        } catch (e: any) {
            console.log(`Error getting user info: ${e.data}`);

            const errorData = Object.values(e.data).entries().next().value[1];

            console.dir(errorData)
            if (errorData.error === 'revert') {
                throw new Error(`Error retrieving user info (address=${userAddress}):\n\t Reason (revert): "${errorData.reason}"`);
            } else {
                throw e;
            }
        }
            
        //TODO: try-catch
        //TODO: check if from is legit (signature?)
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

    async updateUserCompanyPrefs(from: string, targetCompany: string, newPrefs: boolean) {
        const userAddress = this.userCreds.address;
        await this.users.updateUserCompanyPrefs(userAddress, targetCompany, newPrefs, { from });
    }
}

async function example() {
    const users = await getContractInstance();

    const user1: UserCreds = {
        address: '0x393f813F7D4e0Aa03b5AC5D4445A6431b84175A7',
        privateKey: '-',
    }

    const company1: UserCreds = {
        address: '0x39b3Da63e20565add1B2E9e46d5D2732B6693426',
        privateKey: '-',
    }

    const userManager = new UserManager(user1, users);
    
    await userManager.updateUserCompanyPrefs(user1.address, company1.address, true);
    console.log(await userManager.getUserInfo(company1.address));
    await userManager.updateUserInfo(user1.address, { name: "John" });
    console.log(await userManager.getUserInfo(company1.address));
}

example().then(() => {
    console.log('Done');
    sys.exit(0);

}).catch((e: any) => {
    console.error(e);
});