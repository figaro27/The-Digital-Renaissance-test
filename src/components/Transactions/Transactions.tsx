import React, { FC, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, actions, useDispatch } from '../../store';
import useQuery from '../../hooks/useQuery';
import useAPI from '../../hooks/useAPI';

import './Transactions.scss';

const Transactions: FC = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const transactions = useSelector((state) => state.transactions)
  const { getTransactions, deleteTransaction } = useAPI();
  const dispatch = useDispatch();
  const { query, setQuery } = useQuery();
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (!query.completed) return;
    toast(`You have got the transactions`, { type: 'success' });
  }, [query]);

  useEffect(() => {
    if (!user) history.push("/");
  }, [user]);

  useEffect(() => {
    setPage(0)
  }, [])

  useEffect(() => {
    getTransactions(page).then((transactions) => {
      if (page === 0) dispatch(actions.set({ transactions }));
      else dispatch(actions.addTransactions({ transactions }));
    });
  }, [page, dispatch, getTransactions]);

  const removeTxn = (id: string) => {
    deleteTransaction(id).then((res) => {
      if (res?.deleted) {
        dispatch(actions.updateTransaction(res))
      }
    })
  }

  return (
    <main className="transactions">
      <h1>Transactions</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>id</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Token</th>
            <th>TokenName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(transactions).map((transaction, idx) =>
            !transaction.deleted && <tr key={idx}>
              <td>{transaction.id}</td>
              <td>{transaction.from}</td>
              <td>{transaction.to}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.token}</td>
              <td>{transaction.tokenName}</td>
              <td onClick={() => removeTxn(transaction.id)} className="delete">Delete</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setPage(page + 1)}>
        More
      </Button>
    </main>
  );
};

export default Transactions;
