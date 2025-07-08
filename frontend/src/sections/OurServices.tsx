import { Link } from "react-router-dom";
import service1Img from "../assets/images/service-1.png";
import service2Img from "../assets/images/service-2.png";
import service3Img from "../assets/images/service-3.png";

const services = [
    {
        id: "01",
        title: "AGRICULTURAL INPUT PRODUCTS",
        description:
            "We offer a comprehensive range of high-quality agricultural input products, including seeds, fertilizers, pesticides, herbicides, farm equipment, and growth enhancers. Our exclusive and non-exclusive retail franchise stores ensure that farmers can easily access these products at competitive prices while receiving expert advice on their application and usage.",
        buttonText: "Explore Products",
        image: service1Img,
    },
    {
        id: "02",
        title: "EXPERT CONSULTATION",
        description:
            "Our Agriculture Consultation Centre is a one-stop solution for farmers seeking professional advice and technical support to improve their farming practices and increase their yield. Our team of experienced agronomists, soil scientists, crop protection specialists, and market analysts provide farmers with customized solutions tailored to their specific needs.",
        buttonText: "Get Consultation",
        image: service2Img,
    },
    {
        id: "03",
        title: "TECHNOLOGY-DRIVEN SOLUTIONS",
        description:
            "We integrate innovative technology to develop perception-enabled solutions that enhance farming efficiency and productivity, ensuring sustainable growth for farmers.",
        buttonText: "Learn More",
        image: service3Img,
    },
];

const OurServices = () => {
    return (
        <div className="w-full py-[2rem] sm:py-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter">
            <h2 className="font-playfair italic text-[2.25rem] text-center">Our Services</h2>

            <div className="pt-[2rem] flex flex-col gap-16">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </div>
    );
};

const ServiceCard = ({ id, title, description, buttonText, image }: { id: any, title: any, description: any, buttonText: any, image: any }) => (
    <div className="w-full flex flex-col-reverse gap-y-6 lg:grid lg:grid-cols-2 gap-x-4">
        <div className="flex flex-col justify-start gap-6">
            <div className="space-y-1 sm:space-y-0">
                <h4 className="text-xl sm:text-2xl text-[#505050]">{id}</h4>
                <h2 className="text-2xl leading-normal sm:text-[2rem] sm:leading-[2.5rem] xl:text-[2rem] uppercase">{title}</h2>
            </div>
            <div className="flex flex-col gap-5">
                <p className="text-xl leading-[2rem] xl:text-2xl xl:leading-[2.2rem] font-light">
                    {description}
                </p>
                {
                    buttonText === "Explore Products" ? (
                        <Link to="/products">
                            <button className="w-fit text-xl sm:text-2xl px-6 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border lg:border-[#474747] flex items-center justify-center leading-none">
                                {buttonText}
                            </button>
                        </Link>
                    ) : (
                        <button className="w-fit text-xl sm:text-2xl px-6 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border lg:border-[#474747] flex items-center justify-center leading-none">
                            {buttonText}
                        </button>
                    )
                }
            </div>
        </div>
        <div className="w-[95%] xs:w-[24rem] xs:h-[24rem] xl:w-[27.5rem] xl:h-[27.5rem] m-auto lg:mx-0 rounded-2xl overflow-hidden justify-self-end">
            <img src={image} alt={title} className="w-full h-full object-cover object-center" />
        </div>
    </div>
);

export default OurServices;
