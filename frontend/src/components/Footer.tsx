
const Footer = () => {
    return (
        <div className="w-full pb-4 pt-[4rem] sm:pt-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter flex flex-col gap-20 sm:gap-40 bg-[#C5C5C5]">
            <div>
                <h2 className="text-[2rem]">Kakud</h2>
                <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
                    <div>
                        <h4 >Tel: 123-456-7890</h4>
                        <h4 >Email: info@kakudagri.in</h4>
                        <h4 >kakud Address</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-y-14">
                        <div>
                            <h4 >Contact Us</h4>
                            <h4 >About Us</h4>
                        </div>
                        <div>
                            {/* social */}
                            <h4 >Contact Us</h4>
                            <h4 >About Us</h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-center">Subscribe to our newsletter</h4>
                        <input placeholder="Email" type="email" name="email" id="email"
                            className="!outline-none px-4 p-2 rounded-full bg-[#f0f0f0]"
                        />
                        <button className="w-fit px-4 p-1 bg-[#272727] text-white rounded-full self-end">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <h5>© 2025 Kakud Post Harvest Private Limited</h5>
            </div>
        </div>
    )
}

export default Footer