import Footer from "../components/Footer"
import Hero from "../components/Hero"
import MoreAboutUs from "../sections/MoreAboutUs"
// import FranchiseOpportunities from "../sections/FranchiseOpportunities"
import OurProducts from "../sections/OurProducts"
// import KeyServices from "../sections/KeyServices"
// import OurServices from "../sections/OurServices"
import Testimonials from "../sections/Testimonials"
// import WhyKakud from "../sections/WhyKakud"

const Home = () => {
    return (
        <div>
            <Hero />
            {/* <OurServices /> */}
            <OurProducts />
            <MoreAboutUs />
            {/* <FranchiseOpportunities /> */}
            {/* <KeyServices /> */}
            {/* <WhyKakud /> */}
            <Testimonials />
            <Footer />
        </div>
    )
}

export default Home