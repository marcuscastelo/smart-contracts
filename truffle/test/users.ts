const Users = artifacts.require("Users");
const truffleAssert = require('truffle-assertions');

contract("User", accounts => {
    it("Should have been deployed", async () => {
        const users = await Users.deployed();
        assert(users.address.length > 0, "Address vector is empty");
    });

    it("Should be able to update user info", async () => {
        const users = await Users.deployed();
        const account = accounts[0];
        await users.updateUserInfo(account, "John", "test@test.com");
        const user = await users.getUserInfo(accounts[0]);
        assert.isTrue(user.name === "John", "Name is not set correctly");
        assert.isTrue(user.email === "test@test.com");
    });

    it("Should be able to update update exposures", async () => {
        const users = await Users.deployed();
        const companyAddress = accounts[0];
        const userAddress = accounts[1];

        await users.updateUserInfo(userAddress, "John", "test@test.com", {from: userAddress});
        await users.updateUserCompanyPrefs(userAddress, companyAddress, true, {from: userAddress});
    });

    it("Company should be able to get exposed user info", async () => {
        const users = await Users.deployed();
        const companyAddress = accounts[0];
        const userAddress = accounts[1];

        await users.updateUserCompanyPrefs(userAddress, companyAddress, true, {from: userAddress});

        const _ = await users.getUserInfo(userAddress, {from: companyAddress});
    });

    it("Company should be not able to get unexposed user info", async () => {
        const users = await Users.deployed();
        const companyAddress = accounts[0];
        const userAddress = accounts[1];

        await users.updateUserInfo(userAddress, "John", "teste@teste.com", {from: userAddress});
        await users.updateUserCompanyPrefs(userAddress, companyAddress, false, {from: userAddress});

        truffleAssert.reverts(users.getUserInfo(userAddress, {from: companyAddress}))
    });

    
});