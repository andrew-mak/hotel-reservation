import React, { useContext } from 'react';
import { RoomsContext } from '../context';
import Room from './Room';
import Title from './Title';
import Loading from './Loading';

const FeaturedRooms = () => {
  const { roomsState } = useContext(RoomsContext);
  const { featuredRooms, loading, error } = roomsState;

  let rooms = null;
  if (featuredRooms) {
    rooms = featuredRooms.map(room => {
      return <Room key={room.id} room={room} />
    })
  }

  return (
    <section className="featured-rooms">
      <Title title="Fetured rooms" />
      <div className="featured-rooms-center" >
        {
          error ? <div className="error"><h4>Sorry, an error occurred when loading data. Please, try again.</h4></div>
            : loading ? <Loading />
              : rooms ? rooms : null
        }
      </div>
    </section>
  )
}

export default FeaturedRooms;