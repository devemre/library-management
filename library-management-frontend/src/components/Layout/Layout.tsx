import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-slate-700 p-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
