import Reveal from "../animation/Reveal"
import AllProduct from "../components/AllProduct"
import Feature from "../components/Feature"
import InfiniteCarousel from "../components/InfiniteCarousel"
import ProductOfTheYear from "../components/ProductOfTheYear"
import ProductSlider from "../components/ProductSlider"
import RemarkProducts from "../components/RemarkProducts"

const Home = () => {
  return (
    <div>
      <Reveal> <ProductSlider /></Reveal>
      <Reveal><InfiniteCarousel /></Reveal>
      <Reveal><RemarkProducts /></Reveal>
      <Reveal><ProductOfTheYear/></Reveal>
      <Reveal><AllProduct /></Reveal>
      <Reveal><Feature /></Reveal>
    </div>
  )
}

export default Home