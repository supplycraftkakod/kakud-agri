import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchProducts } from "../../redux/slices/productSlice";
import { Trash2 } from "lucide-react";
import { BE_URL } from "../../../config";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      toast.loading("Deleting..")
      await axios.delete(`${BE_URL}/api/v1/admin/products/${id}`);
      toast.success("Product deleted successfully");
      // Optionally refresh product list here
      // fetchAllProducts(); // or setProducts(...) etc.
      dispatch(fetchProducts({ page, limit: PRODUCTS_PER_PAGE, search }));
    } catch (error) {
      toast.error("Failed to delete the product.");
    }
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
            <div className="w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-lg">No products found..</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-[#A69F9F] flex flex-col justify-between rounded-lg p-4 hover:shadow-sm transition"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto object-contain mb-4"
                  />
                  <div className="flex justify-between flex-col gap-2 leading-none">
                    <div>
                      <h3 className="font-medium text-xl">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.description.split(" ").slice(0, 3).join(" ")}...
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Link to={`/admin/products/${product.id}/edit`}
                        className="w-full py-3 bg-[#338735] rounded-full"
                      >
                        <button className="w-full text-white">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-[#eb1f1f] w-fit p-2 rounded-full flex items-center justify-center text-white">
                        <Trash2 />
                      </button>
                    </div>
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
