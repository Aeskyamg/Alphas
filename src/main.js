const {Blockchain, Transaction}= require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('9a697f8b0aa0172d71e24c3e8a13ce52e709eaa9a6ddcd7ffff4323b7a5be7a3');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const Alphas = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
Alphas.addTransaction(tx1);

// Mine block
Alphas.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
Alphas.addTransaction(tx2);

// Mine block
Alphas.minePendingTransactions(myWalletAddress);

console.log('\nBalance of younes is', Alphas.getBalanceOfAddress(myWalletAddress));

console.log();
console.log('Blockchain valid?', Alphas.isChainValid() ? 'Yes' : 'No');