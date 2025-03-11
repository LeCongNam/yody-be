import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

function CollectionsHighLight() {
  return (
    <div>
      <h2>Bộ sưu tập nổi bật</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="#" className="card-collections">
          <div>
            <Image
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/1321-04-min.png"
              alt="YODY Polo"
              width={364}
              height={453}
            />
          </div>

          <div>
            <p>YODY Polo</p>
          </div>
          <div>
            Kết cấu vải mềm mịn, khô nhanh. Thông thoáng, thấm hút mồ hôi tốt
          </div>
          <div>
            <div>
              <Button>Chi tiết</Button>
            </div>
          </div>
        </Link>

        <Link href="#" className="card-collections">
          <div>
            <Image
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/1321-04-min.png"
              alt="YODY Polo"
              width={364}
              height={453}
            />
          </div>

          <div>
            <p>YODY Polo</p>
          </div>
          <div>
            Kết cấu vải mềm mịn, khô nhanh. Thông thoáng, thấm hút mồ hôi tốt
          </div>
          <div>
            <div>
              <Button>Chi tiết</Button>
            </div>
          </div>
        </Link>

        <Link href="#" className="card-collections">
          <div>
            <Image
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/1321-04-min.png"
              alt="YODY Polo"
              width={364}
              height={453}
            />
          </div>

          <div>
            <p>YODY Polo</p>
          </div>
          <div>
            Kết cấu vải mềm mịn, khô nhanh. Thông thoáng, thấm hút mồ hôi tốt
          </div>
          <div>
            <div>
              <Button>Chi tiết</Button>
            </div>
          </div>
        </Link>

        <Link href="#" className="card-collections">
          <div>
            <Image
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/1321-04-min.png"
              alt="YODY Polo"
              width={364}
              height={453}
            />
          </div>

          <div>
            <p>YODY Polo</p>
          </div>
          <div>
            Kết cấu vải mềm mịn, khô nhanh. Thông thoáng, thấm hút mồ hôi tốt
          </div>
          <div>
            <div>
              <Button>Chi tiết</Button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default CollectionsHighLight
