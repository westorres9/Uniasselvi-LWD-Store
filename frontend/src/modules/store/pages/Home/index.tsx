import { Outlet } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Newsletter from '../../components/Newsletter';

export default function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Newsletter />
      <Footer />
      <Copyright />
    </>
  );
}
