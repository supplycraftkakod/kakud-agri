import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import EventHeadingComponent from "../components/EventHeadingComponent";
import { fetchAllEvents } from "../redux/slices/event/allEventsSlice";

const Events = () => {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state: any) => state.events);    

    useEffect(() => {
        dispatch(fetchAllEvents() as any);
    }, [dispatch]);

    // Divide events by date (assuming event.date exists)
    const today = new Date();
    const upcomingEvents = events?.filter((event: any) => new Date(event.date) >= today);
    const pastEvents = events?.filter((event: any) => new Date(event.date) < today);

    return (
        <div>
            <div className="pb-16 md:pb-28">
                <Navbar />
            </div>

            <div className="w-full px-6 pb-10 md:px-[1.5rem] lg:px-[4rem] xl:px-[6rem] font-inter">
                <EventHeadingComponent headingName="Upcoming" bgColor="bg-green-100" textColor="text-green-900" />

                {loading ? (
                    <p>Loading events...</p>
                ) : error ? (
                    <p className="text-red-600">Error: {error}</p>
                ) : (
                    <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                        {upcomingEvents.map((event: any, index: number) => (
                            <EventCard
                                key={index}
                                {...event}
                                buttonColor="bg-green-700"
                                borderColor="border-green-200"
                            />
                        ))}
                    </div>
                )}

                <div className="mt-10">
                    <EventHeadingComponent headingName="Past" bgColor="bg-orange-100" textColor="text-orange-900" />
                </div>
                {loading ? (
                    <p>Loading past events...</p>
                ) : (
                    <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                        {pastEvents.map((event: any, index: number) => (
                            <EventCard
                                key={index}
                                {...event}
                                buttonColor="bg-orange-700"
                                borderColor="border-orange-200"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
