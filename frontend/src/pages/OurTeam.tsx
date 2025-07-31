import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ArrowUpRight, X } from "lucide-react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { fetchTeam } from "../redux/slices/team/teamSlice";

type Employee = {
    id: number;
    name: string;
    role: string;
    image: string;
    about: { id: number; content: string }[];
};

const OurTeam = () => {
    const dispatch = useAppDispatch();
    const { data: employees, loading, error } = useAppSelector((state) => state.team);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        dispatch(fetchTeam());
    }, [dispatch]);

    useEffect(() => {
        document.body.style.overflow = selectedEmployee ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedEmployee]);

    return (
        <div className="bg-[#FDFEE7]">
            <Navbar />

            <div className="w-full pb-6 sm:pb-8 pt-20 md:pt-36 px-[2rem] md:px-[7rem] lg:px-[3rem] xl:px-[6rem] font-inter">
                <h2 className="text-[1.5rem] sm:text-[2rem] text-center pb-10">Meet our team.</h2>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
                        {employees.map((emp: Employee) => (
                            <div key={emp.id} className="h-[448px] sm:h-[416px] px-1 pt-1 pb-2 rounded-lg bg-[#FFAEAD] relative">
                                <div className="h-[435px] sm:h-[402px] px-1 pt-1 pb-2 rounded-md bg-[#DEDAF3] relative">
                                    <div
                                        className="h-[350px] sm:h-[320px] px-1 pt-1 pb-2 rounded-t-md rounded-b-[2rem] bg-[#be9c7b] bg-cover relative"
                                        style={{
                                            backgroundImage: `url(${emp.image})`,
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div
                                            className="w-10 h-10 bg-white rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer"
                                            onClick={() => setSelectedEmployee(emp)}
                                        >
                                            <ArrowUpRight />
                                        </div>
                                    </div>

                                    <div className="w-full absolute bottom-4">
                                        <h2 className="text-center text-2xl text-[#820016] font-medium">{emp.name}</h2>
                                        <h3 className="text-center text-sm text-[#2F0008]">{emp.role}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Want to Join Us Section */}
            <div className="px-6 xs:px-[1rem] md:px-[3rem] lg:px-[6rem] py-16 bg-[#f8f2ed] mt-10 font-inter">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-medium text-[#820016] mb-4">Want to join us?</h2>
                    <p className="text-lg text-[#2F0008] mb-6">
                        We're always looking for talented, passionate individuals to join our growing team.
                        If you're driven by creativity, innovation, and a love for technology — let's build something meaningful together.
                    </p>

                    <Link
                        to={"/careers"}
                        className="inline-block bg-[#820016] hover:bg-[#9d1a24] text-white font-medium px-6 py-3 rounded-full transition duration-300"
                    >
                        See Job Openings
                    </Link>
                </div>
            </div>

            <Footer />

            {/* Modal */}
            {selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40">
                    <div className="bg-white w-full mx-6 xs:mx-[1rem] md:mx-[2rem] xl:mx-[6rem] mt-14 h-[90vh] overflow-y-auto rounded-xl shadow-xl">
                        <div className="flex justify-end pt-3 pr-3 pb-1 sticky top-0 bg-white z-10">
                            <button
                                className="text-black bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                                onClick={() => setSelectedEmployee(null)}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 p-6">
                            <div
                                className="mx-auto md:mx-0 w-[300px] xs:w-[350px] md:min-w-[250px] h-[400px] xs:h-[500px] md:max-h-[400px] px-1 pt-1 pb-2 rounded-xl bg-[#be9c7b] bg-cover relative"
                                style={{
                                    backgroundImage: `url(${selectedEmployee.image})`,
                                    backgroundPosition: "center",
                                }}
                            ></div>

                            <div>
                                <h2 className="text-center md:text-left text-2xl font-bold text-[#820016]">
                                    {selectedEmployee.name}
                                </h2>
                                <h3 className="text-center md:text-left text-sm text-[#2F0008] mb-4">
                                    {selectedEmployee.role}
                                </h3>

                                {selectedEmployee.about.map((item, idx) => (
                                    <p key={idx} className="lg:text-lg max-w-3xl pb-8">
                                        {item.content}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OurTeam;
