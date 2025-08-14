import Navbar from "../components/Navbar"

import service1Big1Img from "../assets/images/service-1.png";
import service2Big1Img from "../assets/images/service-2.png";
import service3Big1Img from "../assets/images/service-3.png";
import { ServiceCard } from "../sections/OurServices";
import Footer from "../components/Footer";
import whatsAppIcon from "../assets/svg/whatsapp.svg"
import { Link as ScrollLink } from "react-scroll"


import service1Img from "../assets/icons/services/1.png"
import service2Img from "../assets/icons/services/2.png"
import service3Img from "../assets/icons/services/3.png"
import service4Img from "../assets/icons/services/4.png"
import service5Img from "../assets/icons/services/5.png"
import service6Img from "../assets/icons/services/6.png"
import service7Img from "../assets/icons/services/7.png"
import { ArrowDown } from "lucide-react";

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
        image: service1Big1Img,
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
        image: service2Big1Img,
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
        image: service3Big1Img,
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
        image: service3Big1Img,
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
        image: service3Big1Img,
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
        image: service3Big1Img,
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
        image: service3Big1Img,
    },
];

const heroServices = [
    {
        id: "01",
        title: "Crop Guidance",
        image: service1Img,
    },
    {
        id: "02",
        title: "Soil Analysis",
        image: service2Img,
    },
    {
        id: "03",
        title: "Weather Advisory",
        image: service3Img,
    },
    {
        id: "04",
        title: "Market Insights",
        image: service4Img,
    },
    {
        id: "05",
        title: "Pest Management",
        image: service5Img,
    },
    {
        id: "06",
        title: "Farmer Training",
        image: service6Img,
    },
    {
        id: "07",
        title: "Financial Support",
        image: service7Img,
    },
]

const OurServicesPage = () => {

    return (
        <div
            className="max-w-[100em] mx-auto font-geist bg-gradient-to-r from-[#f1ecf7] via-[#f5e6f2] to-[#fdf4ee]"
        >
            <div>
                <Navbar />

                <div className="w-full min-h-[30rem] pt-28 md:pt-8">
                    <div className="w-full flex flex-col items-center gap-6 px-7 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] text-center">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-4xl  text-[#449E08] pb-2 w-fit mx-auto font-semibold">
                                Agriculture Consultation Centre
                            </h1>
                            <p className="max-w-3xl md:pt-">
                                Kakud Agri Consultation Centre offers expert farming advice,
                                technical support, and tailored solutions to boost farmers’ productivity and yield.
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <a
                                href="https://wa.me/9019985136"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg sm:text-xl px-4 py-2 text-[#449E08] rounded-full border flex items-center justify-center leading-none bg-white/20 border-[#acacac] shadow-sm hover:bg-white/30 transition-all"
                            >
                                <img src={whatsAppIcon} alt="WhatsApp" className="w-6" />
                                <span className=" font-medium pl-3">0000 1111 22</span>
                            </a>
                            <ScrollLink
                                to="services"
                                smooth={true}
                                duration={500}
                            >
                                <button className="text-lg sm:text-xl p-3 rounded-full border border-[#acacac] flex items-center justify-center leading-none transition-all">
                                    <ArrowDown />
                                </button>
                            </ScrollLink>
                        </div>

                        <div className="max-w-3xl grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-1 pt-2">
                            {heroServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="w-full h-full py-3 px-3 rounded-lg border border-[#bebebe] bg-white/10 shadow-sm backdrop-blur-md flex flex-col justify-between"
                                >
                                    <h2 className="text-[14px] font-medium text-[#1d1d1d] pb-2">
                                        {service.id}. {service.title}
                                    </h2>
                                    <div className="flex justify-center">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-3/5 h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div
                id="services"
                className="py-20 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]"
            >
                {/* <h3 className="font-playfair italic text-[2.25rem] sm:pb-10 text-center">Key Services Offered</h3> */}
                <div>
                    <div className="pt-[2rem] flex flex-col gap-20 sm:gap-24">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </div>

            {/* <div className="mt-12 p-6 py-20 bg-green-50 text-center rounded-xl shadow-md">
                <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-2">
                    Need Help with Your Farm?
                </h3>
                <p className="text-gray-700 text-base sm:text-lg mb-4">
                    Get expert guidance tailored to your crops, soil, and climate. Our agronomists are here to help you grow better.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base sm:text-lg transition-all">
                    Request Agri Consultancy from Agri Experts
                </button>
            </div> */}

            <Footer
                heading="Need Help with Your Farm?"
                subHeading="Get expert guidance tailored to your crops, soil, and climate. Our agronomists are here to help you grow better."
            />

        </div>
    )
}

export default OurServicesPage