import AboutUs from "../../Components/Home/AboutUs"
import Banner from "../../Components/Home/Banner"
import Brands from "../../Components/Home/Brands"
import FeatureSection from "../../Components/Home/FeatureSection"
import Sponsor from "../../Components/Sponsor"

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeatureSection/>
      <Brands></Brands>
      <AboutUs></AboutUs>
      <Sponsor></Sponsor>
    </div>
  )
}

export default Home