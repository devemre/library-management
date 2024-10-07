import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import Button from '../Button';
import User from '../../types/User';
import { store } from '../../store';
import { setBookLended, setModalType } from '../../store/slices/modalSlice';

const Modal = () => {
  const [users, setUsers] = useState<User | any>([]);

  useEffect(() => {
    axiosInstance.get('/users').then((res) => {
      setUsers(res.data);
    });
  }, []);

  const lendBook = (bookId: number, userId: number) => {
    axiosInstance.post(`/users/${userId}/borrow/${bookId}`).then((res) => {
      store.dispatch(setBookLended(true));
      store.dispatch(setModalType(''));
    });
  };

  return (
    <div className='absolute top-0 left-0 bg-opacity-50 w-full h-full bg-slate-700 flex justify-center items-center'>
      <div className='bg-red-100 w-[80%] h-[80%] rounded-md p-4 flex flex-col gap-2'>
        <div className='flex justify-end'>
          <div>
            <Button
              name='X'
              onClick={() => {
                store.dispatch(setModalType(''));
              }}
            />
          </div>
        </div>
        {users.map((user: User) => (
          <div className='flex justify-between' key={user.id}>
            <p>{user.name}</p>
            <div>
              <Button
                name='Lend Book'
                onClick={() => {
                  lendBook(store.getState().modal.bookId, user.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
