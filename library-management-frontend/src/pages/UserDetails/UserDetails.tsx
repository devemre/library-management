import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import User from '../../types/User';
import Button from '../../components/Button/Button';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState<User>();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/users/${id}?idIncluded=true`).then((res) => {
      setUserDetails(res.data);
      console.log(res.data);
    });
  }, [updated]);

  const returnBook = async (bookId: number, score: number) => {
    await axiosInstance
      .post(`/users/${id}/return/${bookId}`, {
        score: score,
      })
      .then((res) => {
        setUpdated(!updated);
      });
  };

  const [scores, setScores] = useState<{ [key: number]: number | '' }>({});
  const handleScoreChange = (bookId: number, value: string) => {
    setScores({
      ...scores,
      [bookId]: value ? parseInt(value) : '',
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    bookId: number
  ) => {
    event.preventDefault();

    const score = scores[bookId];
    if (!score) {
      return;
    }
    await returnBook(bookId, score);
  };

  return (
    <div className='p-4'>
      <div className='border rounded-md bg-slate-100 p-4 flex flex-col gap-2'>
        <div className='flex justify-between items-center gap-2'>
          <p className='font-bold'>{userDetails?.name}</p>
          <div>
            <Button name='Back' onClick={() => navigate('/users')} />
          </div>
        </div>
        <hr />
        <p className='font-bold'>Past</p>
        {userDetails?.books?.past?.length !== 0 ? (
          <div>
            <div className='grid grid-cols-2 py-2'>
              <p className=''>Book Name</p>
              <p className=''>Score</p>
            </div>
            <hr />
            {userDetails?.books?.past?.map((book) => (
              <div
                key={book.id + ' ' + book.userScore}
                className='grid grid-cols-2'
              >
                <p key={book.id} className=''>
                  {book.name}
                </p>
                <p key={book.id} className=''>
                  {book.userScore}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>The user had not borrowed any books in the past</div>
        )}
        <hr />
        <p className='font-bold'>Present</p>
        {userDetails?.books?.present?.length !== 0 ? (
          <div>
            <div className='grid grid-cols-2 py-2'>
              <p className=''>Book Name</p>
              <p className=''>Actions</p>
            </div>
            <hr />
            {userDetails?.books?.present?.map((book) => (
              <div
                key={book.id + ' ' + book.userScore}
                className='grid grid-cols-2'
              >
                <p key={book.id} className=''>
                  {book.name}
                </p>
                <form
                  className='flex justify-between'
                  onSubmit={(e) => handleSubmit(e, book.id)}
                >
                  <input
                    className='rounded-md bg-slate-500 text-white w-[45%] px-2'
                    type='number'
                    placeholder='User Score'
                    value={scores[book.id] || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleScoreChange(book.id, e.target.value)
                    }
                  />

                  <Button name='Return the Book' type='submit' />
                </form>
              </div>
            ))}
          </div>
        ) : (
          <div>The user has not borrowed any books at the moment</div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
