import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../../../config";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../components/Loader";

interface ContentBlock {
    type: "bigHeading" | "subHeading" | "paragraph" | "image";
    value?: string;
}

interface Blog {
    id: string;
    title: string;
    contentBlocks: ContentBlock[];
    createdAt: string;
}

const ViewAllBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");

    const navigate = useNavigate();
    const limit = 6;

    // Debounce search input
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // reset page on new search
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const fetchBlogs = async (page: number, query: string) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:5000/api/v1/admin/all?page=${page}&limit=${limit}&search=${query}`
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(page, debouncedSearch);
    }, [page, debouncedSearch]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Blog?");
        if (!confirmDelete) return;
        const toastId = toast.loading("Deleting...");

        try {
            toast.loading("Deleting..")
            await axios.delete(`${BE_URL}/api/v1/admin/blogs/${id}`);
            toast.success("Blog deleted successfully", { id: toastId });
        } catch (error) {
            toast.error("Failed to delete the blog.", { id: toastId });
        }
    };

    if (loading) return <div className="p-4 text-center">
        <Loader />
    </div>;
    if (error) return <div className="p-4 text-red-500">Error occured</div>;

    return (
        <div className="font-inter">
            <div className="w-full flex flex-col gap-4 sm:flex-row items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-center">All Blogs</h2>
                <div className="w-full sm:w-fit relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm !outline-none"
                    />
                    <FiSearch className="absolute right-4 top-2.5 text-gray-500 cursor-pointer" />
                </div>
            </div>

            <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                {blogs.map((blog) => {
                    const imageBlock = blog.contentBlocks.find((block) => block.type === "image");
                    const paragraphBlock = blog.contentBlocks.find((block) => block.type === "paragraph");

                    return (
                        <div
                            key={blog.id}
                            className="w-full xs:w-[22rem] md:w-full mx-auto flex flex-col gap-4 border border-[#A69F9F] rounded-xl p-4"
                        >
                            <div
                                className="w-full xs:w-[20rem] sm:w-full h-[8rem] object-cover object-center bg-no-repeat  rounded-xl mx-auto"
                                style={{
                                    backgroundImage: `url(${imageBlock?.value || "/fallback.jpg"})`,
                                    backgroundPosition: "center top",
                                    backgroundSize: "cover",
                                }}
                            ></div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl leading-none">{blog.title}</h3>
                                <p className="text-xs text-gray-600 line-clamp-3">
                                    {paragraphBlock?.value || "No description available."}
                                </p>
                                <div className="flex gap-2">
                                    <a
                                        className="w-full py-2 text-center rounded-full bg-gray-900 text-white"
                                        href={`/blogs/${blog.id}`}
                                        target="_blank"
                                    >
                                        View
                                    </a>
                                    <button
                                        onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                                        className="w-full py-2 rounded-full bg-green-700 text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="bg-[#eb1f1f] w-fit p-2 rounded-full flex items-center justify-center text-white">
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-4 text-sm font-medium">
                    <FiChevronLeft
                        className={`cursor-pointer ${page === 1 ? "text-gray-400" : ""}`}
                        onClick={() => handlePageChange(page - 1)}
                    />
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <span
                            key={p}
                            className={`px-2 cursor-pointer ${p === page ? "rounded-full bg-black text-white px-3 py-1" : ""
                                }`}
                            onClick={() => handlePageChange(p)}
                        >
                            {p}
                        </span>
                    ))}
                    <FiChevronRight
                        className={`cursor-pointer ${page === totalPages ? "text-gray-400" : ""}`}
                        onClick={() => handlePageChange(page + 1)}
                    />
                </div>
            )}
        </div>
    );
};

export default ViewAllBlogs;
