import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BE_URL } from "../../../../config";
import { Plus } from "lucide-react";

const AddNewMember = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [aboutLines, setAboutLines] = useState<string[]>([""]);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleAddLine = () => {
        setAboutLines([...aboutLines, ""]);
    };

    const handleAboutChange = (index: number, value: string) => {
        const newLines = [...aboutLines];
        newLines[index] = value;
        setAboutLines(newLines);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !role || !image || aboutLines.some(line => !line.trim())) {
            toast.error("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        formData.append("about", JSON.stringify(aboutLines));
        formData.append("image", image);

        const authStorage = localStorage.getItem("auth");
        let token;

        if (authStorage) {
            const authData = JSON.parse(authStorage);
            token = authData.token;
        }

        await toast.promise(
            (async () =>
                await axios.post(`${BE_URL}/api/v1/team/add`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }))(),
            {
                loading: "Submitting...",
                success: "Team member added successfully!",
                error: "Failed to add team member",
            }
        );

        setName("");
        setRole("");
        setAboutLines([""]);
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div className="p-4 max-w-xl mx-auto font-inter">
            <h2 className="text-2xl text-center mb-10">Add New Team Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-2 rounded-lg !outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Role"
                    className="w-full border p-2 rounded-lg !outline-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />

                <input
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={handleImageChange}
                />

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-[200px] object-contain rounded-lg border"
                    />
                )}

                {aboutLines.map((line, index) => (
                    <textarea
                        key={index}
                        className="w-full border p-2 rounded-lg !outline-none"
                        placeholder={`About Line ${index + 1}`}
                        value={line}
                        onChange={(e) => handleAboutChange(index, e.target.value)}
                    />
                ))}

                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={handleAddLine}
                        className="bg-gray-200 w-fit p-2 rounded-full"
                    >
                        <Plus />
                    </button>

                    <button
                        type="submit"
                        className="w-full py-2 text-center text-white rounded-full bg-black cursor-pointer"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewMember;
