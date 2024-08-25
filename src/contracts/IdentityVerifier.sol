// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityVerifier {
    address public owner;
    mapping(address => bool) public isVerified;
    mapping(address => string) public identityDocs;

    constructor() {
        owner = msg.sender;
    }

    function registerIdentity(string memory ipfsHash) public {
        identityDocs[msg.sender] = ipfsHash;
    }

    function verifyIdentity(address user) public onlyOwner {
        isVerified[user] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
}
