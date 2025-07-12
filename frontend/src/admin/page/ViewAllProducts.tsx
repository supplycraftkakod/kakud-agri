import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchProducts } from "../../redux/slices/productSlice";

const PRODUCTS_PER_PAGE = 8;

const ViewAllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, totalPages, loading } = useSelector((state: RootState) => state.products);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: PRODUCTS_PER_PAGE, search }));
  }, [page, search, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="w-full">
      <div className="font-inter flex flex-col gap-6 md:flex-row">
        <main className="w-full flex-1">
          {/* Search bar */}
          <div className="mb-6 relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm !outline-none"
            />
            <FiSearch className="absolute right-4 top-2.5 text-gray-500 cursor-pointer" />
          </div>

          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-lg">No products found..</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-[#A69F9F] rounded-lg p-4 hover:shadow-sm transition"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto object-contain mb-4"
                  />
                  <div className="flex flex-col gap-2 leading-none">
                    <h3 className="font-medium text-xl">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {product.description.split(" ").slice(0, 3).join(" ")}...
                    </p>
                    <Link to={`/admin/products/${product.id}/edit`}>
                      <button className="w-full py-2 rounded bg-[#338735] text-white">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

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
        </main>
      </div>
    </div>
  );
};

export default ViewAllProducts;
