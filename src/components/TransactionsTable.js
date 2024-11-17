import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/transactions`, {
        params: { month: selectedMonth, search, page },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, search, page]);

  return (
    <div>
      <h2>Transactions Table</h2>
      <input
      className='input-box'
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table-container">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={page === 1} onClick={() => setPage(page - 1)} className='btn'>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;
