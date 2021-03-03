import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RoomsContext } from '../context';
import Hero from '../components/Hero';
import Banner from '../components/Banner';

const SingleRoom = () => {

  const [roomState, setRoomState] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const { getRoom } = useContext(RoomsContext);
  const { slug } = useParams();

  useEffect(() => {
    const response = getRoom(slug);
    if (response.error) setErrorState(response.error)
    else if (response.name) {
      setRoomState({ ...response });
      setErrorState(null);
    };
  }, [slug, getRoom, setRoomState]);

  console.log('Render Single room');
  console.log('state: ', roomState);

  return (
    <Hero hero="roomsHero">
      {errorState &&
        <div className="error">
          <h3>no such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">back to rooms</Link>
        </div>
      }
      {roomState &&
        <Banner title={`${roomState.name} room`}>
          <Link to='/rooms' className='btn-primary'>back to rooms</Link>
        </Banner>
      }
    </Hero>
  )
}

export default SingleRoom;