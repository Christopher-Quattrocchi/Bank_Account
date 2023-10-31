//Business Logic
function BankAccount(name, initialDeposit) {
  this.name = name;
  this.balance = initialDeposit;
}

BankAccount.prototype.depositMoney = function (deposit) {
  if (deposit > 0) {
    this.balance += deposit;
    console.log("After depositing you have: " + this.balance)
  } else {
    console.log("Enter a positive number");
  }
};

BankAccount.prototype.withdrawMoney = function (withdraw) {
  if (withdraw > 0 && (this.balance >= withdraw)) {
    this.balance -= withdraw;
    console.log("After withdrawal you have: " + this.balance)
  } else {
    console.log("You don't have enough money")
  }
}

//UI Logic
let myAccount;
window.addEventListener("load", function () {
  document.getElementById("register").addEventListener("submit", handleCreation)
  document.getElementById("change-balance").addEventListener("submit", handleChangeBalance);
})

function handleCreation(e) {
  e.preventDefault();
  const name = document.getElementById("input-name").value;
  const initialDeposit = parseInt(document.getElementById("initial-deposit").value);

  myAccount = new BankAccount(name, initialDeposit);
  console.log(myAccount);


}

function handleChangeBalance(e) {
  e.preventDefault();
  if (myAccount) {
    const deposit = parseInt(document.getElementById("deposit").value);
    const withdraw = parseInt(document.getElementById("withdraw").value);
    if (!isNaN(deposit) && deposit > 0) {
      myAccount.depositMoney(deposit);
      console.log(myAccount.balance);
    } else if (withdraw) {
      myAccount.withdrawMoney(withdraw);
      console.log(myAccount.balance);
    }
    else {
      console.log("Please enter a valid withdrawal or deposit");
    }
  } else {
    console.log("create an account");
  }
}