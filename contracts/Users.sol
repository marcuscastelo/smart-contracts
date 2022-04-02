// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users {
    address public id;
    string public name;
    string public email;

    constructor(string memory _name, string memory _email) {
        id = msg.sender;
        name = _name;
        email = _email;
    }
}