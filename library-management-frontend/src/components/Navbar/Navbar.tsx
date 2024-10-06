import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='sticky top-0 flex justify-between bg-slate-900 text-white'>
      <div>
        <Link to='/' className='flex items-center p-4'>
          Library Management
        </Link>
      </div>
      <div className='flex'>
        <Link to='/books' className='flex items-center p-4'>
          Books
        </Link>
        <Link to='/users' className='flex items-center p-4'>
          Users
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
