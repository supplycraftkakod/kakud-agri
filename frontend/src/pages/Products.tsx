import { useEffect, useState } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import ProductsSidebar from "../components/ProductsSidebar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { fetchProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const PRODUCTS_PER_PAGE = 8;

const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, totalPages, loading } = useSelector((state: RootState) => state.products);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts({ page, limit: PRODUCTS_PER_PAGE, search }));
    }, [page, search, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // reset to page 1
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <div className="pb-16 md:pb-28">
                <Navbar />
            </div>

            <div className="w-full px-6 pb-10 md:px-[1.5rem] lg:px-[2rem]">
                <div className="hidden sm:block sm:text-[2rem] md:text-[2.5rem] py-8 text-center">
                    <h2>
                        <span className="font-playfair italic font-semibold">Protect your crop</span> before it's too late.
                    </h2>
                </div>
                <div className="sm:hidden text-[2rem] xs:text-[3rem] py-8 flex flex-col items-center justify-center">
                    <h2 className="font-playfair italic font-semibold ">Protect your crop</h2>
                    <h2 className="leading-none"> before it's too late.</h2>
                </div>

                <div className="font-inter bg-white flex flex-col md:flex-row px-4 sm:px-8">
                    {/* Sidebar */}
                    <ProductsSidebar />

                    {/* Product Grid */}
                    <main className="w-full flex-1 py-6 md:pl-10">
                        {/* Search bar */}
                        <div className="mb-6 relative">
                            <input
                                type="text"
                                placeholder="Search the product"
                                value={search}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm !outline-none"
                            />
                            <FiSearch className="absolute right-4 top-2.5 text-gray-500 cursor-pointer" />
                        </div>

                        {/* Loader or Not Found */}
                        {loading ? (
                            <div className="w-full flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center text-lg">No products found.</div>
                        ) : (
                            <>
                                {/* Product cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-2">
                                    {products.map((product, index) => (
                                        <div
                                            key={product.id || index}
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
                                        >
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-auto object-contain mb-4"
                                            />
                                            <div className="flex flex-col gap-2 leading-none">
                                                <h3 className="font-medium text-xl">{product.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {product.description.split(" ").slice(0, 6).join(" ")}...
                                                </p>
                                                <Link to={`/products/${product.id}`}>
                                                    <button className="w-full py-2 rounded bg-[#338735] text-white">View</button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
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
                            </>
                        )}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Products;
