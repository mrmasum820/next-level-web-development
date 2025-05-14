{
  // encapsulation
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

    private getBalance() {
      return this._balance;
    }

    hiddenBalance() {
      return this.getBalance();
    }
  }

  const poorPerson = new BankAccount(101, "MR X", 100);
  poorPerson.depositBalance(50);
  console.log(poorPerson.hiddenBalance());

  class StudentAccount extends BankAccount {
    test() {
      this._balance;
    }
  }

  //
}
