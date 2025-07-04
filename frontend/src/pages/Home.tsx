import Footer from "../components/Footer"
import Hero from "../components/Hero"
import FranchiseOpportunities from "../sections/FranchiseOpportunities"
import KakudAgriMission from "../sections/KakudAgriMission"
import KeyServices from "../sections/KeyServices"
import OurMission from "../sections/OurMission"
import OurServices from "../sections/OurServices"
import Testimonials from "../sections/Testimonials"
import WhyKakud from "../sections/WhyKakud"

const Home = () => {
    return (
        <div>
            <Hero />
            <OurMission />
            <OurServices />
            <KakudAgriMission />
            <KeyServices />
            <WhyKakud />
            <Testimonials />
            <FranchiseOpportunities />
            <Footer />
        </div>
    )
}

export default Home