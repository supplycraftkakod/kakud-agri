// import leftArow from "../assets/icons/left-arrow.png"
// import rihgtArow from "../assets/icons/right-arrow.png"

// const Testimonials = () => {
//     return (
//         <div className="w-full py-[2rem] sm:py-[3.5rem] font-inter bg-red-400">
//             <div className="w-full py-16 sm:h-[27rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] flex items-center justify-between bg-[#F6F6F6]">
//                 <img src={leftArow} alt="left" className="cursor-pointer" />

//                 {/* here */}
//                 <div className="px-6 sm:px-[5rem] lg:px-[10rem] xl:px-[15rem] flex flex-col items-center gap-8 bg-green-700">
//                     <div>
//                         <h3 className="text-2xl sm:text-[2rem] text-center leading-none">Anil Deshmukh</h3>
//                         <h4 className="text-xl sm:text-2xl text-[#505050] text-center">Karnataka</h4>
//                     </div>
//                     <p className="sm:text-xl text-center">
//                         “Partnering with Kakud Agri as a franchisee has been a game-changer for my business. The exclusive product range and support from the team have ensured steady growth.”
//                     </p>
//                 </div>

//                 <img src={rihgtArow} alt="right" className="cursor-pointer" />
//             </div>
//         </div>
//     )
// }

// export default Testimonials

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import leftArrow from "../assets/icons/left-arrow.png";
import rightArrow from "../assets/icons/right-arrow.png";

const testimonials = [
    {
        name: "Anil Deshmukh",
        location: "Karnataka",
        message:
            "Partnering with Kakud Agri as a franchisee has been a game-changer for my business. The exclusive product range and support from the team have ensured steady growth.",
    },
    {
        name: "Ramesh Patil",
        location: "Maharashtra",
        message:
            "Kakud Agri’s consultation service helped me improve my crop yield by 30% in just one season. Their expert advice and high-quality products made all the difference.",
    },
];

const slideVariants = {
    initial: (direction: any) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: (direction: any) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: "easeIn",
        },
    }),
};

const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="w-full pt-[2rem] sm:pt-[3.5rem] font-inter">
            <div className="w-full py-36 sm:h-[32rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] flex items-center justify-between bg-[#e2e2e2] overflow-hidden">
                <img
                    src={leftArrow}
                    alt="left"
                    className="cursor-pointer z-10"
                    onClick={handlePrev}
                />

                <div className="relative w-full flex justify-center items-center">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={index}
                            custom={direction}
                            //@ts-ignore
                            variants={slideVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute px-6 sm:px-[5rem] lg:px-[10rem] xl:px-[15rem] flex flex-col items-center gap-12 rounded-lg text-center"
                        >
                            <div>
                                <h3 className="text-xl sm:text-[2rem] leading-none">{testimonials[index].name}</h3>
                                <h4 className="text-lg sm:text-2xl text-[#505050]">{testimonials[index].location}</h4>
                            </div>
                            <p className="sm:text-xl font-light">
                                “{testimonials[index].message}”
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <img
                    src={rightArrow}
                    alt="right"
                    className="cursor-pointer z-10"
                    onClick={handleNext}
                />
            </div>
        </div>
    );
};

export default Testimonials;
