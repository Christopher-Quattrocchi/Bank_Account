function BankAccount (name, initialDeposit) {
    this.name = name;
    this.balance = initialDeposit;
}

BankAccount.prototype.depositMoney = function(deposit) {
  this.balance += deposit;
}