import { useState } from "react";
import toast from "react-hot-toast";
import { BE_URL } from "../../../../config";
import axios from "axios";
import { inputStyle, btnStyle } from "../../../styles";

const AddEvent = () => {
    const [formData, setFormData] = useState({
        name: "",
        shortDesc: "",
        city: "",
        state: "",
        date: "",
        timing: "",
        registerLink: "",
        venue: {
            address: "",
            landmark: "",
            googleMapUrl: "",
        },
        whyAttend: [""],
        speakers: [{ name: "", role: "", imageUrl: "" }],
    });
    const [heroImage, setHeroImage] = useState<File | null>(null);
    const [speakerImages, setSpeakerImages] = useState<(File | null)[]>([]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleVenueChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            venue: { ...prev.venue, [name]: value },
        }));
    };

    const handleHeroImage = (e: any) => {
        setHeroImage(e.target.files[0]);
    };

    const addSpeaker = () => {
        setFormData((prev) => ({
            ...prev,
            speakers: [...prev.speakers, { name: "", role: "", imageUrl: "" }],
        }));
        setSpeakerImages((prev) => [...prev, null]); // add a slot for the new speaker image
    };


    const handleSpeakerChange = (index: number, e: any) => {
        const updatedSpeakers = [...formData.speakers];
        //@ts-ignore
        updatedSpeakers[index][e.target.name] = e.target.value;
        setFormData((prev) => ({ ...prev, speakers: updatedSpeakers }));
    };

    const handleWhyAttendChange = (index: number, value: string) => {
        const updated = [...formData.whyAttend];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, whyAttend: updated }));
    };

    const addWhyAttendPoint = () => {
        setFormData((prev) => ({ ...prev, whyAttend: [...prev.whyAttend, ""] }));
    };

    const handleSpeakerImageChange = (index: number, file: File | null) => {
        const updated = [...speakerImages];
        updated[index] = file;
        setSpeakerImages(updated);
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const form = new FormData();
        form.append("name", formData.name);
        form.append("shortDesc", formData.shortDesc);
        form.append("city", formData.city);
        form.append("state", formData.state);
        form.append("date", formData.date);
        form.append("timing", formData.timing);
        form.append("registerLink", formData.registerLink);
        if (heroImage) form.append("heroImage", heroImage);

        // JSON fields
        form.append("venue", JSON.stringify(formData.venue));
        form.append("whyAttend", JSON.stringify(formData.whyAttend));

        // Strip imageUrl as it's now handled in backend
        const simplifiedSpeakers = formData.speakers.map(({ name, role }) => ({ name, role }));
        form.append("speakers", JSON.stringify(simplifiedSpeakers));

        // Append actual image files
        speakerImages.forEach((img) => {
            if (img) form.append("speakerImages", img);
        });

        const toastId = toast.loading("Creating event...");

        try {
            const authStorage = localStorage.getItem("auth");
            let token;

            if (authStorage) {
                const authData = JSON.parse(authStorage);
                token = authData.token;
            }

            const res = await axios.post(`${BE_URL}/api/v1/admin/event/create`, form, {
                headers: {
                    Authorization: `Bearer ${token}`, // Remove if not needed
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Event created:", res.data);
            toast.success("Event created successfully!", { id: toastId });
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.error || "Error creating event", { id: toastId });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <input name="name" placeholder="Event Name" onChange={handleChange} className={inputStyle} />
                <input name="shortDesc" placeholder="Short Description" onChange={handleChange} className={inputStyle} />
                <input name="city" placeholder="City" onChange={handleChange} className={inputStyle} />
                <input name="state" placeholder="State" onChange={handleChange} className={inputStyle} />
                <input name="date" type="date" onChange={handleChange} className={inputStyle} />
                <input name="timing" placeholder="Event Timing (e.g., 9:00 AM – 5:00 PM)" onChange={handleChange} className={inputStyle} />
                <input name="registerLink" placeholder="Google Form Register Link" onChange={handleChange} className={inputStyle} />
                <input type="file" accept="image/*" onChange={handleHeroImage} className={inputStyle} />
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">Speakers</h2>
                {formData.speakers.map((s, index) => (
                    <div key={index} className="grid md:grid-cols-4 gap-4 mb-4">
                        <input name="name" placeholder="Name" value={s.name} onChange={(e) => handleSpeakerChange(index, e)} className={inputStyle} />
                        <input name="role" placeholder="Role" value={s.role} onChange={(e) => handleSpeakerChange(index, e)} className={inputStyle} />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSpeakerImageChange(index, e.target.files?.[0] || null)}
                            className={inputStyle}
                        />
                    </div>
                ))}
                <button type="button" onClick={addSpeaker} className={btnStyle}>+ Add Speaker</button>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">Venue</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <input name="address" placeholder="Address" onChange={handleVenueChange} className={inputStyle} />
                    <input name="landmark" placeholder="Landmark" onChange={handleVenueChange} className={inputStyle} />
                    <input name="googleMapUrl" placeholder="Google Map URL" onChange={handleVenueChange} className={inputStyle} />
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">Why Attend</h2>
                {formData.whyAttend.map((point, index) => (
                    <input
                        key={index}
                        placeholder="Point"
                        value={point}
                        onChange={(e) => handleWhyAttendChange(index, e.target.value)}
                        className={`${inputStyle} mb-2`}
                    />
                ))}
                <button type="button" onClick={addWhyAttendPoint} className={btnStyle}>+ Add Point</button>
            </div>

            <div className="mt-10">
                <button type="submit" className={`${btnStyle} w-full bg-black text-white`}>Create Event</button>
            </div>
        </form>
    );
};

export default AddEvent;

