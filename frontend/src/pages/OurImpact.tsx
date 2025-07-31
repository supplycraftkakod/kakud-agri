// const impactData = [
//     { number: "120+", label: "Kakud Agri Outlets", image: outletsImg },
//     { number: "350+", label: "Villages Covered", image: villagesCoveredImg },
//     { number: "10,000+", label: "Farmers Served", image: farmersServedImg },
//     { number: "6,000+", label: "Kakud Memberships", image: membershipImg },
//     { number: "2,500+", label: "Soil & Water Tests Conducted", image: testsConductedImg },
//     { number: "3,200+", label: "Farmer Advisory Calls Received", image: advisoryCallsReceivedImg },
//     { number: "75+", label: "Employees", image: employeesImg },
//     { number: "15+", label: "Innovative Agri Products Launched", image: innovativeProductsImg },
//     { number: "3", label: "Patents Filed", image: patentImg },
//     { number: "40+", label: "Agri Training Programs Conducted", image: trainingProgramsImg },
//     { number: "6", label: "State Presence", image: statePresenceImg },
//     { number: "2", label: "Country Presence", image: countriesFPresenceImg },
// ];

import { useEffect } from "react";

import Navbar from "../components/Navbar";
import SectionHeading from "../components/SectionHeading";
import Footer from "../components/Footer";
import { fetchImpactData } from "../redux/slices/impact/impactSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

export default function OurImpact() {
    const dispatch = useAppDispatch();
    const { data: impactData, loading, error } = useAppSelector((state: any) => state.impact);

    useEffect(() => {
        dispatch(fetchImpactData());
    }, [dispatch]);

    return (
        <div className="bg-[#FDFEE7]">
            <Navbar />

            <div className="w-full pb-6 sm:pb-8 pt-20 md:pt-36 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter">
                <SectionHeading
                    heading="Our Impact So Far."
                    subHeading="Empowering rural India through innovation, sustainable agriculture, and farmer-first solutions."
                />

                {loading && <p className="text-center text-gray-600">Loading impact data...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 px-14 xs:px-0">
                    {impactData.map((item: any) => (
                        <div
                            key={item.id}
                            className="h-[240px] bg-cover rounded-[10px] p-3"
                            style={{
                                backgroundImage: `url(${item.imageUrl})`,
                                backgroundPosition: "center top",
                            }}
                        >
                            <h3 className="text-2xl font-medium text-center">{item.number}</h3>
                            <h4 className="text-center text-sm">{item.label}</h4>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
