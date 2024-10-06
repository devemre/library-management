import { useEffect, useState } from 'react';
import User from '../../types/User';
import axiosInstance from '../../config/axiosConfig';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axiosInstance.get('/users').then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className='p-4'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4'>
        {users.map((user) => (
          <div
            className='shadow-sm rounded-md p-2 flex flex-col gap-1 bg-slate-100 hover:bg-slate-200 transition-all'
            key={user.id}
            title={user.name}
            role='alert'
          >
            <p className=''>{user.name}</p>
            <hr className='border-slate-700' />
            <Link
              to={`/users/${user.id}`}
              className='rounded-md flex items-center justify-center p-1 bg-slate-700 text-white active:bg-slate-600 transition-all'
            >
              <p className=''>Details</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
