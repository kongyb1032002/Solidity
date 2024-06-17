// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EIPTEST is EIP712 {
    string text = 'Hello world!';
    address owner;

    struct Greeting {
        string content;
    }

    constructor() EIP712("EIPTEST", "1") {
        owner = msg.sender;
    }

    function verify(Greeting memory mail, bytes memory signature) internal view returns (address){
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("Greeting(string content)"),
                    keccak256(bytes(mail.content))
                )
            )
        );
        address signer = ECDSA.recover(digest, signature);

        return signer;
    }

    function greet(Greeting memory mail, bytes memory signature) public view returns (address) {
        // require(verify(mail, signature), "Invalid signature");

        // text = mail.content;
        address signer = verify(mail, signature);
        console.log(signer);
        return signer;
    }
}
