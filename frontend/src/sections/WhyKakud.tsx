import expertConsultation from "../assets/images/expert-consultation.png";
import franchiseNetwork from "../assets/images/franchise-network.png";
import customerCentricApproach from "../assets/images/customer-centric-approach.png";

const whyItems = [
    {
        title: "Expert Consultation",
        description:
            "Our team of agricultural specialists at Kakud Agri is dedicated to providing you with expert consultation to help you make informed decisions for your farm. We are here to support you every step of the way.",
        image: expertConsultation,
    },
    {
        title: "Franchise Network",
        description:
            "Kakud Agri boasts a strong franchise network with exclusive and non-exclusive stores, ensuring that our products and services reach a wide customer base. Partner with us to expand your business reach.",
        image: franchiseNetwork,
    },
    {
        title: "Customer-Centric Approach",
        description:
            "At Kakud Agri, we prioritize our customers by offering personalized solutions tailored to their specific needs. Experience our responsive service and let us help you achieve your agricultural goals.",
        image: customerCentricApproach,
    },
];

const WhyKakud = () => {
    return (
        <div className="w-full py-[2rem] sm:py-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter bg-purple-400">
            <div className="bg-green-300 pb-12">
                <h2 className="text-[2rem] sm:text-[2.5rem]">Why Choose Kakud Agri?</h2>
                <h3 className="text-[#1E1E1E] text-lg sm:text-xl sm:leading-[1.8rem] lg:text-2xl lg:leading-[2rem]">
                    Discover the exceptional services offered by Kakud Agri. From high-quality products sourced from trusted manufacturers to expert consultation provided by our agricultural specialists, we are committed to delivering top-notch solutions for all your agricultural goals.
                </h3>
            </div>

            <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-yellow-400">
                {whyItems.map((item, index) => (
                    <KakudAdvantageCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export const KakudAdvantageCard = ({ title, description, image }: { title: any, description: any, image: any }) => (
    <div className="w-full xs:w-[22rem] md:w-full mx-auto flex flex-col gap-6 border border-[#A69F9F] rounded-xl p-4">
        <div
            className="w-full xs:w-[20rem] sm:w-full object-cover object-center bg-no-repeat h-[10.75rem] rounded-xl mx-auto bg-green-400"
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center top",
            }}
        ></div>
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl">{title}</h3>
            <p>{description}</p>
        </div>
    </div>
);

export default WhyKakud;
