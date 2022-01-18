import { TrackHTMLAttributes, useCallback } from 'react';
import { toast } from 'react-toastify';

import { Task, UserCredential, Transaction } from '../types';

const useAPI = () => {
  const getTasks = useCallback(async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return [];
  }, []);

  const authenticate = useCallback(async (userCredential: UserCredential): Promise<any> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userCredential)
      });
      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });
        return;
      }
      return await response.json();
    } catch (e) {
      console.log(e);
      toast(`API request failed`, { type: 'error' });
    }
  }, []);

  const getTransactions = useCallback(async (page: number): Promise<{[key: string]: Transaction}> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions?page=${page}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });
        return {};
      }

      return await response.json();
    } catch (e) {
      console.log(e);
      toast(`API request failed`, { type: 'error' });
      return {};
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string): Promise<{id: string, deleted: boolean} | null> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/delete/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });
        return null;
      }

      return await response.json();
    } catch (e) {
      console.log(e);
      toast(`API request failed`, { type: 'error' });
      return null;
    }
  }, []);

  return {
    getTasks,
    authenticate,
    getTransactions,
    deleteTransaction
  };
};

export default useAPI;
