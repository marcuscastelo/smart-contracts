const User = artifacts.require("User");

module.exports = function (deployer: any) { 
    deployer.deploy(User);
}

export {};