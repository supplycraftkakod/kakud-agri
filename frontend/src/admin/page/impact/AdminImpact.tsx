import { useEffect, useState } from "react";
import { fetchImpactData } from "../../../redux/slices/impact/impactSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { SquarePen, Trash2 } from "lucide-react";
import { BE_URL } from "../../../../config";
import axios from "axios";
import toast from "react-hot-toast";

const AdminImpact = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    console.log(imagePreview);

    const dispatch = useAppDispatch();
    const { data: impactData, loading, error } = useAppSelector((state: any) => state.impact);

    const [editId, setEditId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState({ number: "", label: "", imageFile: null as File | null });

    useEffect(() => {
        dispatch(fetchImpactData());
    }, [dispatch]);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this impact?");
        if (!confirmed) return;

        const token = JSON.parse(localStorage.getItem("auth") || "{}")?.token;

        try {
            await toast.promise(
                async () =>
                    await axios.delete(`${BE_URL}/api/v1/impact/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                {
                    loading: "Deleting impact...",
                    success: "Impact deleted successfully!",
                    error: "Failed to delete. Try again.",
                }
            );
            dispatch(fetchImpactData());
        } catch (error) { }
    };

    const handleEdit = (item: any) => {
        setEditId(item.id);
        setEditValues({ number: item.number, label: item.label, imageFile: null });
    };

    const handleUpdate = async () => {
        const token = JSON.parse(localStorage.getItem("auth") || "{}")?.token;
        if (!editId) return;

        const formData = new FormData();
        formData.append("number", editValues.number);
        formData.append("label", editValues.label);
        if (editValues.imageFile) {
            formData.append("image", editValues.imageFile);
        }

        try {
            await toast.promise(
                async () =>
                    await axios.put(`${BE_URL}/api/v1/impact/${editId}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }),
                {
                    loading: "Updating impact...",
                    success: "Impact updated successfully!",
                    error: "Failed to update. Try again.",
                }
            );

            setEditId(null);
            dispatch(fetchImpactData());
        } catch (err) { }
    };

    return (
        <div className="min-h-screen font-inter ">
            <h2 className="text-2xl text-center pb-10">All Impacts</h2>

            {loading && <p className="text-center text-gray-600">Loading impact data...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
                {impactData.map((item: any) => (
                    <div
                        key={item.id}
                        className="h-[240px] bg-cover rounded-[10px] p-3 relative border border-gray-300"
                        style={{
                            backgroundImage: `url(${item.imageUrl})`,
                            backgroundPosition: "center top",
                        }}
                    >
                        <h3 className="text-2xl font-medium text-center">{item.number}</h3>
                        <h4 className="text-center text-sm">{item.label}</h4>

                        <button
                            onClick={() => handleEdit(item)}
                            className="bg-[#12bb3c] w-fit p-2 absolute top-2 left-2 rounded-full flex items-center justify-center text-white"
                        >
                            <SquarePen />
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-[#eb1f1f] w-fit p-2 absolute top-2 right-2 rounded-full flex items-center justify-center text-white"
                        >
                            <Trash2 />
                        </button>
                    </div>
                ))}
            </div>

            {editId && (
                <div className="mt-12 bg-white rounded-xl shadow p-6 border border-gray-300 max-w-2xl mx-auto">
                    <h3 className="text-xl text-center font-semibold mb-4">Edit Impact</h3>

                    <div className="space-y-4">
                        <input
                            type="text"
                            value={editValues.number}
                            onChange={(e) => setEditValues({ ...editValues, number: e.target.value })}
                            placeholder="Number"
                            className="w-full p-2 border rounded-lg !outline-none"
                        />
                        <input
                            type="text"
                            value={editValues.label}
                            onChange={(e) => setEditValues({ ...editValues, label: e.target.value })}
                            placeholder="Label"
                            className="w-full p-2 border rounded-lg !outline-none"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                if (file) {
                                    setEditValues({
                                        ...editValues,
                                        imageFile: file,
                                    });
                                    const preview = URL.createObjectURL(file);
                                    setImagePreview(preview);
                                }
                            }}
                            className="w-full"
                        />

                        {/* Image Preview */}
                        <div className="mt-4">
                            <p className="font-medium mb-2">Image Preview:</p>
                            <img
                                src={
                                    editValues.imageFile
                                        ? URL.createObjectURL(editValues.imageFile)
                                        : impactData.find((i: any) => i.id === editId)?.imageUrl
                                }
                                alt="Preview"
                                className="w-full h-[200px] object-contain rounded-lg border"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-600 text-white px-4 py-2 rounded-full"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setEditId(null)}
                                className="bg-gray-300 px-4 py-2 rounded-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminImpact;
