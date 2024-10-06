import { useEffect, useState } from 'react';
import Book from '../../types/Book';
import axiosInstance from '../../config/axiosConfig';
import { Button, Card } from '../../components';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axiosInstance
      .get('/books?includeAuthor=true&includeYear=true')
      .then((res) => {
        setBooks(res.data);
      });
  }, []);

  return (
    <div className='p-4 bg-slate-500 flex flex-col gap-4 rounded-md'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-bold text-white'>Books</h1>
      </div>
      <Button name='Add Book' />
      <div className='grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4'>
        {books.map((book) => (
          <Card
            key={book.id}
            name={book.name}
            isBook
            author={book.author}
            year={book.year}
            detailsLink={`/books/${book.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;
