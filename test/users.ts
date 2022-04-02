const Users = artifacts.require("Users");

contract("User", accounts => {
    it("should have an empty array of users", async () => {
        const user = await Users.deployed();
        console.log(user.address);
    });
});