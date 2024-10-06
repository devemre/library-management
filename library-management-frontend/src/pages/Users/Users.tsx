import { useEffect, useState } from 'react';
import User from '../../types/User';
import axiosInstance from '../../config/axiosConfig';
import Card from '../../components/Card';
import { Button } from '../../components';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axiosInstance.get('/users').then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className='p-4 bg-slate-500 flex flex-col gap-4 rounded-md'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-bold text-white'>Users</h1>
      </div>
      <Button name='Add User' />
      <div className='grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4'>
        {users.map((user) => (
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
