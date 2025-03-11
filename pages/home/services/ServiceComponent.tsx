import Image from "next/image"
import Link from "next/link"

function ServiceComponent() {
  return (
    <div className="flex justify-between  gap-4">
      <div className="flex-1 flex">
        <Link href="#" className="flex-1">
          <Image
            className="w-full"
            alt={""}
            src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/Artboard%201%20copy%202.png"
            width={364}
            height={453}
          />
        </Link>
      </div>

      <div className="flex-1">
        <Link href="#">
          <Image
            className="w-full"
            alt={""}
            src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/Artboard%201.png"
            width={364}
            height={453}
          />
        </Link>
      </div>

      <div className="flex-1">
        <Link href="#">
          <Image
            className="w-full"
            alt={""}
            src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/Artboard%201%20copy.png"
            width={364}
            height={453}
          />
        </Link>
      </div>
    </div>
  )
}

export default ServiceComponent
