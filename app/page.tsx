import BigBanner from "@/pages/home/big-banner/BigBanner"
import CollectionsHighLight from "@/pages/home/collections-highlight/CollectionsHighLight"
import ServiceComponent from "@/pages/home/services/ServiceComponent"
import TabComponent from "@/pages/home/tabs/TabComponent"

import BannerHome from "@/components/Banner/BannerHome"
import Footer01Page from "@/components/footer-01/footer-01"
import Navbar02Page from "@/components/navbar-02/navbar-02"

export default function Home() {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar02Page />

      <div className="container mx-auto mt-8">
        {/* <SlickSliderComponent /> */}
        <BannerHome />
      </div>

      <div className="container mx-auto mt-8">
        {/* Năm mới sắm đồ mới! */}
        <TabComponent />
      </div>

      <div className="container  mx-auto mt-8">
        <ServiceComponent />
      </div>

      <div className="container mx-auto mt-8">
        {/*Bộ sưu tập nổi bật */}
        <CollectionsHighLight />
      </div>

      <div className="container mx-auto mt-8">
        <BigBanner />
      </div>

      <Footer01Page />
    </div>
  )
}
