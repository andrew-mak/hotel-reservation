import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RoomsContext } from '../context';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';

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

  return (
    errorState
      ? <div className="error">
        < h3 > no such room could be found...</h3 >
        <Link to="/rooms" className="btn-primary">back to rooms</Link>
      </div >
      : roomState
        ? <>
          <StyledHero img={roomState.images[0]}>
            <Banner title={`${roomState.name} room`}>
              <Link to='/rooms' className='btn-primary'>back to rooms</Link>
            </Banner>
          </StyledHero>
          <section className="single-room" >
            <div className="single-room-images" >
              {roomState.images.map((item, index) => <img key={index} src={item} alt={roomState.name} />)}
            </div>
            <div className="single-room-info">
              <article className="desc">
                <h3>Details</h3>
                <p>{roomState.description}</p>
              </article>
              <article className="info">
                <h3>Info</h3>
                <h6>Price: $ {roomState.price}</h6>
                <h6>Size:  {roomState.size} SQFT</h6>
                <h6>Max capacity:  {roomState.capacity > 1 ? `${roomState.capacity} people` : `${roomState.capacity} person`}</h6>
                <h6>{roomState.pets ? null : "no "} pets allowed</h6>
                <h6>{roomState && "Free breakfast included"}</h6>
              </article>
            </div>
          </section>
          <section className="room-extras">
            <h6>extras</h6>
            <ul className="extras">
              {roomState.extras.map((item, index) =><li key={index} >{item}</li>)}
            </ul>
          </section>
        </>
        : null
  )
}

export default SingleRoom;