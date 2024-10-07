import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Preloader from '../Preloader';
import { useSelector } from 'react-redux';
import Modal from '../Modal';

const Layout = () => {
  const loading = useSelector((state: any) => state.preloader.loading);
  const modalType = useSelector((state: any) => state.modal.type);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-slate-700 p-4'>
        <Outlet />
      </div>
      {loading && <Preloader />}
      {modalType !== '' && <Modal />}
    </div>
  );
};

export default Layout;
