"use client"

import Image from "next/image"
import Link from "next/link"

import { TProduct } from "../pages/home/tabs/TabComponent"

type TCardProps = {
  product: TProduct
  selectedImages: Record<string, string>
  onChangeColor: (imageUrl: string, id: number) => void
}

function Card({ product, selectedImages, onChangeColor }: TCardProps) {
  return (
    <div>
      <div className="w-full">
        <Link href="#" key={product.id} className="flex-1 hover:cursor-pointer">
          <Image
            src={
              selectedImages[product.id] || product.modifiedImages[0]?.imageUrl
            }
            alt={product.name}
            width={364}
            height={453}
          />
        </Link>
      </div>
      <div>
        <Link href="#">
          <h3 className="font-bold text-lg">{product.name}</h3>
        </Link>
        <p className="text-gray-600">{product.price} VND</p>
        <div className="flex gap-2 mt-4">
          {/* Render các màu sắc */}
          {product.modifiedImages.map((img) => (
            <button
              key={img.colorHex}
              onClick={() => {
                console.log({
                  imageUrl: img.imageUrl,
                  id: product.id,
                })

                onChangeColor(img.imageUrl, product.id)
              }}
              style={{ backgroundColor: img.colorHex }}
              className="w-8 h-8 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
