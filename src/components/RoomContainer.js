import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { withRoomConsumer } from '../context';
import Loading from './Loading';

const RoomContainer = ({ context }) => {
  const { loading, error, sortedRooms, rooms } = context.roomsState;
  return (
    error ? <div className="error" ><h4>Sorry, an error occurred when loading data. Please, try again.</h4></div>
      : loading ? <Loading />
        : <>
          <RoomsFilter rooms={rooms} />
          <RoomsList rooms={sortedRooms} />
        </>
  )
}

export default withRoomConsumer(RoomContainer);