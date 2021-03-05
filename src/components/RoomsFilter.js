import React, { useContext } from 'react';
import { RoomsContext } from '../context';
import Title from './Title';

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
};

const RoomsFilter = ({ rooms }) => {
  const context = useContext(RoomsContext);
  const { type, capacity, price, pets, breakfast, minPrice, maxPrice, minSize, maxSize } = context.filterState;
  const { filterChangedHandler } = context;

  const roomTypes = getUnique(rooms, 'type');
  roomTypes.unshift('all');
  const roomTypesOptions = roomTypes.map((type, index) => <option key={index} value={type} >{type}</option>);
  const capacityTypes = getUnique(rooms, 'capacity');
  const capacityTypesOptions = capacityTypes.map((type, index) => <option key={index} value={type} >{type}</option>);

  return (
    <section className="filter-container" >
      <Title title="search-rooms" />
      <form className="filter-form">

        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={filterChangedHandler}>
            {roomTypesOptions}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={filterChangedHandler}>
            {capacityTypesOptions}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Room price $ <b>{price}</b></label>
          <input
            type="range"
            id="price"
            name="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={filterChangedHandler}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="size">Room size</label>
          <div className="size-inputs" >
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={filterChangedHandler}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={filterChangedHandler}
              className="size-input"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={filterChangedHandler} />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={filterChangedHandler} />
            <label htmlFor="pets">Pets</label>
          </div>
        </div>

      </form>
    </section >
  )
}

export default RoomsFilter;