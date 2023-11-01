// Business Logic

function RegisteredAccount() {
  this.accounts = [];
  this.currentId = 0;
}

RegisteredAccount.prototype.addAccount = function(account) {
  account.id = this.assignId();
  this.accounts[account.id] = account;
  this.accounts.push(account);
  console.log(account)
}

RegisteredAccount.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

let registeredAccounts = new RegisteredAccount();

function BankAccount(name, initialDeposit) {
  this.name = name;
  this.balance = initialDeposit;
}

BankAccount.prototype.depositMoney = function(deposit) {
  if (deposit > 0) {
    this.balance += deposit;
    depositSuccess(deposit, this.balance);
  } else {
    showError("Enter a positive number");
  }
};
BankAccount.prototype.withdrawMoney = function(withdraw) {
  if (withdraw > 0 && this.balance >= withdraw) {
    this.balance -= withdraw;
    withdrawSuccess(withdraw, this.balance);
  } else {
    showError("You don't have enough money");
  }
};

// UI Logic
let myAccount;
window.addEventListener("load", function() {
  document.getElementById("register").addEventListener("submit", handleAccountCreation);
  document.getElementById("change-balance").addEventListener("submit", handleChangeBalance);
  document.querySelector("a#log-out").addEventListener("click", logOut);
  document.querySelector("a#displayDeposit").addEventListener("click", depositDisplay);
  document.querySelector("a#displayWithdraw").addEventListener("click", withdrawDisplay)
});

function handleAccountCreation(e) {
  e.preventDefault();
  reset();
  const name = document.getElementById("input-name").value;
  const initialDeposit = parseInt(document.getElementById("initial-deposit").value);
  if (isNaN(initialDeposit) || initialDeposit <= 0) {
    showError("Please enter a valid initial deposit.");
    return;
  }

  myAccount = new BankAccount(name, initialDeposit);
  registeredAccounts.addAccount(myAccount);

  toggleVisibility("changeBalancePage");
  toggleVisibility("register");
  toggleVisibility("log-out");
}

function handleChangeBalance(e) {
  e.preventDefault();
  if (myAccount) {
    const deposit = parseInt(document.getElementById("deposit").value);
    const withdraw = parseInt(document.getElementById("withdraw").value);

    if (!isNaN(deposit) && deposit > 0) {
      myAccount.depositMoney(deposit);
    } else if (!isNaN(withdraw) && withdraw > 0) {
      myAccount.withdrawMoney(withdraw);
    } else {
      showError("Please enter a valid withdrawal or deposit.");
    }
  } else {
    showError("Please create an account before trying to deposit.");
  }
}

function logOut() {
  toggleVisibility("register");
  toggleVisibility("changeBalancePage");
  toggleVisibility("log-out");
}
function depositSuccess(deposit, balance) {
  document.querySelector("input#deposit").value = null;
  updateResult("Your deposit of $" + deposit + " was successful!", balance);
}
function withdrawSuccess(withdraw, balance) {
  document.querySelector("input#withdraw").value = null;
  updateResult("Your withdrawal of $" + withdraw + " was successful!", balance);
}
function showError(message) {
  alert(message);
}
function reset() {
  updateResult(null, null);
}
function updateResult(message, balance) {
  document.querySelector("#result").innerHTML = message;
  document.querySelector("#current-balance").innerHTML = balance;
}

function toggleVisibility(elementId) {
  document.querySelector(`#${elementId}`).classList.toggle("hidden");
}

function depositDisplay() {
  const depositDisplay = document.querySelector("div#depositDisplay");
  const withdrawDisplay = document.querySelector("div#withdrawDisplay");

  if (depositDisplay.classList.contains("hidden") && withdrawDisplay.classList.contains("hidden")) {
    depositDisplay.classList.remove("hidden");
  } else if (depositDisplay.classList.contains("hidden") && !withdrawDisplay.classList.contains("hidden")) {
    depositDisplay.classList.remove("hidden");
    withdrawDisplay.classList.add("hidden");
  } else {
    depositDisplay.classList.add("hidden");
    withdrawDisplay.classList.add("hidden");
  }
}

function withdrawDisplay() {
  const depositDisplay = document.querySelector("div#depositDisplay");
  const withdrawDisplay = document.querySelector("div#withdrawDisplay");

  if (depositDisplay.classList.contains("hidden") && withdrawDisplay.classList.contains("hidden")) {
    withdrawDisplay.classList.remove("hidden");
  }  else if (withdrawDisplay.classList.contains("hidden") && !depositDisplay.classList.contains("hidden")) {
    withdrawDisplay.classList.remove("hidden");
    depositDisplay.classList.add("hidden");
  } else {
    depositDisplay.classList.add("hidden");
    withdrawDisplay.classList.add("hidden");
  }
}