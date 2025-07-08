import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import productImg from "../assets/images/AganImg.png"
import ProductsSidebar from "../components/ProductsSidebar";
import Footer from "../components/Footer";

const products = new Array(9).fill({
    title: "2,4-D Agan",
    description: "A selective systemic post emergence herbicide",
    image: productImg,
});

const Products = () => {
    return (
        <div>
            <div className="pb-16 md:pb-28">
                <Navbar />
            </div>

            <div className="w-full px-6 pb-10 md:px-[1.5rem] lg:px-[2rem]">
                <div className="hidden sm:block sm:text-[2rem] md:text-[2.5rem] py-8 text-center">
                    <h2><span className="font-playfair italic font-semibold">Protect your crop</span> before it's too late.</h2>
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
                        <div className="mb-6 relative ">
                            <input
                                type="text"
                                placeholder="Search the product"
                                className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm !outline-none"
                            />
                            <FiSearch className="absolute right-4 top-2.5 text-gray-500 cursor-pointer" />
                        </div>

                        {/* Product cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-2">
                            {products.map((product, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-auto object-contain mb-4"
                                    />
                                    <div className="flex flex-col gap-2 leading-none">
                                        <h3 className="font-medium text-xl">{product.title}</h3>
                                        <p className="text-sm text-gray-600">{product.description}</p>
                                        <button className="w-full py-2 rounded bg-[#338735] text-white">
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center items-center gap-4 text-sm font-medium">
                            <FiChevronLeft className="cursor-pointer" />
                            <span className="rounded-full bg-black text-white px-3 py-1">1</span>
                            <span className="cursor-pointer px-2">2</span>
                            <span className="cursor-pointer">3</span>
                            <span className="text-gray-500">…</span>
                            <FiChevronRight className="cursor-pointer" />
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Products;
