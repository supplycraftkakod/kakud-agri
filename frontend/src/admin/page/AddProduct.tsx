import { ImageUp, Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../config";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState([""]);
  const [benefits, setBenefits] = useState([""]);
  const [activeIngredients, setActiveIngredients] = useState([""]);
  const [formulationType, setFormulationType] = useState([""]);
  const [crop, setCrop] = useState([""]);

  const addInput = (type: "about" | "benefits" | "activeIngredients" | "formulationType" | "crop") => {
    const update = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
      setter((prev) => [...prev, ""]);

    if (type === "about") update(setAbout);
    else if (type === "benefits") update(setBenefits);
    else if (type === "activeIngredients") update(setActiveIngredients);
    else if (type === "formulationType") update(setFormulationType);
    else if (type === "crop") update(setCrop);
  };

  const handleInputChange = (
    type: "about" | "benefits" | "activeIngredients" | "formulationType" | "crop",
    index: number,
    value: string
  ) => {
    const update = (setter: React.Dispatch<React.SetStateAction<string[]>>, current: string[]) => {
      const updated = [...current];
      updated[index] = value;
      setter(updated);
    };

    switch (type) {
      case "about":
        update(setAbout, about);
        break;
      case "benefits":
        update(setBenefits, benefits);
        break;
      case "activeIngredients":
        update(setActiveIngredients, activeIngredients);
        break;
      case "formulationType":
        update(setFormulationType, formulationType);
        break;
      case "crop":
        update(setCrop, crop);
        break;
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("about", JSON.stringify(about));
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("activeIngredients", JSON.stringify(activeIngredients));
    formData.append("formulationTypes", JSON.stringify(formulationType));
    formData.append("crops", JSON.stringify(crop));

    const authStorage = localStorage.getItem("auth");
    let token;

    if (authStorage) {
      const authData = JSON.parse(authStorage);
      token = authData.token;
    }

    const toastId = toast.loading("Adding...");

    try {
      const res = await axios.post<any>(`${BE_URL}/api/v1/admin/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token || ""}`,
        },
      });

      if (res.data.message === "Product added successfully") {
        toast.success("Product added successfully!", { id: toastId });
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Failed to add product";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="w-full font-inter">
      {/* top */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-stretch gap-8">
        <label
          htmlFor="image-upload"
          className="min-w-[150px] lg:min-w-[213px] flex flex-col items-center justify-center rounded-lg border border-dashed border-[#A69F9F] cursor-pointer"
        >
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />
          {
            !imagePreview && (
              <div className="flex flex-col items-center justify-cenrer p-3 lg:p-6 gap-8">
                <ImageUp className="w-[50px] h-[50px] lg:w-[86px] lg:h-[86px]" />
                <h2 className="text-center">Click to upload image</h2>
              </div>
            )
          }
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 px-2 w-full h-[200px] object-contain rounded-lg"
            />
          )}
        </label>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <h4 className="pl-1 text-gray-900">Product Category.</h4>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 px-3 rounded-lg appearance-none !outline-none border border-[#D9D9D9] w-full"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {[
                  'Insecticides',
                  'Fungicides',
                  'Herbicides',
                  'Plant Growth Regulators (PGRs)',
                  'Micronutrients',
                  'Organic Fertilizers',
                  'Complex Fertilizers',
                  'Seeds',
                  'Soil Conditioners & Fertility Boosters',
                  'Adjuvants & Spreaders',
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <h4 className="pl-1 mt-2 text-gray-900">Product Name.</h4>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]"
            />
          </div>
          <div>
            <h4 className="pl-1 pb-2 mt-1 text-gray-900">Product Description.</h4>
            <textarea
              name="Description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]"
            />
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="w-full mt-8 mb-8 space-y-10 gap-10">
        {/* Left Section */}
        <div className="w-full flex flex-col gap-10">
          {/* ABOUT */}
          <TextListInput title="About" type="about" list={about} onChange={handleInputChange} onAdd={addInput} />
          {/* BENEFITS */}
          <TextListInput title="Benefits" type="benefits" list={benefits} onChange={handleInputChange} onAdd={addInput} />
        </div>

        {/* Right Section */}
        <div className="w-full flex flex-col gap-10">
          <TextListInput title="Active Ingredients" type="activeIngredients" list={activeIngredients} onChange={handleInputChange} onAdd={addInput} />
          <TextListInput title="Formulation Type" type="formulationType" list={formulationType} onChange={handleInputChange} onAdd={addInput} />
          <TextListInput title="Crop" type="crop" list={crop} onChange={handleInputChange} onAdd={addInput} />
        </div>
      </div>

      <div
        className="w-full py-2 mt-4 text-center text-white rounded-lg bg-black cursor-pointer"
        onClick={handleSubmit}
      >
        <h2>Add</h2>
      </div>
    </div>
  );
};

const TextListInput = ({ title, list, type, onChange, onAdd, }: { title: string; list: string[]; type: "about" | "benefits" | "activeIngredients" | "formulationType" | "crop"; onChange: (type: any, index: number, value: string) => void; onAdd: (type: any) => void; }) => (
  <div>
    <h2 className="text-xl font-medium">{title}</h2>
    {list.map((_, index) => (
      <div key={index} className="flex items-center gap-2 mt-2">
        <input
          className="w-[96%] border-[1px] border-[#D9D9D9] !outline-none px-3 py-2 rounded-full placeholder:text-[0.9rem]"
          type="text"
          placeholder={`Enter ${title.toLowerCase()}`}
          value={list[index]}
          onChange={(e) => onChange(type, index, e.target.value)}
        />
        {index === list.length - 1 && (
          <div
            className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] cursor-pointer"
            onClick={() => onAdd(type)}
          >
            <Plus />
          </div>
        )}
      </div>
    ))}
  </div>
);

export default AddProduct;
