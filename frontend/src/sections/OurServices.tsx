import { Link } from "react-router-dom";

const OurServices = () => {
    return (
        <div id="services" className="w-full py-[2rem] sm:py-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter">
            <h2 className="font-playfair italic text-[2.25rem] text-center">Our Services</h2>

            <div className="flex flex-col  pt-[2rem]">
                <h3 className="text-2xl sm:text-3xl  mb-2">
                    Agriculture Consultation Centre
                </h3>
                <h3 className="text-lg sm:text-2xl  mb-6 font-light">
                    Transforming Farming Through Expert Guidance
                </h3>

                <p className="text-base sm:text-xl font-light  mb-4">
                    The Kakud Agri Agriculture Consultation Centre is a one-stop solution for farmers seeking
                    professional advice and technical support to improve their farming practices and increase their yield.
                    Our consultation centre brings together a team of experienced agronomists, soil scientists, crop
                    protection specialists, and market analysts to provide farmers with customized solutions tailored to
                    their specific needs.
                </p>
                <Link to={"/services"}>
                    <button className="text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border border-[#353535] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg">
                        More
                    </button>
                </Link>
            </div>

            {/* <div className="pt-[2rem] flex flex-col gap-20 sm:gap-24">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div> */}
        </div>
    );
};

export const ServiceCard = ({
    id,
    title,
    description,
    image,
}: {
    id: any;
    title: any;
    description: { text: string; points: string[] };
    image: any;
}) => (
    <div className="w-full flex flex-col-reverse gap-y-6 lg:grid lg:grid-cols-[1.5fr_1fr] gap-x-4">
        <div className="flex flex-col justify-between gap-6">
            <div className="space-y-1 sm:space-y-0">
                <h4 className="text-lg sm:text-xl text-[#505050]">{id}</h4>
                <h2 className="text-2xl leading-normal sm:text-[2rem] sm:leading-[2.5rem] xl:text-[2rem] uppercase">
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
        </div>
        <div className="xs:w-[22rem] m-auto lg:mx-0 rounded-2xl overflow-hidden justify-self-end">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center"
            />
        </div>
    </div>
);


export default OurServices;
