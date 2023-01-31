const Transaction = require("./transaction");
const Wallet = require("./index");

describe("Transaction", () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = "B1ockh41n";
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it("output the `amount` subtracted from the wallet balance", () => {
    expect(
      transaction.outputs.find((output) => output.adress == wallet.publicKey)
        .amount
    ).toEqual(wallet.balance - amount);
  });

  it("outputs `amount` add to the recipient", () => {
    expect(
      transaction.outputs.find((output) => output.adress == recipient).amount
    ).toEqual(amount);
  });

  it("inputs the balance of the wallet", () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it("validates a valid transaction", () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it("invalidates a corrupt transaction", () => {
    transaction.outputs[0].amount = 50000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });

  describe("transacting with an amount exceeds the balance", () => {
    beforeEach(() => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it("does note create the transaction", () => {
      expect(transaction).toEqual(undefined);
    });
  });

  describe("updating a transaction", () => {
    let nextAmount, nextRecipient;

    beforeEach(() => {
      nextAmount = 20;
      nextRecipient = "n3xt-B1ockh41n";
      transaction = transaction.update(wallet, nextRecipient, nextAmount);
    });

    it("subtracts the next amount from the sender output", () => {
      expect(
        transaction.outputs.find((output) => output.adress == wallet.publicKey)
          .amount
      ).toEqual(wallet.balance - amount - nextAmount);
    });

    it("outputs an amount for the next recipient", () => {
      expect(
        transaction.outputs.find((output) => output.adress == nextRecipient)
          .amount
      ).toEqual(nextAmount);
    });
  });
});
