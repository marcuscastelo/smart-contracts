const Users = artifacts.require("Users");

module.exports = function (deployer: any) { 
    deployer.deploy(Users);
}

export {};