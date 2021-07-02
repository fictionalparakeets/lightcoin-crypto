class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  /*
  // suggestion from mentor. doesn't work:
  get balance() {
    let balance = 0;
    balance = this.transactions.reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
    return balance;
  }
  */
  // suggestion from mentor. does work:
  get balance() {
    if (!this.transactions.length) {
      return 0;
    }
    return this.transactions.reduce((total, transaction) => total + transaction.value, 0);
  }
  /*
  // My original. Doesn't work. Difference is .amount vs .value in the reduce method.
  get balance() {
    let balance = 0;
    this.transactions.forEach((entry) => balance += entry.amount);
    // balance = this.transactions.reduce((a, x) => a + x.amount, 0);
    return balance;
  }
  */

  printBalance() {
    console.log(
      `The current balance of ${this.username}'s account is $${this.balance}`
    );
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log(`!!! Transaction not completed. You have no money. !!!`);
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

// MAKE SURE THIS NUMBER IS A NEGATIVE
class Withdrawal extends Transaction {
  get value() {
    // let amnt = 0;
    // amt -= this.amount;
    return -this.amount;
  }
  isAllowed() {
    let allowed = (this.account.balance - this.amount >= 0);
    // let allowed = (this.account.balance > this.amount) ? true : false;
    console.log('allowed inside Withdrawal: ', allowed);
    return allowed;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('NicoCat');
console.log('---------------------------------------------------------');

t1 = new Deposit(200, myAccount);
t1.commit();
// console.log('Transaction 1:', t1);
console.log('---------------------------------------------------------');

t2 = new Deposit(50.25, myAccount);
t2.commit();
// console.log('Transaction 2:', t2);
console.log('---------------------------------------------------------');

t3 = new Withdrawal(50.25, myAccount);
t3.commit();
// console.log('Transaction 3:', t3);
console.log('---------------------------------------------------------');

// console.log('myAccount.balance check: ', myAccount.balance);
myAccount.printBalance();
console.log('---------------------------------------------------------');
