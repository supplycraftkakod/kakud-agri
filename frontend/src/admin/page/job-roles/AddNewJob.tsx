import { useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../../config";
import toast from "react-hot-toast";

const AddNewJob = () => {
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!role || !location || !department) {
            toast.error("Please fill all fields.")
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${BE_URL}/api/v1/job-role/`, {
                role,
                location,
                department,
            });

            setRole("");
            setLocation("");
            setDepartment("");
            toast.success("Job role added successfully!")
        } catch (error) {
            toast.error("Something went wrong.")
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-full flex flex-col gap-4 sm:flex-row items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-center">Add New Job Role</h2>
            </div>
            <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <h4 className="ml-[2px] mb-1 text-gray-900">Role</h4>
                        <input
                            type="text"
                            placeholder="Field Sales Executive"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]"
                        />
                    </div>

                    <div>
                        <h4 className="ml-[2px] mb-1 text-gray-900">Location</h4>
                        <input
                            type="text"
                            placeholder="Bellary, Raichur, Haveri"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]"
                        />
                    </div>

                    <div>
                        <h4 className="ml-[2px] mb-1 text-gray-900">Department</h4>
                        <input
                            type="text"
                            placeholder="Sales & Distribution"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-4 text-center text-white rounded-lg bg-black cursor-pointer"
                    >
                        {loading ? "Adding..." : "Add Job"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddNewJob;
