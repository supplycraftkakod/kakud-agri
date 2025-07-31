import { useEffect, useState } from "react";
import { Plus, SquarePen, Trash2, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { fetchTeam } from "../../../redux/slices/team/teamSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { BE_URL } from "../../../../config";

type Employee = {
    id: number;
    name: string;
    role: string;
    image: string;
    about: { id: number; content: string }[];
};

const AllTeamMembers = () => {
    const dispatch = useAppDispatch();
    const { data: employees, loading, error } = useAppSelector((state: any) => state.team);

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [editData, setEditData] = useState<Employee | null>(null);
    const [newImage, setNewImage] = useState<File | null>(null);

    useEffect(() => {
        dispatch(fetchTeam());
    }, [dispatch]);

    useEffect(() => {
        document.body.style.overflow = selectedEmployee ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedEmployee]);

    const handleSave = async () => {
        if (!editData) return;

        const formData = new FormData();
        formData.append("name", editData.name);
        formData.append("role", editData.role);
        formData.append("about", JSON.stringify(editData.about.map((a) => a.content)));
        if (newImage) {
            formData.append("image", newImage);
        }

        const authStorage = localStorage.getItem("auth");
        let token: any;

        if (authStorage) {
            const authData = JSON.parse(authStorage);
            token = authData.token;
        }

        try {
            await toast.promise(
                () =>
                    axios.put(`${BE_URL}/api/v1/team/${editData.id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }) as unknown as Promise<any>,
                {
                    loading: "Updating team member...",
                    success: "Team member updated successfully!",
                    error: "Failed to update team member",
                }
            );

            setSelectedEmployee(null);
            setEditData(null);
            setNewImage(null);
            dispatch(fetchTeam());
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this member?");
        if (!confirmed) return;

        const token = JSON.parse(localStorage.getItem("auth") || "{}")?.token;

        try {
            await toast.promise(
                async () =>
                    await axios.delete(`${BE_URL}/api/v1/team/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                {
                    loading: "Deleting...",
                    success: "Deleted successfully!",
                    error: "Failed to delete. Try again.",
                }
            );
        } catch (error) { }
    };


    return (
        <div className="w-full font-inter">
            <h2 className="text-2xl text-center pb-10">All Team Members.</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 gap-y-6">
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
                                        onClick={() => handleDelete(emp.id)}

                                        className="w-10 h-10 bg-red-500 text-white rounded-full absolute bottom-2 left-2 flex items-center justify-center cursor-pointer"
                                    >
                                        <Trash2 />
                                    </div>
                                    <div
                                        className="w-10 h-10 bg-green-500 text-white rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer"
                                        onClick={() => {
                                            setSelectedEmployee(emp);
                                            setEditData({ ...emp });
                                            setNewImage(null);
                                        }}
                                    >
                                        <SquarePen />
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

            {/* Edit Modal */}

            {selectedEmployee && editData && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40">
                    <div className="bg-white w-full mx-6 xs:mx-[1rem] md:mx-[2rem] xl:mx-[6rem] mt-14 h-[90vh] overflow-y-auto rounded-xl shadow-xl">
                        <div className="flex justify-end pt-3 pr-3 pb-1 sticky top-0 bg-white z-10">
                            <button
                                className="text-black bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                                onClick={() => {
                                    setSelectedEmployee(null);
                                    setEditData(null);
                                    setNewImage(null);
                                }}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 p-6">
                            <div className="flex flex-col items-center gap-3">
                                <div
                                    className="w-[300px] xs:w-[350px] md:min-w-[250px] h-[400px] xs:h-[500px] md:max-h-[400px] px-1 pt-1 pb-2 rounded-xl bg-[#be9c7b] bg-cover relative"
                                    style={{
                                        backgroundImage: newImage
                                            ? `url(${URL.createObjectURL(newImage)})`
                                            : `url(${editData.image})`,
                                        backgroundPosition: "center",
                                    }}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                                    className="text-sm"
                                />
                            </div>

                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="w-full border p-2 rounded-lg mb-2"
                                    placeholder="Name"
                                />

                                <input
                                    type="text"
                                    value={editData.role}
                                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                                    className="w-full border p-2 rounded-lg mb-4"
                                    placeholder="Role"
                                />

                                {editData.about.map((line, idx) => (
                                    <div key={line.id || idx} className="flex gap-2 mb-4 items-start">
                                        <textarea
                                            value={line.content}
                                            onChange={(e) => {
                                                const updated = editData.about.map((item, i) =>
                                                    i === idx ? { ...item, content: e.target.value } : item
                                                );
                                                setEditData({ ...editData, about: updated });
                                            }}
                                            className="w-full border p-2 rounded-lg"
                                            rows={2}
                                            placeholder={`About Line ${idx + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = editData.about.filter((_, i) => i !== idx);
                                                setEditData({ ...editData, about: updated });
                                            }} className="bg-[#eb1f1f] w-fit p-2 rounded-full flex items-center justify-center text-white"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditData({
                                            ...editData,
                                            about: [...editData.about, { id: Date.now(), content: "" }],
                                        })
                                    }
                                    className="bg-gray-200 w-fit p-2 rounded-full "                                >
                                    <Plus />
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="w-full bg-black text-white py-2 mt-4 rounded-lg hover:bg-gray-800"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AllTeamMembers;
