import { Link } from "react-router-dom";

interface EventCardProps {
    id: string;
    heroImageUrl: string;
    city: string;
    state: string;
    name: string;
    shortDesc: string;
    buttonColor: string;
    borderColor: string;
    date: string;
    upcoming: boolean;
}

export default function EventCard({
    id,
    heroImageUrl,
    city,
    state,
    name,
    shortDesc,
    buttonColor,
    borderColor,
    date,
    upcoming,
}: EventCardProps) {

    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();

    const getOrdinal = (n: any) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formattedDate = `${getOrdinal(day)} ${month} ${year}`;

    return (
        <div className={`w-full xs:w-[22rem] md:w-full mx-auto flex flex-col gap-4 border ${borderColor} rounded-xl p-2`}>
            <div
                className="w-full xs:w-[20rem] sm:w-full h-[10.75rem] rounded-lg mx-auto bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${heroImageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center top",
                }}
            ></div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <LocationComponent locationName={city} bgColor="bg-purple-100" textColor="text-purple-900" />
                    <LocationComponent locationName={state} bgColor="bg-pink-100" textColor="text-pink-900" />
                    <LocationComponent locationName={formattedDate} bgColor="bg-pink-100" textColor="text-pink-900" />
                </div>
                <h3 className="text-2xl">{name}</h3>
                <p className="line-clamp-2">{shortDesc}</p>

                <Link to={`/events/${id}/?upcoming=${upcoming}`}>
                    <button className={`w-full py-2 rounded-full ${buttonColor} text-white hover:bg-gradient-to-r from-[#449E08] to-[#71b643]`}>View</button>
                </Link>
            </div>
        </div>
    );
}

export function LocationComponent({ locationName, bgColor, textColor }: { locationName: string, bgColor: any, textColor: any }) {
    return (
        <div className={`w-fit px-2 py-[1px] rounded-full ${bgColor} ${textColor}`}>
            {locationName}
        </div>
    )
}