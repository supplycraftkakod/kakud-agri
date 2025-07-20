import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import empIcon from "../assets/icons/emp.png"
import earthIcon from "../assets/icons/earth.png"
import farmerIcon from "../assets/icons/farmer.png"
import officeIcon from "../assets/icons/office.png"

type Opening = {
    role: string;
    location: string;
    department: string;
};

const openings: Opening[] = [
    {
        role: "Field Sales Executive",
        location: "Bellary, Raichur, Haveri",
        department: "Sales & Distribution",
    },
    {
        role: "Agronomy Advisor",
        location: "Davangere, Koppal, Bagalkot",
        department: "Agronomy Services",
    },
    {
        role: "Franchise Support Manager",
        location: "Hubballi HQ",
        department: "Operations",
    },
    {
        role: "Warehouse Supervisor",
        location: "Dharwad",
        department: "Logistics",
    },
    {
        role: "Rural Marketing Intern",
        location: "Remote (Karnataka Villages)",
        department: "Marketing",
    },
];

const CareersPage = () => {
    return (
        <div>
            <div className="pb-16 md:pb-24">
                <Navbar />
            </div>
            <div className="mx-auto px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] py-12 font-inter">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Careers at KAKUD Agri</h1>
                <p className="text-center sm:text-lg mb-8">
                    <span className="text-green-700 font-semibold">Build Your Career While Growing Rural India</span>
                </p>

                <section className="mb-12">
                    <p className="sm:text-lg">
                        At <strong>KAKUD Agri</strong>, we’re building one of the most trusted rural agriculture networks by delivering
                        high-quality agri inputs and expert crop advisory services to farmers. Whether you're in sales, operations, or agronomy —
                        every role at Kakud creates measurable impact on the ground.
                    </p>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
                    <div className="bg-white border rounded-xl p-6 shadow">
                        <div className="mb-10">
                            <img src={empIcon} alt="employees" className="w-[50%] sm:w-[70%] mx-auto" />
                        </div>
                        <p className="text-xl font-bold">20+</p>
                        <p>Employees</p>
                    </div>
                    <div className="bg-white border rounded-xl p-6 shadow">
                        <div className="mb-4">
                            <img src={farmerIcon} alt="farmerIcon" className="w-[50%] sm:w-[70%] mx-auto" />
                        </div>
                        <p className="text-xl font-bold">10,000+</p>
                        <p>Farmers Served</p>
                    </div>
                    <div className="bg-white border rounded-xl p-6 shadow">
                        <div className="mb-4">
                            <img src={officeIcon} alt="officeIcon" className="w-[50%] sm:w-[70%] mx-auto" />
                        </div>
                        <p className="text-xl font-bold">20</p>
                        <p>Franchise Outlets</p>
                    </div>
                    <div className="bg-white border rounded-xl p-6 shadow">
                        <div className="mb-4">
                            <img src={earthIcon} alt="earthIcon" className="w-[50%] sm:w-[70%] mx-auto" />
                        </div>
                        <p className="text-xl font-bold">1 State, 1 Country</p>
                        <p>Presence</p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Life at KAKUD Agri</h2>
                    <p className="mb-4">
                        KAKUD is not just a workplace — it’s a purpose-driven ecosystem. Every team member directly contributes to transforming
                        rural agriculture and improving farmer livelihoods.
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Work with grassroots farmers and channel partners</li>
                        <li>Learn on the field and grow in a fast-paced rural startup</li>
                        <li>Transparent performance tracking and career progression</li>
                        <li>Collaborative, people-first culture rooted in impact</li>
                    </ul>
                    <blockquote className="italic text-green-800 mt-6 border-l-4 border-green-400 pl-4">
                        “At Kakud Agri, I don’t just work—I grow with the farmers I serve.”
                        <br />
                        <span className="block font-semibold mt-2">— Suresh Patil, Field Executive</span>
                    </blockquote>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Current Openings</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm text-sm">
                            <thead className="bg-green-100 text-left">
                                <tr>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Location</th>
                                    <th className="p-3">Department</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {openings.map((opening, index) => (
                                    <tr key={index} className="border-t border-gray-200">
                                        <td className="p-3">{opening.role}</td>
                                        <td className="p-3">{opening.location}</td>
                                        <td className="p-3">{opening.department}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4">
                        Can’t find your role? Share your CV at{" "}
                        <a href="mailto:careers@kakudagri.com" className="text-green-700 font-medium underline">
                            careers@kakudagri.com
                        </a>
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
                    <ol className="list-decimal ml-6 space-y-2">
                        <li>Choose a role from the list above</li>
                        <li>Click “Apply Now” or email your resume to careers@kakudagri.com</li>
                        <li>Our HR team will contact shortlisted candidates within 3–5 working days</li>
                    </ol>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default CareersPage;
