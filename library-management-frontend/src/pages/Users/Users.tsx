import { useEffect, useState } from 'react';
import User from '../../types/User';
import axiosInstance from '../../config/axiosConfig';
import Card from '../../components/Card';
import { Button } from '../../components';
import { useSelector } from 'react-redux';
import { store } from '../../store';
import { setUsers } from '../../store/slices/usersSlice';

const Users = () => {
  const users = useSelector((state: any) => state.users.users);

  useEffect(() => {
    axiosInstance.get('/users').then((res) => {
      store.dispatch(setUsers(res.data));
    });
  }, []);

  return (
    <div className='p-4 bg-slate-500 flex flex-col gap-4 rounded-md'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-bold text-white'>Users</h1>
      </div>
      <Button name='Add User' />
      <div className='grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4'>
        {users &&
          users.map((user: User) => (
            <Card
              key={user.id}
              name={user.name}
              detailsLink={`/users/${user.id}`}
            />
          ))}
      </div>
    </div>
  );
};

export default Users;
