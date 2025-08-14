import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { BE_URL } from "../../../config";
import Loader from "../../components/Loader";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchBlogs, setPage, setSearch } from "../../redux/slices/blog/blogSlice";

const ViewAllBlogs: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { blogs, loading, error, page, totalPages, search } = useSelector(
        (state: RootState) => state.blogs
    );

    const limit = 6;

    // Fetch blogs with debounce
    useEffect(() => {
        const debounce = setTimeout(() => {
            dispatch(fetchBlogs({ page, limit, search }));
        }, 500);

        return () => clearTimeout(debounce);
    }, [page, search]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setPage(newPage));
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Blog?");
        if (!confirmDelete) return;
        const toastId = toast.loading("Deleting...");

        try {
            const authStorage = localStorage.getItem("auth");
            let token;

            if (authStorage) {
                const authData = JSON.parse(authStorage);
                token = authData.token;
            }

            await axios.delete(`${BE_URL}/api/v1/admin/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Blog deleted successfully", { id: toastId });
            dispatch(fetchBlogs({ page, limit, search })); // Refresh
        } catch (error) {
            toast.error("Failed to delete the blog.", { id: toastId });
        }
    };

    return (
        <div className="font-inter">
            <div className="w-full flex flex-col gap-4 sm:flex-row items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-center">All Blogs</h2>
                <div className="w-full sm:w-fit relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                        placeholder="Search by title..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm !outline-none"
                    />
                    <FiSearch className="absolute right-4 top-2.5 text-gray-500 cursor-pointer" />
                </div>
            </div>

            {loading ? (
                <div className="p-4 text-center">
                    <Loader />
                </div>
            ) : error ? (
                <div className="p-4 text-red-500 text-center">{error}</div>
            ) : blogs.length === 0 ? (
                <div className="p-4 text-center">No blogs found.</div>
            ) : (
                <>
                    <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                        {blogs.map((blog) => {
                            const imageBlock = blog.contentBlocks.find((block) => block.type === "image");
                            const paragraphBlock = blog.contentBlocks.find((block) => block.type === "paragraph");

                            return (
                                <div
                                    key={blog.id}
                                    className="w-full xs:w-[22rem] md:w-full mx-auto flex flex-col gap-4 border border-[#A69F9F] rounded-xl p-2"
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
                                        <h3 className="text-xl leading-none line-clamp-1">{blog.title}</h3>
                                        <p className="text-xs text-gray-600 line-clamp-2">
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
                                                className="bg-[#eb1f1f] w-fit p-2 rounded-full flex items-center justify-center text-white"
                                            >
                                                <Trash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

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
                </>
            )}
        </div>
    );
};

export default ViewAllBlogs;
