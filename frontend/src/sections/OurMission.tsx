import ourMissionImg from "../assets/images/our-mission.png"

const OurMission = () => {
    return (
        <div className="w-full pt-[5rem] sm:pt-[7rem] pb-[2rem] sm:pb-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter flex items-start justify-center bg-red-300">
            <div className="w-full bg-yellow-300 flex flex-col-reverse gap-y-6 lg:grid lg:grid-cols-2 gap-x-4">
                <div className="flex flex-col justify-between gap-6">
                    <div className="space-y-1 sm:space-y-0">
                        <h4 className="text-xl sm:text-2xl text-[#505050]">Our vision</h4>
                        <h2 className="text-2xl sm:text-[2rem] xl:text-[2.5rem] leading-none">Empowering Farmers Together</h2>
                    </div>
                    <div>
                        <p className="text-xl leading-[2rem] xl:text-2xl xl:leading-[2.2rem] font-light">
                            At our core, we strive to become an agricultural support partner by creating a reliable and
                            accessible platform for. We are dedicated to providing quality inputs and trusted consultation
                            services that empower farmers to thrive. With a focus on innovation and sustainability, we aim to
                            enhance productivity and foster growth within the agricultural community. Together, we can cultivate
                            a brighter future for farmers everywhere.
                        </p>
                    </div>
                </div>
                <div className="w-[95%] xs:w-[24rem] xs:h-[24rem] xl:w-[27.5rem] xl:h-[27.5rem] m-auto lg:mx-0 rounded-2xl overflow-hidden bg-green-200 justify-self-end">
                    <img src={ourMissionImg} alt="our mission" className="w-full h-full object-cover object-center"/>
                </div>
            </div>
        </div>
    )
}

export default OurMission