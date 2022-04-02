// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users {
    struct UserInfo {
        address id;
        string name;
        string email;
    }

    mapping(address => UserInfo) public usersInfo;
    
    function setMyData(string calldata name, string calldata email) external {
        UserInfo memory user;
        user.id = msg.sender;
        user.name = name;
        user.email = email;
        usersInfo[msg.sender] = user;
    }

    function getUserData(address _address) public view returns (UserInfo memory) {
        return usersInfo[_address];
    }
}