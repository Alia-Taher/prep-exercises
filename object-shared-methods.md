### Object Shared Methods

```` javascript

const eurosFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
});

function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }

  if (this._dayTotalWithdrawals + amount > this._dailyAllowance){
    console.log(`Insufficient remaining daily allowance!`)
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount;
  return amount;
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
}

function reportBalance() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
}

function getName() {
  return this._name;
}

function setDailyAllowance(newAllowance){
  this._dailyAllowance = newAllowance;
  console.log(
    `Daily allowance set to: ${eurosFormatter.format(newAllowance)}`
  );
}
function resetDailyAllowance(){
  this._dayTotalWithdrawals = 0;
}

function createWallet(name, cash = 0, dailyAllowance = 40, dayTotalWithdrawals = 0 ) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: dailyAllowance,
    _dayTotalWithdrawals: dayTotalWithdrawals,
    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
    setDailyAllowance,
    resetDailyAllowance,
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);
  
  walletJack.setDailyAllowance(80);
  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();

 ````