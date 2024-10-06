import Book from './Book';
import UserBooks from './UserBooks';

type User = {
  id: number;
  name: string;
  books?: UserBooks;
};

export default User;
