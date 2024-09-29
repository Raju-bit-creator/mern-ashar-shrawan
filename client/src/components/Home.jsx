import React, { useEffect } from 'react'; // Import useEffect
import Banner from './Banner';
import Serviceitems from './Serviceitems';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]); // Include navigate in dependency array

  return (
    <div>
      <Banner />
      <Serviceitems />
    </div>
  );
};

export default Home;
