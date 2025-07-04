import twitter from "../assets/icons/twitter.png"
import instagram from "../assets/icons/instagram.png"
import facebook from "../assets/icons/facebook.png"
import linkedIn from "../assets/icons/linkedin.png"

const Footer = () => {
    return (
        <div className="w-full pb-4 pt-[4rem] sm:pt-[3.5rem] px-8 xs:px-[5rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter flex flex-col gap-20 sm:gap-40 bg-[#d6d6d6]">
            <div>
                <h2 className="text-[2rem]">Kakud</h2>
                <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
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
                        <div className="flex items-center sm:items-start gap-3 md:grid grid-cols-4">
                            <a href="">
                                <img src={twitter} alt="twitter" className="w-8" />
                            </a>
                            <a href="">
                                <img src={facebook} alt="facebook" className="w-8" />
                            </a>
                            <a href="">
                                <img src={instagram} alt="instagram" className="w-8" />
                            </a>
                            <a href="">
                                <img src={linkedIn} alt="linkedIn" className="w-8" />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 lg:pl-10">
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