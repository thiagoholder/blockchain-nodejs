class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(
      (t) => t.id === transaction.id
    );

    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] =
        transaction;
    }else {
			this.transactions.push(transaction);
		}
  }

	exitingTransaction(adress){
		return this.transactions.find(t => t.input.adress === adress);
	}

}

module.exports = TransactionPool;