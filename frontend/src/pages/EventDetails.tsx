import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../redux/slices/event/eventSlice";

import Navbar from "../components/Navbar"
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { Share2 } from "lucide-react";

const EventDetails = () => {
    const [searchParams] = useSearchParams();
    const upcoming = searchParams.get("upcoming");
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: event, loading, error } = useSelector((state: any) => state.event);

    const location = useLocation();

    const handleShareClick = () => {
        const fullUrl = `${window.location.origin}${location.pathname}`;
        navigator.clipboard.writeText(fullUrl)
            .then(() => {
                toast.success("Link copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy link.");
            });
    };

    useEffect(() => {
        //@ts-ignore
        if (id) dispatch(fetchEventById(id));
    }, [id]);

    const isUpcoming = upcoming && new Date(upcoming) > new Date();

    if (loading) return <Loader />
    if (error) return <p className="text-center py-10 text-red-600">Error occured</p>;
    if (!event) return null;

    return (
        <div className="max-w-[100em] mx-auto">
            <div>
                <Navbar />
            </div>
            <div className="w-full pt-24 md:pt-10 pb-10 px-6 md:px-[1.5rem] lg:px-[8rem] xl:px-[12rem] font-inter">
                {/* event image */}
                <div
                    className="h-[13rem] xs:h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[30rem] bg-no-repeat bg-cover bg-center rounded-lg flex flex-col overflow-hidden relative transition-all duration-500 border border-gray-300"
                    style={{
                        backgroundImage: `url(${event.heroImageUrl})`,
                        backgroundPosition: "center top",
                    }}
                >

                    <div className="w-[220px] h-[220px] absolute top-0 right-0">
                        <div className={`w-[280px] h-[35px] rotate-[45deg] flex items-center justify-center ${isUpcoming ? "bg-[#2AB72F]" : "bg-[#b73f2a]"}`}>
                            <h2 className="text-white text-center pl-20 leading-none">{isUpcoming ? "UPCOMING" : "PAST"}</h2>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 sm:justify-between">
                    <div className="flex items-center gap-4 flex-wrap">
                        <BgColorComponent locationName={event.city} bgColor="bg-purple-200" textColor="text-purple-900" />
                        <BgColorComponent locationName={event.state} bgColor="bg-pink-200" textColor="text-pink-900" />
                        <BgColorComponent locationName={new Date(event.date).toDateString()} bgColor="bg-blue-200" textColor="text-blue-900" />
                        <BgColorComponent locationName={event.timing} bgColor="bg-blue-200" textColor="text-blue-900" />

                    </div>
                    <div className="flex items-center gap-4">
                        <a href={event.registerLink} target="_blank" rel="noopener noreferrer">
                            <button className={`w-full md:w-fit px-4 py-2 md:py-[2px] rounded-full bg-gray-800 text-white`}>
                                Register Now
                            </button>
                        </a>
                        <h3 onClick={handleShareClick}
                            className="text-left leading-none sm:text-lg flex items-center gap-2 font-playfair italic font-medium cursor-pointer"
                        >
                            Share: <span><Share2 className="w-5 h-5" /></span>
                        </h3>
                    </div>
                </div>

                {/* title & paragraph */}
                <div className="mt-8 sm:mt-14">
                    <h2 className="text-xl sm:text-2xl mb-2 font-semibold">{event.name}</h2>
                    <p className="sm:text-lg font-light">{event.shortDesc}</p>

                </div>

                {/* speakers */}
                <div className="mt-8 sm:mt-14">
                    {event.speakers.length > 0 && (
                        <div className="mt-8 sm:mt-14">
                            <h2 className="font-playfair text-2xl italic font-medium text-center mb-8">Speakers</h2>
                            <div className="w-full flex items-center justify-center flex-wrap gap-6 sm:gap-10">
                                {event.speakers.map((speaker: any) => (
                                    <SpeakerComponent
                                        key={speaker.id}
                                        imgSrc={speaker.imageUrl}
                                        name={speaker.name}
                                        designation={speaker.role}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* venue and why attend */}
                <div className="mt-8 sm:mt-14 grid md:grid-cols-2 gap-4">
                    {event.venue && (
                        <div className="w-full p-4 border border-[#747474] rounded-lg">
                            <h2 className="font-playfair text-2xl italic font-medium text-center mb-4">Venue</h2>
                            <div className="flex flex-col gap-3">
                                <PointComponent point={event.venue.address} />
                                {event.venue.landmark && <PointComponent point={event.venue.landmark} />}
                            </div>
                            <a href={event.venue.googleMapUrl} target="_blank" rel="noopener noreferrer">
                                <button className="w-full py-2 px-4 mt-4 bg-black text-white rounded-full">
                                    View on Google Maps
                                </button>
                            </a>
                        </div>
                    )}


                    {event?.whyAttend?.length > 0 && (
                        <div className="w-full p-4 border border-[#747474] rounded-lg">
                            <h2 className="font-playfair text-2xl italic font-medium text-center mb-4">Why Attend!</h2>
                            <div className="flex flex-col gap-3">
                                {
                                    event.whyAttend.map((point: string, idx: number) => (
                                        <PointComponent key={idx} point={point} />
                                    ))
                                }
                            </div>
                        </div>
                    )}

                </div>

                {/* socials */}
                {/* <div className="mt-8 sm:mt-14">
                    <h2 className="text-center">Follow us on LinkedIn | Twitter | Instagram</h2>
                </div> */}

            </div>

            <Footer />
        </div>
    )
}



export function PointComponent({ point }: { point: string }) {
    return (
        <div className="w-full flex items-center gap-3">
            <div className="min-w-3 min-h-3 bg-black rounded-full"></div>
            <p className="text-lgleading-none"> {point}</p>
        </div>
    )
}

export function SpeakerComponent({ imgSrc, name, designation }: { imgSrc: any, name: any, designation: any }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden bg-black">
                <img src={imgSrc} alt="speaker image" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-medium mt-3">{name}</h2>
            <h2 className="text-base font-medium text-[#595959]">{designation}</h2>
        </div>
    )
}

export function BgColorComponent({ locationName, bgColor, textColor }: { locationName: string, bgColor: any, textColor: any }) {
    return (
        <div className={`w-fit px-4 py-[2px] rounded-full ${bgColor} ${textColor}`}>
            {locationName}
        </div>
    )
}

export default EventDetails