export type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  tokenName: string;
  deleted: boolean | false;
};

export type Task = {
  description: string;
  done: boolean;
};

export type State = {
  transactions: {
    [key: string]: Transaction;
  };
  tasks: Task[];
  user: null | string;
};

export type UserCredential = {
  email: string;
  password: string;
}
