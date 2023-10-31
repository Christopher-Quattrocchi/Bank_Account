function BankAccount (name, initialDeposit) {
    this.name = name;
    this.balance = initialDeposit;
}

BankAccount.prototype.depositMoney = function(deposit) {
  if (deposit > 0) {
    this.balance += deposit;
    console.log("After depositing you have: " + this.balance)
  } else {
    console.log("Enter a positive number");
  }
};

BankAccount.prototype.withdrawMoney = function(withdraw) {
    if (withdraw > 0 && (this.balance >= withdraw)) {
        this.balance -= withdraw;
        console.log("After withdrawal you have: " + this.balance)
    } else {
      console.log("You don't have enough money")
    }
}