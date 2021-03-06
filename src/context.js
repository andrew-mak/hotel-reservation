import React, { createContext, useState, useEffect } from 'react';
import client from './contentful';

const RoomsContext = createContext();

const RoomsProvider = ({ children }) => {
  const [roomsState, setRoomsState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    error: false
  });
  const [filterState, setFilterState] = useState({
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  });


  useEffect(() => {

    client.getEntries({
      content_type: 'newHotel',
      order: "fields.price"
    })
      .then(response => {

        const rooms = formatData(response.items);
        const featuredRooms = rooms.filter(room => room.featured === true);
        const maxPrice = Math.max(...rooms.map(item => item.price));
        const maxSize = Math.max(...rooms.map(item => item.size));

        setRoomsState({
          rooms,
          featuredRooms,
          sortedRooms: rooms,
          loading: false,
          error: false
        });

        setFilterState(curState => ({
          ...curState,
          price: maxPrice,
          maxPrice,
          maxSize
        }))
      })
      .catch(error => {
        setRoomsState(curState => ({
          ...curState,
          error: true
        }))
        console.log(error);
      })

  }, []);

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
  };

  const filterChangedHandler = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    setFilterState({
      ...filterState,
      [name]: value
    });
  };

  useEffect(() => {
    const { type, minSize, maxSize, breakfast, pets } = filterState;

    let capacity = parseInt(filterState.capacity);
    let price = parseInt(filterState.price);

    // all the rooms before filter
    let tempRooms = [...roomsState.rooms];

    // filters
    if (type !== 'all') tempRooms = tempRooms.filter(room => room.type === type);

    if (capacity !== 1) tempRooms = tempRooms.filter(room => room.capacity >= capacity);

    tempRooms = tempRooms.filter(room => room.price <= price);

    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

    if (breakfast) tempRooms = tempRooms.filter(room => room.breakfast === true);

    if (pets) tempRooms = tempRooms.filter(room => room.pets === true);

    setRoomsState(curState => ({
      ...curState,
      sortedRooms: tempRooms
    }))
  }, [filterState, roomsState.rooms])

  return (
    <RoomsContext.Provider value={{ roomsState, filterState, getRoom, filterChangedHandler }}>
      {children}
    </RoomsContext.Provider>
  )
};
const RoomsConsumer = RoomsContext.Consumer;

function withRoomConsumer(Component) {
  return (props) => {
    return <RoomsConsumer>
      {value => <Component {...props} context={{ ...value }} />}
    </RoomsConsumer>
  }
}

export { withRoomConsumer, RoomsProvider, RoomsConsumer, RoomsContext };