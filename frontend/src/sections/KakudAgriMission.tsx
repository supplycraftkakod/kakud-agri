import { useEffect, useState } from "react";
import bgImage from "../assets/images/kakud-agri-mission.png"

const KakudAgriMission = () => {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        handleResize(); // Run once on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full py-[2rem] sm:py-[3.5rem] font-inter">
            <div
                id="about"
                className="min-h-screen bg-no-repeat bg-cover flex flex-col overflow-hidden relative px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundPosition: isDesktop ? 'center -2rem' : 'center top',
                }}
            >
                <div className="my-auto flex flex-col items-center justify-center gap-6 sm:gap-4">
                    <h4 className="text-white sm:text-xl">KAKUD AGRI MISSION</h4>
                    <h2 className="text-[2rem] md:text-[4vw] leading-[2.5rem] md:leading-normal lg:text-[2.7rem] xl:text-[3rem] text-center text-white">Innovative Solutions for Sustainable Agriculture</h2>
                    <p className="text-base sm:text-xl font-light text-white text-center">
                        Kakud Agri (Kakud Post Harvest Pvt. Ltd.) adopts a different approach by leveraging
                        innovative methods and technologies to manufacture agricultural solutions. Our focus is on
                        sustainability, efficiency, and empowering farmers with the right tools and resources.
                    </p>
                    <button className="px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border lg:border-[#c5c5c5] flex items-center justify-center leading-none backdrop-blur-md bg-white/20  bg-opacity-90">
                        Discover More
                    </button>

                </div>
            </div>
        </div>
    )
}

export default KakudAgriMission