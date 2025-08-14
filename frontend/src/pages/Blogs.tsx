import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchBlogs, setPage, setSearch } from '../redux/slices/blog/blogSlice';
import { AppDispatch, RootState } from '../redux/store/store';

const Blogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState(""); // local state for category


  const { blogs, loading, error, page, totalPages, search } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchBlogs({ page, limit: 9, search, selectedCategory }));
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [page, search, selectedCategory]);

  return (
    <div className='max-w-[100em] mx-auto'>
      <div>
        <Navbar />
      </div>

      <div className="w-full pt-24 md:pt-10 px-6 pb-10 md:px-[1.5rem] lg:px-[4rem] xl:px-[6rem] font-inter">
        <div className="flex gap-4 flex-col md:flex-row items-stretch justify-between mt-4 mb-8">
          <BlogsHeadingComponent
            headingName="Kakud Agri"
            bgColor="bg-green-100"
            textColor="text-green-900"
          />
          <div className='flex flex-col md:flex-row justify-between gap-2'>
            <div className="font-light relative w-full">
              <select
                id="blog-category"
                name="blog-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full appearance-none px-4 py-2 border border-gray-300 rounded-full shadow-sm !outline-none "
              >
                <option value="" disabled>Select a category</option>
                <option value="expo">Expo Blog – Coverage from expos & agri summits</option>
                <option value="workshop">Workshop Blog – Field training & meetings</option>
                <option value="news">News Blog – Announcements & partnerships</option>
                <option value="crop-advisory">Crop Advisory – Seasonal guidance & tips</option>
                <option value="success-stories">Farmer Success Stories – Inspiring journeys</option>
                <option value="product-knowledge">Product Knowledge – Guides & comparisons</option>
                <option value="franchise">Franchise & Retail Insights – Business advice</option>
                <option value="sustainability">Sustainability & Innovation – Eco-friendly solutions</option>
                <option value="" className='text-red-700 bg-red-100 text-center'>Clear selection</option>
              </select>

              {/* Custom Arrow Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search the blog..."
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-full  !outline-none"
              />
              <FiSearch className="absolute right-4 top-3 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red-500">Error occred!</p>
        ) : blogs.length === 0 ? (
          <p className="text-center">No Blogs Found</p>
        ) : (
          <>
            <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {blogs.map((blog) => {
                const imageBlock = blog.contentBlocks.find((b) => b.type === 'image');
                const paragraphBlock = blog.contentBlocks.find((b) => b.type === 'paragraph');

                return (
                  <div
                    key={blog.id}
                    className="w-full xs:w-[22rem] md:w-full mx-auto flex flex-col gap-6 border border-[#A69F9F] rounded-xl p-2"
                  >
                    <div
                      className="w-full xs:w-[20rem] sm:w-full object-cover object-center bg-no-repeat h-[10.75rem] rounded-lg mx-auto"
                      style={{
                        backgroundImage: `url(${imageBlock?.value || '/fallback.jpg'})`,
                        backgroundPosition: 'center top',
                        backgroundSize: 'cover',
                      }}
                    ></div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl">{blog.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {paragraphBlock?.value || 'No description available.'}
                      </p>
                      <Link to={`/blogs/${blog.id}`}>
                        <button className="w-full py-2 rounded-full bg-gray-900 text-white hover:bg-gradient-to-r from-[#449E08] to-[#71b643]">
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
                  className={`cursor-pointer ${page === 1 ? 'text-gray-400' : ''}`}
                  onClick={() => dispatch(setPage(page - 1))}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <span
                    key={p}
                    className={`px-2 cursor-pointer ${p === page ? 'rounded-full bg-black text-white px-3 py-1' : ''
                      }`}
                    onClick={() => dispatch(setPage(p))}
                  >
                    {p}
                  </span>
                ))}
                <FiChevronRight
                  className={`cursor-pointer ${page === totalPages ? 'text-gray-400' : ''}`}
                  onClick={() => dispatch(setPage(page + 1))}
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
      className={`min-w-fit text-center mx-auto md:mx-0 text-2xl px-4 py-1 rounded-full ${bgColor} ${textColor}`}
    >
      {headingName} <span className="font-playfair italic font-medium">Blogs</span>
    </h2>
  );
}

export default Blogs;
