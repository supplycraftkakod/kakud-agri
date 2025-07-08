import anolikImg from "../assets/images/AganImg.png"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Download } from "lucide-react";

const ProductDetails = () => {
    return (
        <div>
            <div className="pb-24 md:pb-36">
                <Navbar />
            </div>

            <div className="w-full px-6 pb-16 md:px-[3rem] lg:px-[4rem] font-inter">
                <div>
                    {/* Header */}
                    <div className="flex items-center md:items-start flex-col md:flex-row gap-8 mb-6">
                        {/* Product Image */}
                        <div className=" flex-shrink-0 w-full sm:w-[310px] lg:w-[345px] flex justify-center">
                            <img src={anolikImg} alt="Anolik Insecticide" className="" />
                        </div>

                        {/* Product Title and Description */}
                        <div className=" flex flex-col justify-between gap-2 lg:gap-8">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-xl text-[#505050] leading-none">Insecticide</h2>
                                    <h1 className="text-[2.25rem] font-medium leading-none text-purple-700">Anolik</h1>
                                </div>
                                <div className="p-4 bg-purple-700 rounded-full flex items-center justify-center cursor-pointer">
                                    <Download className="text-white" />
                                </div>
                            </div>
                            <p className="text-lg font-light mt-2">
                                Anolik offers broad-spectrum control against sucking pests, including aphids,
                                whiteflies, thrips, and other insects. Anolik is known for its dual mode of action,
                                providing contact, stomach, and systemic effects, which helps in early establishment and
                                healthy seedling development.
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-10">
                        <div className="lg:w-[70%]">
                            {/* About Section */}
                            <div className="mt-10">
                                <h3 className="text-2xl mb-3">About Anolik</h3>
                                <ul className="text-lg list-disc space-y-1 px-8 sm:px-10">
                                    <li>Anolik is a mixture of Neonicotinoid and Pyrethroid compound.</li>
                                    <li>Anolik has contact, stomach and systemic mode of action.</li>
                                    <li>
                                        Anolik is the best combination of two of the most reliable molecules for early-stage
                                        pest management with unique benefit of early establishment through green and healthy
                                        seedling.
                                    </li>
                                    <li>Anolik is a better product to replace Mono, Chloro etc.</li>
                                </ul>
                            </div>

                            {/* Benefits Section */}
                            <div className="mt-10">
                                <h3 className="text-2xl mb-3">Benefits</h3>
                                <ul className="text-lg list-disc space-y-1 px-8 sm:px-10">
                                    <li>Efficacy on pest is very good due to dual mode of action.</li>
                                    <li>It works on all the stages of insects.</li>
                                    <li>Due to its unique formulation ZC molecule distribution in the plants will be good.</li>
                                    <li>Long duration control will reduce multiple time application and cost as well.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Sidebar Details (placed below on mobile) */}
                        <div className="mt-10 space-y-4">
                            <p className="font-light">Last updated: Thursday, 22/05/2025 - 16:51</p>

                            <div className="bg-[#F0F0F0] p-3 rounded-lg">
                                <p className="text-[#505050] font-light leading-none pb-2">Active Ingredients</p>
                                <p className="text-xl ">Thiamethoxam 12.6% + Lambda-Cyhalothrin 9.5% ZC</p>
                            </div>

                            <div className="bg-[#F0F0F0] p-3 rounded-lg">
                                <p className="text-[#505050] font-light leading-none pb-2">Formulation Type</p>
                                <p className="text-xl ">Capsule Suspension (CS)/Suspension Concentrate (SC)</p>
                            </div>

                            <div className="bg-[#F0F0F0] p-4 rounded-lg">
                                <p className="text-[#505050] font-light leading-none pb-3">Crops</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Cotton', 'Groundnut', 'Saybean', 'Tomato', 'Chilli'].map((crop) => (
                                        <span
                                            key={crop}
                                            className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xl"
                                        >
                                            {crop}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
