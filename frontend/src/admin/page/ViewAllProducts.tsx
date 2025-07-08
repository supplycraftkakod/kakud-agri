import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import productImg from "../../assets/images/AganImg.png"

const products = new Array(8).fill({
  title: "2,4-D Agan",
  description: "A selective systemic post emergence herbicide",
  image: productImg,
});

const ViewAllProducts = () => {
  return (
    <div>
      <div className="w-full">
        <div className="font-inter flex flex-col md:flex-row">
          {/* Product Grid */}
          <main className="w-full flex-1">
            {/* Product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="border border-[#A69F9F] rounded-lg p-4 hover:shadow-sm transition"
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
                      Edit
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
    </div>
  );
};

export default ViewAllProducts;
