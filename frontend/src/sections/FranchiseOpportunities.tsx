import franchiseOptions from "../assets/images/franchise-option.png";
import joinKakud from "../assets/images/join-kakud.png";
import growWithUs from "../assets/images/grow-with-us.png";
import { KakudAdvantageCard } from "./WhyKakud";

const whyItems = [
    {
        title: "Franchise Options",
        description:
            "Discover the two franchise models available at Kakud. Choose between our exclusive retail franchise model or our non-exclusive retail franchise model.",
        image: franchiseOptions,
    },
    {
        title: "Join Kakud",
        description:
            "Be a part of Kakud's success story by exploring our franchise opportunities. Select the model that suits your business goals and aspirations.",
        image: joinKakud,
    },
    {
        title: "Grow With Us",
        description:
            "Partner with Kakud and grow your business through our franchise options. Take the next step towards a successful and rewarding partnership.",
        image: growWithUs,
    },
];

const FranchiseOpportunities = () => {
    return (
        <div className="w-full pb-[5rem] sm:pb-[7rem] py-[2rem] sm:py-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter">
            <div className="pb-12">
                <h2 className="text-[2rem] sm:text-[2.5rem]">Franchise Opportunities</h2>
                <h3 className="text-[#1E1E1E] text-lg sm:text-xl sm:leading-[1.8rem]">
                    Explore our franchise opportunities at Kakud. Join us and become a part of our exclusive retail franchise model or opt for our non-exclusive retail franchise model.
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


export default FranchiseOpportunities;
