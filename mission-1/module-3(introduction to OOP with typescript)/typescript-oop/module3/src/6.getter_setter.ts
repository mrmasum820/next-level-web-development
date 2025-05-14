{
  // getter and setter
  class BankAccount {
    readonly id: number;
    public name: string;
    protected _balance: number;

    constructor(id: number, name: string, balance: number) {
      this.id = id;
      this.name = name;
      this._balance = balance;
    }

    // public depositBalance(amount: number) {
    //   return (this._balance = this._balance + amount);
    // }
    set deposit(amount: number) {
      this._balance += amount;
    }

    // public getBalance() {
    //   return this._balance;
    // }
    get balance() {
      return this._balance;
    }
  }

  const poorPersonAccount = new BankAccount(101, "MR X", 100);
  //   poorPersonAccount.depositBalance(50);
  poorPersonAccount.deposit = 80;
  const balance = poorPersonAccount.balance;
  console.log(balance);

  //
}
