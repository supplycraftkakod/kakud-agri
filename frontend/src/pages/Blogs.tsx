import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

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

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const limit = 9;

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on new search
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/admin/all?page=${page}&limit=${limit}&search=${debouncedSearch}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      setBlogs(data.blogs);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, debouncedSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div>
      <div className="pb-16 md:pb-28">
        <Navbar />
      </div>

      <div className="w-full px-6 pb-10 md:px-[1.5rem] lg:px-[4rem] xl:px-[6rem] font-inter">
        <div className="flex gap-4 flex-col md:flex-row items-stretch justify-between mt-4 mb-8">
          <BlogsHeadingComponent
            headingName="Kakud Agri"
            bgColor="bg-green-100"
            textColor="text-green-900"
          />
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search the blog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm !outline-none"
            />
            <FiSearch className="absolute right-4 top-2.5 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center">No blogs found.</p>
        ) : (
          <>
            <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {blogs.map((blog) => {
                const imageBlock = blog.contentBlocks.find((b) => b.type === "image");
                const paragraphBlock = blog.contentBlocks.find((b) => b.type === "paragraph");

                return (
                  <div
                    key={blog.id}
                    className="w-full xs:w-[22rem] md:w-full mx-auto flex flex-col gap-6 border border-[#A69F9F] rounded-xl p-4"
                  >
                    <div
                      className="w-full xs:w-[20rem] sm:w-full object-cover object-center bg-no-repeat h-[10.75rem] rounded-xl mx-auto"
                      style={{
                        backgroundImage: `url(${imageBlock?.value || "/fallback.jpg"})`,
                        backgroundPosition: "center top",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl leading-none">{blog.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {paragraphBlock?.value || "No description available."}
                      </p>

                      <Link to={`/blogs/${blog.id}`}>
                        <button className="w-full py-2 rounded-full bg-gray-900 text-white">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-4 text-sm font-medium">
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
    </div>
  );
};

function BlogsHeadingComponent({
  headingName,
  bgColor,
  textColor,
}: {
  headingName: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <h2
      className={`w-fit text-center mx-auto md:mx-0 text-2xl px-4 py-1 rounded-full ${bgColor} ${textColor}`}
    >
      {headingName} <span className="font-playfair italic font-medium">Blogs</span>
    </h2>
  );
}

export default Blogs;
