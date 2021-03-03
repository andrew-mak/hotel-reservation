import React, { createContext, useState, useEffect } from 'react';
import items from './data';

const RoomsContext = createContext();

const RoomsProvider = ({ children }) => {
  const [roomsState, setRoomsState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: false
  });

  useEffect(() => {
    if (!roomsState.loading) {
      const rooms = formatData(items);
      const featuredRooms = rooms.filter(room => room.featured === true);
      setRoomsState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false
      });
    }
  }, [roomsState.loading]);

  const formatData = items => {
    const tempItems = items.map(item => {
      const id = item.sys.id;
      const images = item.fields.images.map(image => image.fields.file.url)
      const room = { ...item.fields, images, id };
      return room
    });
    return tempItems
  }

  const getRoom = slug => {
    const tempRooms = [...roomsState.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    if (!room) return { error: new Error(`No such room: ${slug}`) }
    else return room
  }


  return (
    <RoomsContext.Provider value={{ roomsState, setRoomsState, getRoom }}>
      {children}
    </RoomsContext.Provider>
  )
};
const RoomsConsumer = RoomsContext.Consumer;

export { RoomsProvider, RoomsConsumer, RoomsContext };