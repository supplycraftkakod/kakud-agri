const keyServicesData = [
    {
        id: "01",
        title: "Weather Advisory",
        description:
            "We provide expert guidance on crop management to optimize yields and quality. Our team offers personalized solutions tailored to your specific needs.",
    },
    {
        id: "02",
        title: "Financial Support",
        description:
            "Participate in our training workshops to enhance your skills and knowledge. We offer financial and insurance support to secure your investments.",
    },
    {
        id: "03",
        title: "Pest Management",
        description:
            "Stay informed with our market insights and pricing support services. We help you make informed decisions to maximize profitability.",
    },
    {
        id: "04",
        title: "Insurance Support",
        description:
            "Our experts specialize in pest and disease management to protect your crops. Get comprehensive insurance support for peace of mind.",
    },
];

const KeyServices = () => {
    return (
        <div className="w-full py-[2rem] sm:py-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter">
            <div className="pb-12 flex flex-col gap-2">
                <h2 className="text-3xl sm:text-[2.5rem]">Key Services</h2>
                <h3 className="text-2xl sm:text-[2rem] text-[#1E1E1E] leading-none">Crop Management</h3>
            </div>

            <div className="w-full space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyServicesData.map((service) => (
                    <KeyServiceCard
                        key={service.id}
                        id={service.id}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </div>
    );
};

const KeyServiceCard = ({ id, title, description }: { id: any, title: any, description: any }) => (
    <div className="bg-[#F2F2F2] p-4 rounded-xl flex flex-col gap-6">
        <div>
            <h5 className="text-[#505050]">{id}</h5>
            <h3 className="text-2xl">{title}</h3>
        </div>
        <p className="font-light">{description}</p>
    </div>
);

export default KeyServices;
