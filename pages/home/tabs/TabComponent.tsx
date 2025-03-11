"use client"

import { useEffect, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Card from "../../../components/Card"
import { Button } from "../../../components/ui/button"

export default function TabComponent() {
  const [productList, setProductList] = useState<TProduct[]>([])
  const [selectedImages, setSelectedImages] = useState<{
    [key: number]: string
  }>({})

  // Hàm thay đổi ảnh khi chọn màu
  const handleColorChange = (imageUrl: string, productId: number) => {
    console.log("Selected image:", imageUrl)
    console.log("Product ID:", productId)

    setSelectedImages((prevState) => ({
      ...prevState,
      [productId]: imageUrl,
    }))
  }

  useEffect(() => {
    const mockProductList: TProduct[] = [
      {
        id: 1,
        name: "Áo Thun Nam Cổ Tròn",
        description: "Áo thun cổ tròn thoải mái, phù hợp với mọi dịp.",
        price: 250000,
        modifiedImages: [
          {
            colorName: "Đỏ",
            colorHex: "#FF0000",
            imageUrl:
              "https://res.cloudinary.com/djvgheijr/image/upload/v1740759263/name/1740759262241.webp",
          },
          {
            colorName: "Xanh Dương",
            colorHex: "#0000FF",
            imageUrl:
              "https://res.cloudinary.com/djvgheijr/image/upload/v1740759295/name/1740759294627.webp",
          },
          {
            colorName: "Trắng",
            colorHex: "#FFFFFF",
            imageUrl:
              "https://res.cloudinary.com/djvgheijr/image/upload/v1740759314/name/1740759313037.webp",
          },
        ],
      },
      {
        id: 2,
        name: "Áo Polo Xuân",
        description: "Áo polo thiết kế tinh tế, chất liệu thoáng mát.",
        price: 350000,
        modifiedImages: [
          {
            colorName: "Đỏ",
            colorHex: "#FF0000",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yodySMN7220-DEN%20CVN7175-BEE%20(9).jpg",
          },
          {
            colorName: "Xanh Dương",
            colorHex: "#0000FF",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yody-SMN7220-NAU%20CVN7180-DEN%20(9).jpg",
          },
          {
            colorName: "Trắng",
            colorHex: "#FFFFFF",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yody-thoi-trang-SMN7220-HOG.jpg",
          },
        ],
      },
      {
        id: 3,
        name: "Áo Khoác Mùa Đông",
        description:
          "Áo khoác ấm áp, thiết kế đẹp mắt, phù hợp cho mùa đông lạnh.",
        price: 550000,
        modifiedImages: [
          {
            colorName: "Đỏ",
            colorHex: "#FF0000",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yodySMN7220-DEN%20CVN7175-BEE%20(9).jpg",
          },
          {
            colorName: "Xanh Dương",
            colorHex: "#0000FF",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yody-SMN7220-NAU%20CVN7180-DEN%20(9).jpg",
          },
          {
            colorName: "Trắng",
            colorHex: "#FFFFFF",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yody-thoi-trang-SMN7220-HOG.jpg",
          },
        ],
      },
      {
        id: 4,
        name: "Quần Jeans Nữ",
        description: "Quần jeans nữ, vừa vặn và thoải mái cho mọi hoạt động.",
        price: 450000,
        modifiedImages: [
          {
            colorName: "Đỏ",
            colorHex: "#FF0000",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yodySMN7220-DEN%20CVN7175-BEE%20(9).jpg",
          },
          {
            colorName: "Xanh Dương",
            colorHex: "#0000FF",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yody-SMN7220-NAU%20CVN7180-DEN%20(9).jpg",
          },
          {
            colorName: "Trắng",
            colorHex: "#FFFFFF",
            imageUrl:
              "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-so-mi-nu-yody-thoi-trang-SMN7220-HOG.jpg",
          },
        ],
      },
    ]

    setProductList(mockProductList)
  }, [])

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center z-10 mb-6 items-center">
        <h2 className="font-bold text-2xl">Năm mới sắm đồ mới!</h2>
      </div>
      <div className="flex justify-center mt-4 w-full flex-col z-10">
        <Tabs defaultValue="new-product" className="w-full">
          <TabsList className="flex  scrollbar-hidden md:flex-row gap-4 items-center py-8">
            <TabsTrigger
              value="new-product"
              className="px-8 py-2 rounded-full font-bold border border-gray-300 text-gray-600 data-[state=active]:bg-[#fcaf17] data-[state=active]:border-[#fcaf17] data-[state=active]:text-white hover:border-[#fcaf17] hover:bg-[#fcaf17] hover:text-white scroll-snap-x"
            >
              Hàng mới lên kệ
            </TabsTrigger>
            <TabsTrigger
              value="tshirt-polo"
              className="px-8 py-2 rounded-full font-bold border border-gray-300 text-gray-600 data-[state=active]:bg-[#fcaf17] data-[state=active]:border-[#fcaf17] data-[state=active]:text-white hover:border-[#fcaf17] hover:bg-[#fcaf17] hover:text-white scroll-snap-x"
            >
              Áo Polo du xuân
            </TabsTrigger>
            <TabsTrigger
              value="office-wear-for-girl"
              className="px-8 py-2 rounded-full font-bold border border-gray-300 text-gray-600 data-[state=active]:bg-[#fcaf17] data-[state=active]:border-[#fcaf17] data-[state=active]:text-white hover:border-[#fcaf17] hover:bg-[#fcaf17] hover:text-white scroll-snap-x"
            >
              Đồ công sở cho nàng
            </TabsTrigger>
          </TabsList>

          {/* Content */}
          <TabsContent
            value="new-product"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {productList.map((product) => (
              <div key={product.id} className="flex-1">
                <Card
                  product={product}
                  selectedImages={selectedImages}
                  onChangeColor={handleColorChange}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent
            value="tshirt-polo"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {productList.map((product) => (
              <div key={product.id} className="flex-1">
                <Card
                  product={product}
                  selectedImages={selectedImages}
                  onChangeColor={handleColorChange}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent
            value="office-wear-for-girl"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {productList.map((product) => (
              <div key={product.id} className="flex-1">
                <Card
                  product={product}
                  selectedImages={selectedImages}
                  onChangeColor={handleColorChange}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-8">
          <Button className="h-12 w-[380px] hover:bg-[#fcaf17] hover:font-bold hover:text-white flex items-center justify-center text-base">
            Xem Thêm
          </Button>
        </div>
      </div>
    </div>
  )
}

type modifiedImage = {
  colorName: string
  colorHex: string
  imageUrl: string
}

export type TProduct = {
  id: number
  name: string
  description: string
  price: number
  modifiedImages: modifiedImage[]
}
