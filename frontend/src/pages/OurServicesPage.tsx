import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { ArrowDown } from "lucide-react";

import service1Img from "../assets/images/service-1.png";
import service2Img from "../assets/images/service-2.png";
import service3Img from "../assets/images/service-3.png";
import { ServiceCard } from "../sections/OurServices";

const services = [
    {
        id: "01",
        title: "Crop Management Guidance",
        description: {
            text: "Our experts provide detailed, crop-specific guidance covering the entire crop cycle—from seed selection to harvest. This includes:",
            points: [
                "Recommendations on the most suitable crop varieties based on soil and climatic conditions.",
                "Best practices for sowing, fertilization, and irrigation management.",
                "Pest and disease control strategies using eco-friendly and effective methods.",
                "Seasonal crop rotation advice to maintain soil health and increase productivity.",
            ],
        },
        image: service1Img, // Replace with actual image
    },
    {
        id: "02",
        title: "Soil and Water Health Analysis",
        description: {
            text: "Healthy soil is the foundation of successful farming. Our consultation centre offers:",
            points: [
                "Professional soil and water sampling and testing services.",
                "Analysis of nutrient levels, pH balance, and organic matter content, etc.",
                "Customized recommendations on fertilizers, manure, and soil conditioning to restore and maintain soil health.",
                "Monitoring and follow-up services to track improvements and ensure long-term results.",
            ],
        },
        image: service2Img,
    },
    {
        id: "03",
        title: "Weather-Based Advisory",
        description: {
            text: "Climate variability is one of the biggest challenges in agriculture. Our weather-based advisory services help farmers adapt to changing weather conditions through:",
            points: [
                "Real-time weather monitoring and alerts.",
                "Recommendations on irrigation, fertilization, and pest control based on weather patterns.",
                "Strategies to protect crops from adverse weather events like unseasonal rains, droughts, and high winds.",
            ],
        },
        image: service3Img,
    },
    {
        id: "04",
        title: "Market Insights and Pricing Support",
        description: {
            text: "Our consultation centre helps farmers make informed decisions about when and where to sell their produce to maximize profits. We provide:",
            points: [
                "Market trend analysis and future price predictions.",
                "Access to real-time market data on commodity prices.",
                "Guidance on setting the right selling price to ensure profitability.",
                "Support in identifying and connecting with reliable buyers and market channels.",
            ],
        },
        image: service3Img,
    },
    {
        id: "05",
        title: "Pest and Disease Management",
        description: {
            text: "Effective pest and disease control is critical for safeguarding crop health and yield. Our experts provide:",
            points: [
                "Identification of pests and diseases through field inspections and lab testing.",
                "Recommendations for integrated pest management (IPM) using biological and chemical solutions.",
                "Training on early identification and preventive measures.",
                "Supply of approved pesticides and crop protection products.",
            ],
        },
        image: service3Img,
    },
    {
        id: "06",
        title: "Training and Workshops",
        description: {
            text: "We believe in empowering farmers with knowledge. Our consultation centre conducts:",
            points: [
                "Regular workshops on modern farming techniques and precision agriculture.",
                "Training sessions on using advanced farm equipment and tools.",
                "Educational programs on sustainable and organic farming practices.",
                "Group discussion forums where farmers can share experiences and insights.",
            ],
        },
        image: service3Img,
    },
    {
        id: "07",
        title: "Financial and Insurance Support",
        description: {
            text: "Understanding financial challenges faced by farmers, we offer guidance on:",
            points: [
                "Accessing government subsidies and financial aid programs.",
                "Applying for crop insurance to safeguard against unexpected losses.",
                "Financial planning and credit solutions for investing in farm improvements.",
            ],
        },
        image: service3Img,
    },
];

const OurServicesPage = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="font-inter">
            <section
                className="relative w-full min-h-screen bg-no-repeat bg-cover flex flex-col overflow-hidden transition-all duration-500"
            >
                <div
                    className="absolute inset-0 "
                    style={{
                        // backgroundImage: `url(${aboutProductsImg})`,
                        backgroundPosition: isDesktop ? "center -2rem" : "center top",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        zIndex: 0,
                    }}
                ></div>
                {/* <div className="absolute inset-0 bg-black/50"></div> */}
                <Navbar />

                <div className="w-full absolute top-24 md:top-32 flex flex-col gap-2 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] ">
                    <h1 className="text-[5.5vw] sm:text-3xl font-medium tracking-wide rounded-full">
                        Agriculture Consultation Centre.
                    </h1>
                    <h1 className="text-[4.5vw] sm:text-2xl tracking-wide rounded-full">
                        Transforming Farming Through Expert Guidance.
                    </h1>
                </div>

                <div className="max-w-5xl absolute bottom-8 right-0 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] flex flex-col-reverse md:flex-row items-start gap-4">
                    <a href="#services">
                        <button className="text-lg sm:text-xl p-4 rounded-full border border-[#292929] flex items-center justify-center leading-none">
                            <ArrowDown />
                        </button>
                    </a>
                    <p className="sm:text-xl ">
                        The Kakud Agri Agriculture Consultation Centre is a one-stop solution for farmers seeking
                        professional advice and technical support to improve their farming practices and increase their yield.
                        Our consultation centre brings together a team of experienced agronomists, soil scientists, crop
                        protection specialists, and market analysts to provide farmers with customized solutions tailored to
                        their specific needs.
                    </p>
                </div>
            </section>

            <div
                id="services"
                className="py-20 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]"
            >
                <h3 className="font-playfair italic text-[2.25rem] sm:pb-10 text-center">Key Services Offered</h3>
                <div>
                    <div className="pt-[2rem] flex flex-col gap-20 sm:gap-24">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 p-6 py-20 bg-green-50 text-center rounded-xl shadow-md">
                <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-2">
                    Need Help with Your Farm?
                </h3>
                <p className="text-gray-700 text-base sm:text-lg mb-4">
                    Get expert guidance tailored to your crops, soil, and climate. Our agronomists are here to help you grow better.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base sm:text-lg transition-all">
                    Request Agri Consultancy from Agri Experts
                </button>
            </div>

        </div>
    )
}

export default OurServicesPage