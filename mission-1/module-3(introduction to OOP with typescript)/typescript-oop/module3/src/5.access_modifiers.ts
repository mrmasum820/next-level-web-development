{
  // access modifiers
  class BankAccount {
    readonly id: number;
    public name: string;
    protected _balance: number;

    constructor(id: number, name: string, balance: number) {
      this.id = id;
      this.name = name;
      this._balance = balance;
    }

    public depositBalance(amount: number) {
      return (this._balance = this._balance + amount);
    }

    public getBalance() {
      return this._balance;
    }
  }

  const poorPerson = new BankAccount(101, "MR X", 100);
  // poorPerson.id = 102;
  //   poorPerson.balance = 0;
  poorPerson.depositBalance(50);
  const balance = poorPerson.getBalance();
  //   console.log(balance);

  class StudentAccount extends BankAccount {
    test() {
      this._balance;
    }
  }

  //
}
