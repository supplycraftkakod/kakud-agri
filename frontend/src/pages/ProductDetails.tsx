import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Download } from "lucide-react";
import { AppDispatch, RootState } from "../redux/store/store";
import { fetchProductById } from "../redux/slices/singleProductSlice";
import { BE_URL } from "../../config";
import axios from "axios";
import Loader from "../components/Loader";

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
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        let y = 20;
        let currentPage = 1;

        const margin = 10;
        const imageWidth = 50;
        const contentWidth = pageWidth - imageWidth - margin * 3;

        // --- Header/Footer ---
        const addHeaderFooter = (pageNum: number) => {
            doc.setFontSize(20);
            doc.setTextColor(201, 0, 107);
            doc.text("Kakud Agri", margin, 10);
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text(`Page ${pageNum}`, pageWidth - 30, pageHeight - 10);
        };

        addHeaderFooter(currentPage);

        // --- Convert Image ---
        const getImageAsBase64 = (url: string): Promise<string> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
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
                img.src = url;
            });
        };

        const imageBase64 = await getImageAsBase64(product.imageUrl);

        // --- Add Image (Left side) ---
        const imageHeight = 50;
        doc.addImage(imageBase64, "PNG", margin, y, imageWidth, imageHeight);

        // --- Add Right Side Info (aligned with image) ---
        let textY = y;
        let textX = margin + imageWidth + 10;

        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Category: ${product.category}`, textX, textY);
        textY += 6;
        doc.text(`Name: ${product.name}`, textX, textY);
        textY += 6;

        // Split and wrap description
        const descLines = doc.splitTextToSize(`Description: ${product.description}`, contentWidth);
        descLines.forEach((line: any) => {
            doc.text(line, textX, textY);
            textY += 6;
        });

        y = Math.max(y + imageHeight, textY) + 10; // Move below image & description

        // --- Generic function to write labeled list/paragraph ---
        const addText = (label: string, content: string | string[], gap = 6) => {
            if (y + 20 > pageHeight - 20) {
                doc.addPage();
                currentPage++;
                addHeaderFooter(currentPage);
                y = 20;
            }

            doc.setFontSize(12);
            doc.text(`${label}`, margin, y);
            y += 6;

            const lines = typeof content === "string"
                ? doc.splitTextToSize(content, pageWidth - margin * 2)
                : content.flatMap(item => doc.splitTextToSize(item, pageWidth - margin * 2));

            lines.forEach((line: any) => {
                if (y + 10 > pageHeight - 20) {
                    doc.addPage();
                    currentPage++;
                    addHeaderFooter(currentPage);
                    y = 20;
                }
                doc.text(line, margin, y);
                y += gap;
            });

            y += 4;
        };

        // --- Add Remaining Fields ---
        if (product.aboutPoints?.length) {
            addText("About:", product.aboutPoints.map((pt: any) => `• ${pt}`));
        }

        if (product.benefitPoints?.length) {
            addText("Benefits:", product.benefitPoints.map((pt: any) => `• ${pt}`));
        }

        if (product.activeIngredients?.length) {
            addText("Active Ingredients:", product.activeIngredients.join(", "));
        }

        if (product.formulationTypes?.length) {
            addText("Formulation Types:", product.formulationTypes.join(", "));
        }

        if (product.crops?.length) {
            addText("Crops:", product.crops.join(", "));
        }

        addText("Last Updated:", new Date(product.lastUpdated).toLocaleString());

        // --- Save ---
        doc.save(`${product.name}_Details.pdf`);
    };

    if (loading || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-medium">
                {loading ? <Loader/> : "Product not found"}
            </div>
        );
    }

    return (
        <div>
            <div className="pb-24 md:pb-36">
                <Navbar />
            </div>

            <div ref={contentRef} className="w-full px-6 pb-16 md:px-[3rem] lg:px-[4rem] font-inter">
                <div>
                    {/* Header */}
                    <div className="flex items-center md:items-start flex-col md:flex-row gap-8 mb-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0 h-[230px] flex justify-center px-8 lg:px-20 mb-6">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>

                        {/* Product Title and Description */}
                        <div className="w-full flex flex-col justify-between gap-2 lg:gap-8">
                            <div className="w-full flex items-start justify-between">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg text-[#505050] leading-none">{product.category}</h2>
                                    <h1 className="text-[1.75rem] font-medium leading-none text-purple-700">{product.name}</h1>
                                </div>
                                <div
                                    onClick={handleDownloadPDF}
                                    className="p-2 bg-purple-700 rounded-full flex items-center justify-center cursor-pointer">
                                    <Download className="text-white w-5 h-5" />
                                </div>
                            </div>
                            <p className="md:text-lg font-light mt-2">{product.description}</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-10">
                        <div className="lg:w-[70%]">
                            {/* About Section */}
                            {
                                product.aboutPoints?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="mt-10">
                                        <h3 className="text-2xl mb-3">About {product.name}</h3>
                                        <ul className="md:text-lg font-light list-disc space-y-1 px-8 sm:px-10">
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
                                        <ul className="md:text-lg font-light list-disc space-y-1 px-8 sm:px-10">
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
                                        <p className="text-[#505050] font-medium leading-none pb-2">Active Ingredients</p>
                                        <p className="md:text-xl font-light">
                                            {product.activeIngredients?.join(", ") || "N/A"}
                                        </p>
                                    </div>
                                )

                            }

                            {
                                product.formulationTypes?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="bg-[#F0F0F0] p-3 rounded-lg">
                                        <p className="text-[#505050] font-medium leading-none pb-2">Formulation Type</p>
                                        <p className="md:text-xl font-light">
                                            {product.formulationTypes?.join(", ") || "N/A"}
                                        </p>
                                    </div>
                                )
                            }

                            {
                                product.crops?.filter((a: any) => a.trim() !== '').length > 0 && (
                                    <div className="bg-[#F0F0F0] p-4 rounded-lg">
                                        <p className="text-[#505050] font-medium leading-none pb-3">Crops</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.crops?.map((crop: string) => (
                                                <span
                                                    key={crop}
                                                    className="bg-purple-200 text-purple-800 px-3 py-1 font-light rounded-full md:text-xl"
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
