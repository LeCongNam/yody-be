"use client"

import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function SwiperComponent() {
  return (
    <div className="container mx-auto mt-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="rounded-lg shadow-lg  h-[542px]"
        loop={true}
      >
        <SwiperSlide>
          <Image
            className="w-full h-full"
            src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
            alt="Slide 1"
            width={600}
            height={542}
            objectFit="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-full"
            src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7a9mcqu6hc6x6u6s9dg152%201800x833.png"
            alt="Slide 1"
            width={600}
            height={400}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-full"
            src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7a9mcqu6hc6x6u6s9dg152%201800x833.png"
            alt="Slide 1"
            width={600}
            height={400}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
