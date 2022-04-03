// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users {

    struct UserInfo {
        string name;
        string email;
    }

    struct UserCompanyPrefs {
        bool expose_name;
        bool expose_email;
    }

    address[] companyNames;
    mapping(address => mapping(address => UserCompanyPrefs)) userCompanyPrefsMap;
    mapping(address => UserInfo) userInfoMap;
    
    function updateUserInfo(address _user_address, string calldata name, string calldata email) external {
        require(_user_address == msg.sender, "Only the user can update their info");
        UserInfo memory userInfo;
        userInfo.name = name;
        userInfo.email = email;
        userInfoMap[msg.sender] = userInfo;
    }

    function updateUserCompanyPrefs(address _user_address, address _company_address, bool value) external {
        require(msg.sender == _user_address, "Only the user can update his preferences");
        UserCompanyPrefs memory userCompanyPrefs;
        userCompanyPrefs.expose_name = value;
        userCompanyPrefs.expose_email = value;
        userCompanyPrefsMap[_user_address][_company_address] = userCompanyPrefs;
    }

    //TODO: restrict access to this function to only the company that has permission to view the user info
    function getUserInfo(address _address) external view returns (UserInfo memory) {
        require(
            msg.sender == _address ||
            userCompanyPrefsMap[_address][msg.sender].expose_name //TODO: check for fields individually
        , "User info is restricted so the company can't view it");

        return userInfoMap[_address];
    }

    function getUserCompanyPrefs(address _user_address, address _company_address) external view returns (UserCompanyPrefs memory) {
        return userCompanyPrefsMap[_user_address][_company_address];
    }
}