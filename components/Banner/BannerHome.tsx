"use client"

import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function BannerHome() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="container">
      <Carousel className="embla" ref={emblaRef}  opts={{
        align: "start",
        loop: true,
      }}>
        <CarouselContent>
          <CarouselItem>
            <Image
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
              alt="Slide 1"
              width={1800}
              height={833}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
              alt="Slide 1"
              width={1800}
              height={833}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m7cz5sotwrhimxkpqt1800x833%20-%20teasing.jpg"
              alt="Slide 1"
              layout="responsive"
              width={1800}
              height={833}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default BannerHome
