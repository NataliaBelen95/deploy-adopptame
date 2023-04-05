import React from 'react';
import Slider from 'react-slick';
import './Opinion.css'

interface Opinion {
  _id: string;
  user: string;
  opinion: string;
  rating: string; 
}

interface OpinionCarouselProps {
  opinions: Opinion[] ;
}

const OpinionCarousel = ({ opinions }: OpinionCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {opinions.map((opinion) => (
        <div className='opiniones' key={opinion._id}>
          <h3>{opinion.user}</h3>
          <p>{opinion.opinion}</p>
        </div>
      ))}
    </Slider>
  );
};

export default OpinionCarousel;