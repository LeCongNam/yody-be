import Image from "next/image"
import Link from "next/link"

function BigBanner() {
  return (
    <div className="w-full">
      <Link href="#">
        <Image
          src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/1800x833-min.png"
          alt="YODY Polo"
          width={364}
          height={453}
          className="w-full"
        />
      </Link>
    </div>
  )
}

export default BigBanner
