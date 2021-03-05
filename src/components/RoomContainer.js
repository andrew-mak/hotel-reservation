import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { RoomsConsumer } from '../context';
import Loading from './Loading';

const RoomContainer = () => {
  return (
    <RoomsConsumer>
      {value => {
        const { loading, sortedRooms, rooms } = value.roomsState;
        if (loading) return <Loading />
        return (
          <div>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
          </div>
        )
      }}
    </RoomsConsumer>
  )
}

export default RoomContainer;