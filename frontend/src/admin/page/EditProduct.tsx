import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../config";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { ImageUp, X } from "lucide-react";

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [originalProduct, setOriginalProduct] = useState<any>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const res = await axios.get<any>(`${BE_URL}/api/v1/product/${id}`);
            setProduct(res.data.product);
            setOriginalProduct(res.data.product);
            setPreviewImage(res.data.product.imageUrl);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch product", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product) {
            if (!product.keyFeatures || product.keyFeatures.length === 0) {
                setProduct((prev: any) => ({ ...prev, keyFeatures: [''] }));
            }
            if (!product.highlights || product.highlights.length === 0) {
                setProduct((prev: any) => ({ ...prev, highlights: [''] }));
            }
            if (!product.whatsInside || product.whatsInside.length === 0) {
                setProduct((prev: any) => ({ ...prev, whatsInside: [''] }));
            }
        }
    }, [product]);


    const handleChange = (field: string, value: string) => {
        setProduct((prev: any) => ({ ...prev, [field]: value }));
    };

    const deepEqual = (a: any, b: any): boolean => {
        return JSON.stringify(a) === JSON.stringify(b);
    };

    const isChanged =
        !deepEqual(product, originalProduct) || imageFile !== null;

    const handleSubmit = async () => {
        const toastId = toast.loading("Updating...");
        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("category", product.category);
        formData.append("description", product.description);

        formData.append("aboutPoints", JSON.stringify(product.aboutPoints || []));
        formData.append("benefitPoints", JSON.stringify(product.benefitPoints || []));
        formData.append("activeIngredients", JSON.stringify(product.activeIngredients || []));
        formData.append("formulationTypes", JSON.stringify(product.formulationTypes || []));
        formData.append("crops", JSON.stringify(product.crops || []));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        const authStorage = localStorage.getItem("auth");
        let token;

        if (authStorage) {
            const authData = JSON.parse(authStorage);
            token = authData.token;
        }

        try {
            await axios.put(`${BE_URL}/api/v1/admin/product/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Product updated successfully!", { id: toastId });
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage, { id: toastId });
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!product) return <div className="p-6">Product not found.</div>;

    return (
        <div className="w-full max-w-4xl mx-auto p-6 font-inter">
            <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-8">
                {/* Image Preview & Upload */}
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
                                setImageFile(file);
                                setPreviewImage(URL.createObjectURL(file));
                            }
                        }}
                        className="hidden"
                    />
                    {!previewImage && (
                        <div className="flex flex-col items-center p-3 lg:p-6 gap-4">
                            <ImageUp className="w-12 h-12 lg:w-20 lg:h-20" />
                            <h2 className="text-center text-gray-500">Click to upload image</h2>
                        </div>
                    )}
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="mt-2 px-2 w-full h-[200px] object-contain rounded-lg"
                        />
                    )}
                </label>

                {/* Basic Fields */}
                <div className="w-full flex flex-col gap-4">
                    <div>
                        <h4 className="pl-1 text-gray-900">Product Category</h4>
                        <input
                            type="text"
                            value={product.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            className="w-full p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]"
                            placeholder="Category"
                        />
                    </div>
                    <div>
                        <h4 className="pl-1 text-gray-900">Product Name</h4>
                        <input
                            type="text"
                            value={product.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]"
                            placeholder="Product Name"
                        />
                    </div>
                    <div>
                        <h4 className="pl-1 text-gray-900">Description</h4>
                        <textarea
                            value={product.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full h-[8rem] p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]"
                            placeholder="Description"
                        />
                    </div>
                </div>
            </div>

            {/* List Inputs */}
            <div className="mt-10 space-y-10">
                <TextListInput
                    title="About Points"
                    list={product.aboutPoints || []}
                    onChange={(updated) =>
                        setProduct((prev: any) => ({ ...prev, aboutPoints: updated }))
                    }
                />

                <TextListInput
                    title="Benefit Points"
                    list={product.benefitPoints || []}
                    onChange={(updated) =>
                        setProduct((prev: any) => ({ ...prev, benefitPoints: updated }))
                    }
                />

                <TextListInput
                    title="Active Ingredients"
                    list={product.activeIngredients || []}
                    onChange={(updated) =>
                        setProduct((prev: any) => ({ ...prev, activeIngredients: updated }))
                    }
                />

                <TextListInput
                    title="Formulation Types"
                    list={product.formulationTypes || []}
                    onChange={(updated) =>
                        setProduct((prev: any) => ({ ...prev, formulationTypes: updated }))
                    }
                />

                <TextListInput
                    title="Crops"
                    list={product.crops || []}
                    onChange={(updated) =>
                        setProduct((prev: any) => ({ ...prev, crops: updated }))
                    }
                />


            </div>

            {/* Submit Button */}
            <div
                className={`mt-10 py-2 text-center text-white rounded-lg ${isChanged ? "bg-[#338735] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                    }`}
                onClick={isChanged ? handleSubmit : undefined}
            >
                <h2>Update Product</h2>
            </div>
        </div>
    );
};

type TextListInputProps = {
    title: string;
    list: string[];
    onChange: (updatedList: string[]) => void;
};

export const TextListInput: React.FC<TextListInputProps> = ({ title, list, onChange }) => {
    const [localList, setLocalList] = useState<string[]>([]);

    // Sync list from props only if it changes
    useEffect(() => {
        if (!list || list.length === 0) {
            setLocalList([""]);
        } else {
            setLocalList(list);
        }
    }, [list]);

    const handleChange = (index: number, value: string) => {
        const updated = [...localList];
        updated[index] = value;
        setLocalList(updated);
        onChange(updated);
    };

    const handleAdd = () => {
        const updated = [...localList, ""];
        setLocalList(updated);
        onChange(updated);
    };

    const handleRemove = (index: number) => {
        const updated = localList.filter((_, i) => i !== index);
        setLocalList(updated.length > 0 ? updated : [""]);
        onChange(updated.length > 0 ? updated : [""]);
    };

    return (
        <div className="space-y-2">
            <h2 className="text-sm font-medium">{title}</h2>
            {localList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <input
                        value={item}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        placeholder={`Enter ${title.toLowerCase()}`}
                    className="flex-1 border border-gray-300 px-2 py-1 rounded !outline-gray-300"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="w-8 h-8 p-1 rounded-full flex items-center justify-center text-white bg-[#ff5b5b] cursor-pointer"
                        title="Remove"
                    >
                        <X />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAdd}
                className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] cursor-pointer"
            >
                <Plus />
            </button>
        </div>
    );
};
export default EditProduct;
