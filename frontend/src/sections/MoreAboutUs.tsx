import SectionHeading from "../components/SectionHeading"
import tempImg from "../assets/images/expert-consultation.png"
import { Link } from "react-router-dom";

const MoreAboutUs = () => {
    return (
        <div id="more-about-us" className="w-full py-[2rem] sm:py-[6rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter bg-[#FDFEE7]">
            <SectionHeading
                heading="More About Us."
                subHeading="Empowering Farmers, Building the Future."
            />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-2">
                <ServicesCard
                    title="Our Services."
                    description="The Kakud Agri Agriculture Consultation Centre is a one-stop solution for farmers seeking professional advice and technical support to improve their farming"
                    image={tempImg}
                    reff={"/services"}
                />
                <ServicesCard
                    title="Franchise Opportunities."
                    description="Explore our franchise opportunities at Kakud. Join us and become a part of our exclusive retail franchise model or opt for our non-exclusive retail franchise model."
                    image={tempImg}
                    reff={"/franchise-opportunities"}
                />
                <ServicesCard
                    title="Why Choose Kakud Agri?"
                    description="At Kakud Agri, we are committed to transforming agriculture by delivering value, trust, and innovation to every farmer we serve."
                    image={tempImg}
                    reff={"/why-choose-kakud"}
                />
            </div>
        </div>
    )
}

const ServicesCard = ({ title, description, image, reff }: { title: any, description: any, image: any, reff: any }) => (
    <div className="w-full md:w-full p-1 mx-auto flex flex-col gap-4 border border-gray-300 hover:border-gray-400 transition-all rounded-lg bg-white">
        <div
            className="w-full h-[13rem] xs:h-[15rem] sm:h-[14rem] rounded-md bg-no-repeat bg-cover bg-center bg-gray-200"
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center top",
            }}
        ></div>
        <div className="flex flex-col gap-2 px-4">
            <h3 className="text-lg md:text-[2vw] xl:text-2xl border-b border-gray-500 w-fit">{title}</h3>
            <p className="font-light line-clamp-3">{description}</p>
        </div>
        <Link to={reff}>
            <button className="w-full font-light py-2 text-center text-white bg-[#1b1b1b] rounded-full">
                Know more
            </button>
        </Link>
    </div>

);

export default MoreAboutUs