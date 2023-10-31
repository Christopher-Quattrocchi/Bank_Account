# Describe BankAccount ()

__Test #1:__ "It will create an account with the name & initial amount"
__Code:__ 
let user1 = new BankAccount("Bill", 5);
user1;
__Expected Output:__ Account {name: 'Bill', initialDeposit: 5}

__Test #2:__
__Code:__
let user1 = new BankAccount("Bill", 5);
user1.depositMoney(5);
user1;
__Expected Output:__ BankAccount {name: 'Bill', balance: 10}