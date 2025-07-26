const SectionHeading = ({ heading, subHeading }: { heading: any, subHeading: any }) => {
    return (
        <div className="pb-8 sm:pb-12 flex flex-col gap-2 leading-none">
            <h2 className="text-3xl sm:text-[2.5rem]">{heading}</h2>
            <h3 className="text-[#1E1E1E] sm:text-lg">
                {subHeading}
            </h3>
        </div>
    )
}

export default SectionHeading