import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { Button } from '../../components';
import Book from '../../types/Book';
import { store } from '../../store';
import { setBookId, setModalType } from '../../store/slices/modalSlice';
import { useSelector } from 'react-redux';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState<Book>();
  const bookLended = useSelector((state: any) => state.modal.bookLended);
  const modalType = useSelector((state: any) => state.modal.type);
  useEffect(() => {
    axiosInstance
      .get(
        `/books/${id}?includeAuthor=true&includeYear=true&includeCurrentOwner=true`
      )
      .then((res) => {
        setBookDetails(res.data);
      });
  }, [bookLended, modalType]);

  const openLendModal = () => {
    store.dispatch(setModalType('lendBook'));
    store.dispatch(setBookId(id ? parseInt(id) : -1));
  };

  return (
    <div className='p-4'>
      <div className='border rounded-md bg-slate-100 p-4 flex flex-col gap-2'>
        <div className='flex justify-between items-start'>
          <div>
            <p>Name</p>
            <p className='font-bold'>{bookDetails?.name}</p>
          </div>
          <div>
            <Button
              name='Back'
              onClick={() =>
                navigate('/books?includeAuthor=true&includeYear=true')
              }
            />
          </div>
        </div>
        <div>
          <p>Author</p>
          <p className='font-bold'>
            {bookDetails?.author ? bookDetails?.author : 'N/A'}
          </p>
        </div>
        <div>
          <p>Year</p>
          <p className='font-bold'>
            {bookDetails?.year ? bookDetails?.year : 'N/A'}
          </p>
        </div>
        <div>
          <p>Average Rating</p>
          <p className='font-bold'>
            {bookDetails?.score === -1 ? 'N/A' : bookDetails?.score}
          </p>
        </div>
        <hr />
        {bookDetails?.currentOwner ? (
          <div>
            <p>Current Owner</p>
            <p className='font-bold'>{bookDetails.currentOwner.name}</p>
          </div>
        ) : (
          <div>
            <p>Current Owner</p>
            <Button name='Lend Book' onClick={() => openLendModal()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
