import { useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../../config";
import toast from "react-hot-toast";

const AddImpact = () => {
    const [number, setNumber] = useState("");
    const [label, setLabel] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!number || !label || !image) {
            toast.error("All fields are required.")
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("number", number);
            formData.append("label", label);
            formData.append("image", image);

            await axios.post(
                `${BE_URL}/api/v1/impact`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Impact data added successfully.")
            setNumber("");
            setLabel("");
            setImage(null);
        } catch (error) {
            // console.error("Error adding impact data:", error);
            toast.error("Error adding impact data. Try again.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-inter">
            <h2 className="text-2xl text-center font-semibold mb-10">Add Impact Data</h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-md bg-white p-6 rounded-lg shadow mx-auto"
            >
                <div>
                    <label className="block font-medium mb-1">Number</label>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg !outline-none"
                        placeholder="e.g., 10,000+"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Label</label>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg !outline-none"
                        placeholder="e.g., Farmers Served"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                        }
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 mt-4 text-center text-white rounded-lg bg-black cursor-pointer"
                >
                    {loading ? "Submitting..." : "Add Impact"}
                </button>
            </form>
        </div>
    );
};

export default AddImpact;
