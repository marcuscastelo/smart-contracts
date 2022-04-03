import { getContractInstance } from "./contract-manager";
import UserManager from "./user-manager";

async function main() {
    const myUser = {
        address: '0x64e96dFB728b9DEb809C601076f9FA094213Ad92',
        privateKey: 'c2f756520fbeb7f8831c295e47099973ab6caaed38770de80f2ff0fc04e30bb9',
    }

    const myAddr = myUser.address;

    const users = await getContractInstance();

    const userManager = new UserManager(myUser, users);
    
    console.log(`User info: ${JSON.stringify(await userManager.getUserInfo(myAddr))}`);
}

main()