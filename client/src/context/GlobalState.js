import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import  axios from 'axios';


// Initial state
const initialSate = {
    transactions: [],
    error: null,
    loading: true
    
}

export const GlobalContext = createContext(initialSate);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialSate);

async function getTransactions() {
    try {
        const res = await axios.get('https://mern-expense-tracker-puce.vercel.app');

        dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res
        });
    } catch (err) {
        dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err
        });
    }
}

async function deleteTransaction(id) {
    try {
      await axios.delete(`https://mern-expense-tracker-puce.vercel.app/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('https://mern-expense-tracker-puce.vercel.app', transaction, config);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err
      });
    }
  }

    return (<GlobalContext.Provider value={{
        transactions:state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
        </GlobalContext.Provider>);
}
