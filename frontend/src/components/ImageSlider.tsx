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
];

export default function ImageSlider() {
    const trackRef = useRef(null);
    const containerRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    // Update slide width on window resize
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                //@ts-ignore
                setSlideWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const slideTo = (newIndex: any) => {
        if (newIndex < 0 || newIndex >= images.length) return;

        gsap.to(trackRef.current, {
            x: -newIndex * slideWidth,
            duration: 0.5,
            ease: "power2.out",
        });

        setIndex(newIndex);
    };

    return (
        <div className="w-full h-[30rem] overflow-hidden relative">
            {/* Arrows */}
            <button
                onClick={() => slideTo(index - 1)}
                className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <div ref={containerRef} className="w-full h-full relative rounded-2xl overflow-hidden">
                <div ref={trackRef} className="flex h-full ">
                    {images.map((img, idx) => (
                        <div key={idx} className="w-full flex-shrink-0 h-full">
                            <img
                                src={img}
                                alt={`Slide ${idx}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => slideTo(index + 1)}
                className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slider */}

        </div>
    );
}
