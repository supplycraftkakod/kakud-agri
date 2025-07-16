import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { BE_URL } from "../../config";

interface ContentBlock {
    type: "bigHeading" | "subHeading" | "paragraph" | "image";
    value?: string;
}

interface Blog {
    id: string;
    title: string;
    createdAt: string;
    contentBlocks: ContentBlock[];
}

const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="max-w-[100em] mx-auto">
            <div className="pb-16 md:pb-28">
                <Navbar />
            </div>

            <div className="w-full pt-6 pb-10 px-6 md:px-[1.5rem] lg:px-[8rem] xl:px-[12rem] font-inter">

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
                <div className="mt-4 flex flex-wrap items-center gap-4 sm:justify-between text-gray-600">
                    <p>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
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
    );
};

export default BlogDetails;
