import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Download } from "lucide-react";
import { AppDispatch, RootState } from "../redux/store/store";
import { fetchProductById } from "../redux/slices/singleProductSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading } = useSelector((state: RootState) => state.singleProduct);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    if (loading || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-medium">
                {loading ? "Loading..." : "Product not found"}
            </div>
        );
    }

    return (
        <div>
            <div className="pb-24 md:pb-36">
                <Navbar />
            </div>

            <div className="w-full px-6 pb-16 md:px-[3rem] lg:px-[4rem] font-inter">
                <div>
                    {/* Header */}
                    <div className="flex items-center md:items-start flex-col md:flex-row gap-8 mb-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-full sm:w-[310px] lg:w-[345px] flex justify-center">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>

                        {/* Product Title and Description */}
                        <div className="w-full flex flex-col justify-between gap-2 lg:gap-8">
                            <div className="w-full flex items-start justify-between">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-xl text-[#505050] leading-none">{product.category}</h2>
                                    <h1 className="text-[2.25rem] font-medium leading-none text-purple-700">{product.name}</h1>
                                </div>
                                <div className="p-4 bg-purple-700 rounded-full flex items-center justify-center cursor-pointer">
                                    <Download className="text-white" />
                                </div>
                            </div>
                            <p className="text-lg font-light mt-2">{product.description}</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-10">
                        <div className="lg:w-[70%]">
                            {/* About Section */}
                            {
                                product.aboutPoints?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="mt-10">
                                        <h3 className="text-2xl mb-3">About {product.name}</h3>
                                        <ul className="text-lg list-disc space-y-1 px-8 sm:px-10">
                                            {product.aboutPoints?.map((point: string, i: number) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }

                            {/* Benefits Section */}
                            {
                                product.benefitPoints?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="mt-10">
                                        <h3 className="text-2xl mb-3">Benefits</h3>
                                        <ul className="text-lg list-disc space-y-1 px-8 sm:px-10">
                                            {product.benefitPoints?.map((benefit: string, i: number) => (
                                                <li key={i}>{benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }

                        </div>

                        {/* Right Sidebar Details */}
                        <div className="mt-10 space-y-4">
                            <p className="font-light">
                                Last updated: {new Date(product.lastUpdated).toLocaleString()}
                            </p>

                            {
                                product.activeIngredients?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="bg-[#F0F0F0] p-3 rounded-lg">
                                        <p className="text-[#505050] font-light leading-none pb-2">Active Ingredients</p>
                                        <p className="text-xl ">
                                            {product.activeIngredients?.join(", ") || "N/A"}
                                        </p>
                                    </div>
                                )

                            }

                            {
                                product.formulationTypes?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="bg-[#F0F0F0] p-3 rounded-lg">
                                        <p className="text-[#505050] font-light leading-none pb-2">Formulation Type</p>
                                        <p className="text-xl ">
                                            {product.formulationTypes?.join(", ") || "N/A"}
                                        </p>
                                    </div>
                                )
                            }

                            {
                                product.crops?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="bg-[#F0F0F0] p-4 rounded-lg">
                                        <p className="text-[#505050] font-light leading-none pb-3">Crops</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.crops?.map((crop: string) => (
                                                <span
                                                    key={crop}
                                                    className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xl"
                                                >
                                                    {crop}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
