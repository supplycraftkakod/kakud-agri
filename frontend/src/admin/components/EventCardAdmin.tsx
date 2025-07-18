import { Link } from "react-router-dom";
import { LocationComponent } from "../../components/EventCard";

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
}

export default function EventCardAdmin({
    id,
    heroImageUrl,
    city,
    state,
    name,
    shortDesc,
    buttonColor,
    borderColor,
    date
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
        <div className={`w-full xs:w-[22rem] md:w-full mx-auto flex flex-col gap-3 border ${borderColor} rounded-xl p-4`}>
            <div
                className="w-full h-[10.75rem] sm:h-[8rem] xs:w-[20rem] sm:w-full rounded-xl mx-auto bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${heroImageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center top",
                }}
            ></div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center flex-wrap text-xs gap-2">
                    <LocationComponent locationName={city} bgColor="bg-purple-100" textColor="text-purple-900" />
                    <LocationComponent locationName={state} bgColor="bg-pink-100" textColor="text-pink-900" />
                    <LocationComponent locationName={formattedDate} bgColor="bg-pink-100" textColor="text-pink-900" />
                </div>
                <h3 className="text-xl line-clamp-2">{name}</h3>
                <p className="text-xs line-clamp-2">{shortDesc}</p>

                <div className="flex gap-2">
                    <Link to={`/events/${id}`}
                        className="w-full"
                    >
                        <button className={`w-full py-2 rounded-full ${buttonColor} text-white`}>View</button>
                    </Link>
                    {/* <button
                        // onClick={() => handleDelete(blog.id)}
                        className="bg-[#eb1f1f] w-fit p-2 rounded-full flex items-center justify-center text-white"
                    >
                        <Trash2 />
                    </button> */}
                </div>

            </div>
        </div>
    );
}