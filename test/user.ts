const User = artifacts.require("User");

contract("User", accounts => {
    it("should have an empty array of users", async () => {
        const user = await User.deployed();
        console.log(user.address);
    });    
})