import { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../../config";
import { Trash2 } from "lucide-react";

type JobRole = {
    id: number;
    role: string;
    location: string;
    department: string;
};

const AllJobs = () => {
    const [openings, setOpenings] = useState<JobRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const fetchOpenings = async () => {
        try {
            const res = await axios.get<any>(`${BE_URL}/api/v1/job-role`);
            setOpenings(res.data);
        } catch (err) {
            console.error("Failed to fetch job roles", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOpenings();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            setDeletingId(id);
            await axios.delete<any>(`${BE_URL}/api/v1/job-role/${id}`);
            setOpenings(openings.filter((job) => job.id !== id));
        } catch (err) {
            console.error("Failed to delete job role", err);
            alert("Failed to delete.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            <div className="w-full flex flex-col gap-4 sm:flex-row items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-center">All Jobs</h2>
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg shadow-sm text-sm">
                        <thead className="bg-green-100 text-left">
                            <tr>
                                <th className="p-3">Sl</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Department</th>
                                <th className="p-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {openings.map((opening, index) => (
                                <tr key={opening.id} className="border-t border-gray-200">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{opening.role}</td>
                                    <td className="p-3">{opening.location}</td>
                                    <td className="p-3">{opening.department}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDelete(opening.id)}
                                            disabled={deletingId === opening.id}
                                            className="text-red-600 hover:underline disabled:opacity-50"
                                        >
                                            {deletingId === opening.id ? "Deleting..." : <Trash2 className="w-5 h-5" />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllJobs;
