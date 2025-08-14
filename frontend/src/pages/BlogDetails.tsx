import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { BE_URL } from "../../config";
import Footer from "../components/Footer";
import { Download, Share2 } from "lucide-react";
import kakudLogo from "../../public/logo.png"

import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";


interface ContentBlock {
    type: "bigHeading" | "subHeading" | "paragraph" | "image";
    value?: string;
}

interface Blog {
    id: string;
    title: string;
    category: string;
    createdAt: string;
    contentBlocks: ContentBlock[];
}

const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const blogRef = useRef<HTMLDivElement>(null);

    const location = useLocation();

    const handleShareClick = () => {
        const fullUrl = `${window.location.origin}${location.pathname}`;
        navigator.clipboard.writeText(fullUrl)
            .then(() => {
                toast.success("Link copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy link.");
            });
    };

    const handleDownloadPDF = async () => {
        const input = blogRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        // const pageHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pageWidth;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${blog?.title || "blog"}.pdf`);
    };


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const authStorage = localStorage.getItem("auth");
                let token;

                if (authStorage) {
                    const authData = JSON.parse(authStorage);
                    token = authData.token;
                }

                const res = await axios.get<any>(`${BE_URL}/api/v1/admin/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const foundBlog = res.data.blogs.find((b: Blog) => b.id === id);
                if (!foundBlog) throw new Error("Blog not found");

                setBlog(foundBlog);
            } catch (err: any) {
                setError(err.response?.data?.error || err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <div className="p-4 text-center">
        <Loader />
    </div>;
    if (error) return <div className="p-4 text-red-500">Error occured!</div>;
    if (!blog) return null;

    const firstImageBlock = blog.contentBlocks.find(b => b.type === "image");
    const firstHeading: any = blog.contentBlocks.find(b => b.type === "bigHeading");

    return (
        <div className="max-w-[100em] mx-auto from-[#f3eff7] via-[#f3eaf1] to-[#faf4f0]" ref={blogRef}>
            <div>
                <Navbar />
            </div>

            <div ref={blogRef}
                className="pt-24 md:pt-2"
            >

                <div className="w-full px-6 md:px-[1.5rem] lg:px-[4rem] xl:px-[6rem] py-[2rem] flex flex-col items-center md:flex-row md:items-start gap-4 md:gap-8 mb-2 bg-[#f76b64] shadow-sm">
                    <div className="w-fit flex flex-col items-center gap-1">
                        <img src={kakudLogo} alt="Kakud" className="w-[40px] md:w-[70px]" />
                        <h2 className="text-sm font-medium text-white text-center">Kakud Agri</h2>
                    </div>
                    <div>
                        <h1 className="text-center text-white font-playfair text-3xl sm:text-5xl tracking-wide font-bold">{blog.title}</h1>
                        <h3 className="text-center text-yellow-200 pt-2 text-xl sm:text-2xl">{firstHeading.value}</h3>
                    </div>
                </div>
                <div className="mt-3 py-2 px-6 border-y border-gray-400 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-10 shadow-sm">
                    <h3 className="text-left leading-none sm:text-lg"><span className="font-playfair italic font-medium">From: </span>Workshop Blog - Field training & meetings</h3>
                    <h3 className="text-left leading-none sm:text-lg"><span className="font-playfair italic font-medium">Date: </span>{new Date(blog.createdAt).toLocaleDateString()}</h3>
                    <h3 onClick={handleShareClick}
                        className="text-left leading-none sm:text-lg flex items-center gap-2 font-playfair italic font-medium cursor-pointer"
                    >
                        Share: <span><Share2 className="w-5 h-5" /></span>
                    </h3>
                </div>

                <div className="w-full pt-6 pb-10 px-6 md:px-[1.5rem] lg:px-[4rem] xl:px-[6rem] font-inter">

                    {/* First image as cover */}
                    {firstImageBlock && (
                        <div
                            className="h-[12rem] xs:h-[15rem] sm:h-[20rem] md:h-[24rem] lg:h-[30rem] bg-no-repeat bg-cover bg-center rounded-lg flex flex-col overflow-hidden relative transition-all duration-500 border border-gray-300"
                            style={{
                                backgroundImage: `url(${firstImageBlock.value})`,
                                backgroundPosition: "center top",
                            }}
                        ></div>
                    )}

                    {/* Created At */}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex flex-wrap items-center gap-4 sm:justify-between text-gray-600">
                            <p>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <Download className="cursor-pointer w-6 h-6" onClick={handleDownloadPDF} />

                        </div>
                    </div>

                    {/* Blog Content */}
                    <div className="mt-4 sm:mt-8 space-y-6">
                        {blog.contentBlocks.map((block, index) => {
                            if (block.type === "bigHeading") {
                                return (
                                    <h1 key={index} className="text-3xl font-bold text-gray-800">
                                        {block.value}
                                    </h1>
                                );
                            }

                            if (block.type === "subHeading") {
                                return (
                                    <h2 key={index} className="text-2xl font-semibold text-gray-700">
                                        {block.value}
                                    </h2>
                                );
                            }

                            if (block.type === "paragraph") {
                                return (
                                    <p key={index} className="text-base text-gray-800 leading-relaxed">
                                        {block.value}
                                    </p>
                                );
                            }

                            if (block.type === "image" && block.value !== firstImageBlock?.value) {
                                return (
                                    <img
                                        key={index}
                                        src={block.value}
                                        alt={`blog-img-${index}`}
                                        className="w-full max-h-[30rem] object-contain rounded-md border border-gray-200"
                                    />
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BlogDetails;
