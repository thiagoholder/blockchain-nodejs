const { INITIAL_BALANCE } = require("../config");
const ChainUtil = require("../chain-util");
const Transaction = require("./transaction");

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPar = ChainUtil.genKeyPair();
    this.publicKey = this.keyPar.getPublic().encode("hex");
  }

  toString() {
    return `Wallet - 
        publicKey = ${this.publicKey.toString()}
        balance = ${this.balance}`;
  }

  sign(dataHash) {
    return this.keyPar.sign(dataHash);
  }

  createTransaction(recipient, amount, transactionPool) {
    if (amount > this.balance) {
      console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
      return;
    }

    let transaction = transactionPool.exitingTransaction(this.publicKey);

    if(transaction){
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }
}

module.exports = Wallet;
