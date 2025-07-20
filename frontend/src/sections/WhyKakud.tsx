import expertConsultation from "../assets/images/expert-consultation.png";

const whyItems = [
    {
        title: "Direct-from-Factory Advantage",
        description:
            "Farmers get access to high-quality and innovative products directly from our manufacturing units—ensuring better pricing, fresh inventory, and trusted quality.",
        image: expertConsultation,
    },
    {
        title: "High-Quality Products",
        description:
            "All our products are sourced from trusted manufacturers and tested for performance, ensuring reliable results and enhanced crop productivity.",
        image: expertConsultation,
    },
    {
        title: "Expert Consultation",
        description:
            "Our in-house team of agronomists and agricultural specialists provides personalized guidance to farmers for better decision-making and improved yields.",
        image: expertConsultation,
    },
    {
        title: "Strong Franchise Network",
        description:
            "With a robust network of exclusive and non-exclusive retail stores, we ensure wide accessibility and consistent supply across regions.",
        image: expertConsultation,
    },
    {
        title: "Customer-Centric Approach",
        description:
            "We believe in building relationships, not just sales. Our team delivers personalized solutions and prompt support tailored to each farmer’s needs.",
        image: expertConsultation,
    },
    {
        title: "Innovative Agricultural Solutions",
        description:
            "We promote modern farming practices and technology-driven approaches that make agriculture more sustainable, profitable, and future-ready.",
        image: expertConsultation,
    },
];


const WhyKakud = () => {
    return (
        <div className="w-full py-[2rem] sm:py-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter">
            <div className="pb-12 flex flex-col gap-4">
                <h2 className="text-3xl sm:text-[2.5rem]">Why Choose Kakud Agri?</h2>
                <h3 className="text-[#1E1E1E] sm:text-lg sm:leading-[1.5rem] font-light">
                    At Kakud Agri, we are committed to transforming agriculture by delivering value, trust, and
                    innovation to every farmer we serve. Here’s why thousands of farmers and agri-entrepreneurs
                    choose us:
                </h3>
            </div>

            <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="w-full xs:w-[20rem] sm:w-full object-cover object-center bg-no-repeat h-[10.75rem] rounded-xl mx-auto"
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center top",
            }}
        ></div>
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl">{title}</h3>
            <p className="font-light">{description}</p>
        </div>
    </div>
);

export default WhyKakud;
