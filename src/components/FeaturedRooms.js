import React, { useContext } from 'react';
import { RoomsContext } from '../context';
import Room from './Room';
import Title from './Title';
import Loading from './Loading';

const FeaturedRooms = () => {
  const { roomsState } = useContext(RoomsContext);
  const { featuredRooms } = roomsState;

  let rooms;
  if (featuredRooms) {
    rooms = featuredRooms.map(room => {
      return <Room key={room.id} room={room} />
    })
  }

  return (
    <section className="featured-rooms">
      <Title title="Fetured rooms" />
      <div className="featured-rooms-center" >
        {rooms ? rooms : <Loading /> }
      </div>
    </section>
  )
}

export default FeaturedRooms;