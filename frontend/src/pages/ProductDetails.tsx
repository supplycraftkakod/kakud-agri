import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Download } from "lucide-react";
import { AppDispatch, RootState } from "../redux/store/store";
import { fetchProductById } from "../redux/slices/singleProductSlice";
import { BE_URL } from "../../config";
import axios from "axios";
import Loader from "../components/Loader";

import activeIntredieantIcon from "../assets/icons/product-icons/active-ingredients.png"
import formulationTypeIcon from "../assets/icons/product-icons/formulation-type.png"
import cropsIcon from "../assets/icons/product-icons/crops.png"

const ProductDetails = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading } = useSelector((state: RootState) => state.singleProduct);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        // Increment view count when component mounts
        axios.post(`${BE_URL}/api/v1/product/increment-view/${id}`)
    }, [id]);

    const handleDownloadPDF = async () => {
        const input = contentRef.current;
        if (!input) return;

        // Load logo image as base64
        const logo = await new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.src = "/kakud-logo.png"; // Change as needed
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = reject;
        });

        // Capture the DOM content
        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
        });

        const contentImg = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();

        // Logo dimensions and spacing
        const logoWidth = 20;  // mm
        const logoHeight = 20; // mm
        const logoX = (pageWidth - logoWidth) / 2;
        let y = 10; // Start from top

        // Add logo to PDF
        pdf.addImage(logo, "PNG", logoX, y, logoWidth, logoHeight);

        // Add margin below logo
        const logoBottomMargin = 15; // mm
        y += logoHeight + logoBottomMargin;

        // Add content image
        const imgProps = pdf.getImageProperties(contentImg);
        const contentWidth = pageWidth;
        const contentHeight = (imgProps.height * contentWidth) / imgProps.width;

        pdf.addImage(contentImg, "PNG", 0, y, contentWidth, contentHeight);
        pdf.save(`${product?.name || "product"}.pdf`);
    };




    if (loading || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-medium">
                {loading ? <Loader /> : "Product not found"}
            </div>
        );
    }

    return (
        <div className="max-w-[100em] mx-auto">
            <div>
                <Navbar />
            </div>

            <div ref={contentRef} className="w-full pt-20 md:pt-10 px-6 pb-16 md:px-[3rem] lg:px-[4rem] font-inter">
                <div>
                    {/* Header */}
                    <div className="flex items-center md:items-stretch flex-col md:flex-row gap-8 mb-6">
                        {/* Product Image */}
                        <div className="w-full md:w-fit flex-shrink-0 flex justify-center px-10 py-8 lg:px-20 rounded-lg bg-[#F0F0F0]">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full md:w-[220px] h-[220px] object-contain"
                            />
                        </div>

                        {/* Product Title and Description */}
                        <div className="w-full flex flex-col justify-start md:justify-between gap-2 lg:gap-4 md:min-h-[220px]">
                            <div className="w-full flex items-start justify-between">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg text-[#505050] leading-none">{product.category}</h2>
                                    <h1 className="text-[1.75rem] font-medium leading-none text-[#449E08]">{product.name}</h1>
                                    <p className="md:text-lg font-light mt-2">{product.description}</p>
                                </div>
                            </div>
                            <div>
                                <div
                                    onClick={handleDownloadPDF}
                                    className="w-fit p-2 px-4 text-white mt-2 md:mt-0 bg-[#449E08] rounded-full flex gap-4 items-center justify-center cursor-pointer">
                                    Download in PDF
                                    <Download className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="w-full flex flex-col items-start justify-between lg:grid grid-cols-[1.8fr,1fr] gap-6 lg:gap-10">
                        <div className="">
                            {/* About Section */}
                            {
                                product.aboutPoints?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="mt-6 md:mt-10">
                                        <h3 className="text-2xl mb-3">About {product.name}</h3>
                                        <ul className="md:text-lg font-light list-disc px-8 sm:px-10">
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
                                        <ul className="md:text-lg font-light list-disc px-8 sm:px-10">
                                            {product.benefitPoints?.map((benefit: string, i: number) => (
                                                <li key={i}>{benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }

                        </div>

                        {/* Right Sidebar Details */}
                        <div className=" md:mt-10 space-y-4">
                            <p className="font-light ">
                                Last updated: {new Date(product.lastUpdated).toLocaleString()}
                            </p>
                            {
                                product.activeIngredients?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="flex items-stretch gap-2">
                                        <div className="min-w-[100px] h-[100px] rounded-lg bg-[#F0F0F0] bg-no-repeat bg-cover">
                                            <img src={activeIntredieantIcon} alt="active" className="w-full h-full p-2" />
                                        </div>
                                        <div className="w-full bg-[#F0F0F0] p-3 rounded-lg">
                                            <p className="text-[#505050] font-medium leading-none pb-2">Active Ingredients</p>
                                            <p className="">
                                                {product.activeIngredients?.join(", ") || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                )

                            }

                            {
                                product.formulationTypes?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="flex items-stretch gap-2">
                                        <div className="min-w-[100px] h-[100px] rounded-lg bg-[#F0F0F0] bg-no-repeat bg-cover"                                        >
                                            <img src={formulationTypeIcon} alt="active" className="w-full h-full p-2" />
                                        </div>
                                        <div className="w-full bg-[#F0F0F0] p-3 rounded-lg">
                                            <p className="text-[#505050] font-medium leading-none pb-2">Formulation Type</p>
                                            <p className="">
                                                {product.formulationTypes?.join(", ") || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                )
                            }

                            {
                                product.crops?.filter((a: any) => a.trim() !== '').length > 0 && (

                                    <div className="flex items-stretch gap-2">
                                        <div className="min-w-[100px] h-[100px] rounded-lg bg-[#F0F0F0] bg-no-repeat bg-cover">
                                            <img src={cropsIcon} alt="active" className="w-full h-full p-2" />
                                        </div>
                                        <div className="w-full bg-[#F0F0F0] p-4 rounded-lg">
                                            <p className="text-[#505050] font-medium leading-none pb-3">Crops</p>
                                            <div className="flex flex-wrap gap-2">
                                                {product.crops?.map((crop: string) => (
                                                    <span
                                                        key={crop}
                                                        className="bg-purple-200 text-[#1f4d00] px-3 py-1 rounded-full "
                                                    >
                                                        {crop}
                                                    </span>
                                                ))}
                                            </div>
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
