const { ethers, Wallet } = require("ethers");
const abi = require("./abi"); // Đảm bảo rằng bạn có ABI đúng của contract

const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const contractAddr = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const networkRpc = 'http://127.0.0.1:8545/';
const provider = new ethers.providers.JsonRpcProvider(networkRpc);
const wallet = new Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddr, abi, wallet)
const msgParams = {
    domain: {
        name: 'Greet',
        version: '1',
        chainId: 31337, // Phải là số nguyên
        verifyingContract: contractAddr // Đảm bảo xác thực đúng hợp đồng
    },
    types: {
        Greeting: [
            { name: 'text', type: 'string' }
        ]
    },
    message: {
        text: 'Good Morning'
    }
};

async function signAndGreet() {
    try {
        // Ký dữ liệu theo chuẩn EIP-712
        const rawSign = await wallet._signTypedData(msgParams.domain, msgParams.types, msgParams.message);
        console.log("raw: ", rawSign);

        const signature = ethers.utils.splitSignature(rawSign);
        console.log('signature: ', signature);

        // Gọi hàm greet với dữ liệu đã ký
        const tx = await contract.greet(
            ['Good Morning'],
            rawSign,
            { gasLimit: 300000 } // Thiết lập giới hạn gas thủ công nếu cần thiết
        );

        console.log("tx: ", tx);
        console.log("Transaction confirmed: ", tx.hash);
    } catch (error) {
        console.error('Error signing data or sending transaction:', error);
    }
}

signAndGreet().catch(console.error);