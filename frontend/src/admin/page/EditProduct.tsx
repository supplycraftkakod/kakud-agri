import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../config";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [originalProduct, setOriginalProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const res = await axios.get<any>(`${BE_URL}/api/v1/product/${id}`);
            setProduct(res.data.product);
            setOriginalProduct(res.data.product);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch product", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleChange = (field: string, value: string) => {
        setProduct((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (key: string, index: number, value: string) => {
        const updatedArray = [...product[key]];
        updatedArray[index] = value;
        setProduct((prev: any) => ({ ...prev, [key]: updatedArray }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`${BE_URL}/api/v1/admin/product/${id}`, product);
            toast.success("Product updated successfully!")
        } catch (error) {
            toast.error("Error occured!")
        }
    };

    const addItem = (key: string) => {
        setProduct((prev: any) => ({
            ...prev,
            [key]: [...(prev[key] || []), ""],
        }));
    };

    const removeItem = (key: string, index: number) => {
        setProduct((prev: any) => {
            const updated = [...prev[key]];
            updated.splice(index, 1);
            return {
                ...prev,
                [key]: updated,
            };
        });
    };
    const deepEqual = (a: any, b: any): boolean => {
        return JSON.stringify(a) === JSON.stringify(b);
    };

    const isChanged = !deepEqual(product, originalProduct);

    const renderEditableList = (
        key: string,
        title: string,
        placeholder: string
    ) => (
        <div className="mt-6">
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            {product[key]?.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2 my-1">
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(key, index, e.target.value)}
                        className="w-full border p-2"
                        placeholder={placeholder}
                    />
                    <button
                        className="text-red-500 font-bold rounded-full border border-gray-200 p-1"
                        onClick={() => removeItem(key, index)}
                        type="button"
                    >
                        <X />
                    </button>
                </div>
            ))}
            <div className="w-full flex justify-end">
                <button
                    className="text-sm text-blue-600 mt-2 rounded-full border border-gray-200 p-1"
                    onClick={() => addItem(key)}
                    type="button"
                >
                    <Plus />
                </button>
            </div>

        </div>
    );


    if (loading) return <div className="p-6">Loading...</div>;
    if (!product) return <div className="p-6">Product not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 font-inter">
            <h2 className="text-2xl text-center font-bold mb-4">Edit Product</h2>

            <div className="space-y-4">
                <div>
                    <h4 className="text-xl font-semibold mb-2">Name</h4>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Product Name"
                        className="w-full border p-2 rounded-lg !outline-none"
                    />
                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-2">Category</h4>
                    <input
                        type="text"
                        value={product.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                        placeholder="Category"
                        className="w-full border p-2 rounded-lg !outline-none"
                    />
                </div>

                <div>
                    <h4 className="text-xl font-semibold mb-2">Image Url</h4>
                    <input
                        type="text"
                        disabled
                        value={product.imageUrl}
                        onChange={(e) => handleChange("imageUrl", e.target.value)}
                        placeholder="Image URL"
                        className="w-full border p-2 rounded-lg !outline-none"
                    />

                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-2">Description</h4>
                    <textarea
                        value={product.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Description"
                        className="w-full h-[8rem] border p-2 rounded-lg !outline-none"
                    />
                </div>

                {/* About */}
                <div>
                    {renderEditableList("aboutPoints", "About Points", "Enter about point")}
                </div>

                {/* Benefits */}
                <div>
                    {renderEditableList("benefitPoints", "Benefit Points", "Enter benefit")}
                </div>

                {/* Active Ingredients */}
                <div>
                    {renderEditableList("activeIngredients", "Active Ingredients", "Enter ingredient")}
                </div>

                {/* Formulation Types */}
                <div>
                    {renderEditableList("formulationTypes", "Formulation Types", "Enter formulation")}
                </div>

                {/* Crops */}
                <div>
                    {renderEditableList("crops", "Crops", "Enter crop")}
                </div>

                <button
                    className={`px-6 py-2 rounded mt-4 ${isChanged ? "bg-[#338735] text-white" : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                    onClick={handleSubmit}
                    disabled={!isChanged}
                >
                    Update Product
                </button>

            </div>
        </div>
    );
};


export default EditProduct;
