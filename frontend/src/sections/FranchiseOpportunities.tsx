import imgSrc from "../assets/images/service-1.png"

export const franchiseItems = [
    {
        title: "01. Exclusive Retail Franchise Model",
        description: {
            text: "Become a part of Kakud Agri’s growth journey by owning an exclusive retail franchise. Our exclusive franchise model provides:",
            points: [
                "Priority access to the full Kakud Agri product portfolio",
                "Exclusive territory rights for sales and distribution",
                "Dedicated supply chain and logistics support",
                "On-site training and continuous operational guidance",
                "Custom franchise management software",
                "Complete business model setup with disciplined execution support",
                "Access to the Digital Farmers Community platform",
                "Direct collaboration with the Kakud Agri Consultation Centre",
            ],
        },
        footer: "Perfect for entrepreneurs who want to build a scalable and impactful agri-business with exclusive rights.",
        image: imgSrc,
    },
    {
        title: "02. Non-Exclusive Retail Franchise Model",
        description: {
            text: "Partner with Kakud Agri as a non-exclusive franchisee and benefit from:",
            points: [
                "Access to a wide range of Kakud Agri products",
                "Competitive pricing and profit-sharing model",
                "Marketing and branding support",
                "Flexible business model with growth potential",
            ],
        },
        footer: "Ideal for agri-retailers or dealers looking to expand their offerings and earn higher margins.",
        image: imgSrc,
    },
];

const FranchiseOpportunities = () => {
    return (
        <div
            id="franchise"
            className="w-full py-[2rem] sm:py-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter">
            <div className="pb-12 flex flex-col gap-4">
                <h2 className="text-3xl sm:text-[2.5rem]">Franchise Opportunities</h2>
                <h3 className="text-[#1E1E1E] sm:text-lg sm:leading-[1.5rem]">
                    Explore our franchise opportunities at Kakud. Join us and become a part of our exclusive retail franchise model or opt for our non-exclusive retail franchise model.
                </h3>
            </div>

            <div className="w-full space-y-24">
                {franchiseItems.map((item, index) => (
                    <FranchiseCard key={index} {...item} />
                ))}
            </div>

            <div className="pt-12">
                <h2 className="text-xl sm:text-2xl">Interested in Becoming a Franchise Partner?</h2>
                <p className="text-base sm:text-lg font-light pt-1">Apply Now to explore the right franchise model for you and be part of a mission to empower
                    farmers and build a sustainable future in agriculture.
                </p>
                <button className="mt-4 text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-black border-[#3d3d3d] flex items-center justify-center leading-none">
                    Apply
                </button>
            </div>
        </div>
    );
};

export const FranchiseCard = ({
    title,
    description,
    footer,
    image,
}: {
    title: any;
    description: { text: string; points: string[] };
    footer: string,
    image: any;
}) => (
    <div className="w-full flex flex-col-reverse gap-y-6 lg:grid lg:grid-cols-[1.5fr_1fr] gap-x-4">
        {/* Text Section */}
        <div className="flex flex-col gap-6 border-b pb-4 border-gray-400">
            <div className="space-y-1 sm:space-y-0">
                <h2 className="text-2xl leading-normal sm:leading-[3.5rem] sm:text-3xl font-medium text-[#1d1d1d]">
                    {title}
                </h2>
                <p className="text-base sm:text-lg font-light pt-2">{description.text}</p>
            </div>
            <div className="flex flex-col gap-5 font-light">
                <ul className="list-disc list-outside pl-4 space-y-1">
                    {description.points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="text-base sm:text-lg ">{footer}</p>
            </div>
        </div>

        {/* Image Section */}
        <div className="xs:w-[20rem] w-full self-start lg:mx-0 rounded-2xl overflow-hidden justify-self-end">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-top"
            />
        </div>
    </div>

);


export default FranchiseOpportunities;
