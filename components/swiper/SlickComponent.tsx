"use client"

import Image from "next/image"
import Slider from "react-slick"

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

export default function SlickSliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div>
      <Slider {...settings}>
        <div className="p-4 bg-gray-200 rounded-lg text-center">
          <Image
            src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
            alt="Slide 1"
            layout="responsive"
            width={1800}
            height={833}
          />
        </div>
        <div className="p-4 bg-gray-200 rounded-lg text-center">
          <Image
            src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
            alt="Slide 2"
            layout="responsive"
            width={1800}
            height={833}
          />
        </div>
        <div className="p-4 bg-gray-200 rounded-lg text-center">
          <Image
            src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
            alt="Slide 3"
            width={1800}
            height={833}
          />
        </div>
        <div className="p-4 bg-gray-200 rounded-lg text-center">
          <Image
            src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
            alt="Slide 4"
            layout="responsive"
            width={1800}
            height={833}
          />
        </div>
        <div className="p-4 bg-gray-200 rounded-lg text-center">
          <Image
            src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
            alt="Slide 5"
            layout="responsive"
            width={1800}
            height={833}
          />
        </div>
      </Slider>
    </div>
  )
}
