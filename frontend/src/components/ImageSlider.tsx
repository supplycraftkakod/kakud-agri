import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import tempImg1 from "../assets/images/about-us/Agrochemicals.png"
import tempImg2 from "../assets/images/about-us/Consultation.png"
import tempImg3 from "../assets/images/about-us/Fertilizers.png"
import tempImg4 from "../assets/images/about-us/Machinery.png"

const images = [
    `${tempImg1}`,
    `${tempImg2}`,
    `${tempImg3}`,
    `${tempImg4}`,
    `${tempImg4}`,
];

export default function ImageSlider() {
    const trackRef = useRef(null);
    const containerRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                //@ts-ignore
                const width = containerRef.current.offsetWidth;

                let slidesPerView = 1;
                if (window.innerWidth >= 1024) {
                    slidesPerView = 3; // Desktop
                } else if (window.innerWidth >= 640) {
                    slidesPerView = 2; // Tablet
                } else {
                    slidesPerView = 1; // Mobile
                }

                const gap = 16; // matches Tailwind's gap-x-4 = 1rem = 16px
                const totalGap = gap * (slidesPerView - 1);
                setSlideWidth((width - totalGap) / slidesPerView);

            }
        };

        updateWidth();
        const resizeObserver = new ResizeObserver(updateWidth);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const slideTo = (newIndex: number) => {
        // Determine how many slides should be visible based on screen width
        const slidesPerView =
            window.innerWidth >= 1024 ? 3 :
                window.innerWidth >= 640 ? 2 : 1;

        const maxIndex = images.length - slidesPerView;

        // Prevent sliding out of bounds
        if (newIndex < 0 || newIndex > maxIndex) return;

        gsap.to(trackRef.current, {
            x: -newIndex * slideWidth,
            duration: 0.5,
            ease: "power2.out",
        });

        setIndex(newIndex);
    };


    return (
        <div>
            <div className="w-full h-[25rem] relative flex items-center px-1">
                {/* Left Arrow - moved outside */}
                <button
                    onClick={() => slideTo(index - 1)}
                    className="absolute left-[-3rem] z-10 border border-[#c0c0c0] bg-white p-2 rounded-full shadow"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Image Container */}
                <div ref={containerRef} className="w-full h-full relative rounded-2xl overflow-hidden">
                    <div ref={trackRef} className="flex h-full gap-x-4">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 h-full rounded-2xl overflow-hidden w-full   bg-no-repeat bg-cover bg-center"
                                style={{ width: `${slideWidth - 16}px` }} // assuming gap-x-4 = 16px
                            >
                                <img
                                    src={img}
                                    alt={`Slide ${idx}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow - moved outside */}
                <button
                    onClick={() => slideTo(index + 1)}
                    className="absolute right-[-3rem] z-10 border border-[#c0c0c0] bg-white p-2 rounded-full shadow"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

        </div>
    );
}
