import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../../../redux/slices/event/allEventsSlice";
import { FiSearch } from "react-icons/fi";
import EventCardAdmin from "../../components/EventCardAdmin";
import Loader from "../../../components/Loader";

const VIewAllEvents = () => {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state: any) => state.events);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchAllEvents() as any);
    }, [dispatch]);

    const filteredEvents = events.filter((event: any) =>
        event.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full font-inter">
            <div className="w-full flex flex-col gap-4 sm:flex-row items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-center">All Events</h2>
                <div className="w-full sm:w-fit relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm !outline-none"
                    />
                    <FiSearch className="absolute right-4 top-2.5 text-gray-500 cursor-pointer" />
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <p className="text-red-600">Error occurred</p>
            ) : (
                <div className="w-full md:space-y-0 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event: any, index: number) => (
                            <EventCardAdmin
                                key={index}
                                {...event}
                                buttonColor="bg-green-700"
                                borderColor="border-green-200"
                                upcoming={event.date.split("T")[0]}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">No events found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default VIewAllEvents;
