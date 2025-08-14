
export default function EventHeadingComponent({ headingName, bgColor, textColor }: { headingName: string, bgColor: any, textColor: any }) {
    return (
        <h2 className={`w-fit text-center text-xl mx-auto mt-4 mb-8 px-4 py-1 rounded-full ${bgColor} ${textColor}`}>{headingName} <span className="font-playfair italic font-medium">Events</span></h2>
    )
}