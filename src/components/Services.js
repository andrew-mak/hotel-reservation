import React, { useState } from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

const Services = () => {
  const [services] = useState([
    {
      icon: <FaCocktail />,
      title: 'Free cocktails',
      info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, est!'
    },
    {
      icon: <FaHiking />,
      title: 'Endless Hiking',
      info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, est!'
    },
    {
      icon: <FaShuttleVan />,
      title: 'Free ShuttleVan',
      info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, est!'
    },
    {
      icon: <FaBeer />,
      title: 'Strongest Beer',
      info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, est!'
    },
  ])
  return (
    <section className='services'>
      <Title title='Service 1' />
      <div className='services-center'>
        {services.map((item, index) => {
          return <article key={index} className='service'>
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{ item.info}</p>
          </article>
        })}
      </div>
    </section>

  )
}

export default Services;