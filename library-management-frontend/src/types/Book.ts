import User from './User';

type Book = {
  id: number;
  name: string;
  userScore?: number;
  score?: number;
  author?: string;
  year?: number;
  currentOwner?: User;
};

export default Book;
