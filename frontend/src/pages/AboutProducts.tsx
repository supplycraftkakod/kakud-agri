import { useEffect, useState } from "react";
import aboutProductsImg from "../assets/images/products-page/product-hero.png"
import seedImg from "../assets/images/products-page/seed.png"
import fertilizerImg from "../assets/images/products-page/fertilizer.png"
import Navbar from "../components/Navbar";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const productRange = [
    {
        title: "Seeds",
        description: "High-yielding, disease-resistant varieties.",
        imgSrc: seedImg,
    },
    {
        title: "Fertilizers",
        description: "Organic and chemical options for balanced crop nutrition.",
        imgSrc: fertilizerImg,
    },
    {
        title: "Pesticides & Herbicides",
        description: "Effective pest and weed control solutions.",
        imgSrc: seedImg,
    },
    {
        title: "Farm Equipment",
        description: "Modern tools and machinery to enhance farming efficiency.",
        imgSrc: seedImg,
    },
    {
        title: "Growth Enhancers",
        description: "Bio-stimulants and plant growth regulators.",
        imgSrc: seedImg,
    },
];

const categories = [
    "Insecticides",
    "Fungicides",
    "Herbicides",
    "Plant Growth Regulators (PGRs)",
    "Micronutrients",
    "Organic Fertilizers",
    "Complex Fertilizers",
    "Seeds",
    "Soil Conditioners",
    "Adjuvants & Spreaders",
];

export default function AboutProducts() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="min-h-screen font-inter">

            <section
                className="relative w-full min-h-screen bg-no-repeat bg-cover flex flex-col overflow-hidden transition-all duration-500"
            >
                <div
                    className="absolute inset-0 "
                    style={{
                        backgroundImage: `url(${aboutProductsImg})`,
                        backgroundPosition: isDesktop ? "center -2rem" : "center top",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        zIndex: 0,
                    }}
                ></div>
                <div className="absolute inset-0 bg-black/50"></div>
                <Navbar />

                <div className="w-full absolute top-24 md:top-32 flex flex-col gap-4 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] text-white">
                    {/* <h1 className="text-[5.5vw] sm:text-4xl font-light tracking-wide leading-none backdrop-blur-md bg-white/40 bg-opacity-90 border border-gray-400 w-fit px-4 sm:px-8 py-3 rounded-full">
                        Agricultural Input Products.
                    </h1> */}
                    <h1 className="text-2xl sm:text-5xl">
                        Agricultural Input Products.
                    </h1>
                    <p className="sm:text-xl font-light tracking-wider max-w-2xl">
                        We offer a wide range of high-quality agricultural inputs through our exclusive retail franchise stores.
                    </p>
                    <Link to={"/products"}>
                        <button className="w-fit text-lg p-3 px-5 rounded-full border lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg hover:bg-white/30 transition-all">
                            Explore Products
                        </button>
                    </Link>
                </div>

                <div className="max-w-2xl absolute bottom-8 right-0 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] text-white flex items-start gap-4">
                    <a href="#product-range">
                        <button className="text-lg sm:text-xl p-4 rounded-full border lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg hover:bg-white/30 transition-all">
                            <ArrowDown />
                        </button>
                    </a>
                    <p className="sm:text-xl font-light tracking-wider ">
                        Our franchise network ensures that farmers can easily access these products at competitive prices
                        while receiving expert advice on their application and usage.
                    </p>
                </div>
            </section>

            {/* Product Range */}
            <div
                id="product-range"
                className="px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] py-10">
                <h2 className="text-2xl sm:text-3xl font-light mb-10">
                    Our product range includes:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8">
                    {productRange.map((product, idx) => (
                        <div
                            key={idx}
                            className="w-[70%] mx-auto sm:w-full bg-gray-50 border border-gray-200 rounded-lg p-4"
                        >
                            <img src={product.imgSrc} alt={product.imgSrc} className="w-[150px] xs:w-[200px] sm:w-full p-4 mb-4 mx-auto" />
                            <h2 className="sm:text-xl  mb-2">{product.title}</h2>
                            <p className="text-sm text-gray-600">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Categories */}
            <div
                className="px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] py-10">

                <div className="">
                    <h2 className="text-2xl sm:text-3xl font-light mb-10">
                        Product Categories:
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {categories.map((cat, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                            >
                                {idx < 9 ? (
                                    <div>
                                        <h4 className="text-gray-600">0{idx + 1}</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="text-gray-600">{idx + 1}</h4>
                                    </div>
                                )}
                                <h3 className="sm:text-xl">{cat}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* CTA */}
            <div
                className="px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] py-10"
            >
                <div className="text-center">
                    <Link to={"/products"}>
                        <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full">
                            Explore All Products
                        </button>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}
