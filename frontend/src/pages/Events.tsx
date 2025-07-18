import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { fetchAllEvents } from "../redux/slices/event/allEventsSlice";
import Loader from "../components/Loader";

const Events = () => {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state: any) => state.events);

    const [showUpcoming, setShowUpcoming] = useState(true);

    useEffect(() => {
        dispatch(fetchAllEvents() as any);
    }, [dispatch]);

    const today = new Date();
    const upcomingEvents = events?.filter((event: any) => new Date(event.date) >= today);
    const pastEvents = events?.filter((event: any) => new Date(event.date) < today);

    return (
        <div>
            <div className="pb-16 md:pb-28">
                <Navbar />
            </div>

            <div className="w-full px-6 pb-10 md:px-[1.5rem] lg:px-[4rem] xl:px-[6rem] font-inter">
                {/* Toggle Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setShowUpcoming(true)}
                    >
                        <h2 className={`w-fit text-center text-xl mx-auto mt-4 mb-8 px-4 py-1 rounded-full ${showUpcoming ? "bg-green-300" : "bg-green-100 hover:bg-green-300"} }`}>Upcoming <span className="font-playfair italic font-medium">Events</span></h2>

                    </button>
                    <button
                        onClick={() => setShowUpcoming(false)}

                    >
                        <h2 className={`w-fit text-center text-xl mx-auto mt-4 mb-8 px-4 py-1 rounded-full ${showUpcoming ? "bg-orange-100 hover:bg-orange-300" : "bg-orange-300"}`}>Past <span className="font-playfair italic font-medium">Events</span></h2>

                    </button>
                </div>

                {/* Loader and Error */}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p className="text-red-600">Error occurred</p>
                ) : (
                    <div>
                        {/* Render Based on Toggle */}
                        {showUpcoming ? (
                            <>
                                <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                                    {upcomingEvents.map((event: any, index: number) => (
                                        <EventCard
                                            key={index}
                                            {...event}
                                            upcoming={true}
                                            buttonColor="bg-green-700"
                                            borderColor="border-green-200"
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                                    {pastEvents.map((event: any, index: number) => (
                                        <EventCard
                                            key={index}
                                            {...event}
                                            upcoming={false}
                                            buttonColor="bg-orange-700"
                                            borderColor="border-orange-200"
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
