import { useEffect, useState } from "react";
import heroImg from "../assets/images/hero-bg-1.png"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

import agrochemicalsImg from "../assets/images/about-us/Agrochemicals.png"
import fertilizersImg from "../assets/images/about-us/Fertilizers.png"
import machineryImg from "../assets/images/about-us/Machinery.png"
import consultationImg from "../assets/images/about-us/Consultation.png"
import storeImg from "../assets/images/about-us/Stores.png"
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Link as ScrollLink } from "react-scroll"

const cardWidth = 272;

const AboutUs = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  const offerings = [
    {
      title: 'Agrochemicals',
      desc: 'High-quality crop protection solutions.',
      imgSrc: agrochemicalsImg,
    },
    {
      title: 'Fertilizers',
      desc: 'Balanced nutrition for healthy crop.',
      imgSrc: fertilizersImg,
    },
    {
      title: 'Agricultural Machinery',
      desc: 'Efficient tools for modern farming.',
      imgSrc: machineryImg,
    },
    {
      title: 'Expert Consultation',
      desc: 'Guidance across the farming lifecycle.',
      imgSrc: consultationImg,
    },
    {
      title: 'Retail Franchise Stores',
      desc: 'Premium inputs available locally.',
      imgSrc: storeImg,
    },
  ];

  const coreValues = [
    { title: 'Farmer-Centric', desc: 'Farmers first in every decision we make.' },
    { title: 'Integrity', desc: 'Honest, fair, and transparent practices.' },
    { title: 'Innovation', desc: 'Constant improvement and excellence.' },
    { title: 'Knowledge Empowerment', desc: 'Educating and enabling informed choices.' },
    { title: 'Empathy', desc: 'Understanding and addressing real needs.' },
  ];


  useEffect(() => {
    const updateVisibleCount = () => {
      const containerWidth = window.innerWidth * 0.8;
      const count = Math.floor(containerWidth / cardWidth);
      setVisibleCount(Math.max(1, Math.min(count, offerings.length)));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, offerings.length - visibleCount));
  };

  return (
    <div className="max-w-[100em] mx-auto">
      <div
        className="min-h-screen 2xl:h-fit bg-no-repeat bg-cover flex flex-col overflow-hidden relative transition-all duration-1000 font-geist"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundPosition: "center bottom",
        }}
      >
        <Navbar />

        {/* HERO CONTENT */}
        <div className="my-auto md:my-0 md:pt-24 w-full flex flex-col items-center px-6 sm:px-8 md:pb-10  text-[#1d1d1d]">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="hidden md:block text-[8vw] xs:text-[2.5rem] md:text-[4rem] leading-none font-medium">Empowering <span className="font-playfair italic font-semibold text-[#449E08]">Farmers</span></h1>
            <h1 className="block md:hidden text-[10vw] xs:text-[3.5rem] leading-none font-medium">Empowering </h1>
            <h1 className="block md:hidden text-[15vw] xs:text-[5rem] tracking-wide leading-none text-[#449E08] font-semibold">Farmers</h1>
            <h1 className="text-center text-[6vw] xs:text-[2rem] md:text-[3rem] sm:leading-none  font-medium">Through Innovation and Sustainability</h1>
          </div>
          <p className="md:w-[40rem] text-center pt-4">We Provide advanced, reliable agrochemical solutions that enhance crop yield, protect the land, and support sustainable farming practices.</p>
          <div className="cta flex flex-col xs:flex-row gap-4 pt-8 items-center">
            <div className="w-[12rem] xs:w-fit p-[2px] text-center rounded-full bg-white shadow-sm inline-block">
              <ScrollLink
                to="explore-our-vision"
                smooth={true}
                duration={500}
              >
                <button
                  className="w-full px-6 py-2 sm:text-xl rounded-full bg-gradient-to-r from-[#449E08] via-[#7CBC52] to-[#449E08] text-white block"

                >
                  Explore Our Vision
                </button>
              </ScrollLink>
            </div>
          </div>
        </div>


      </div>

      {/* About Section */}
      <div
        id="explore-our-vision"
        className="w-full py-10 pt-16 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] "
      >
        <div className="">
          <h2 className="text-4xl mb-8 text-center">About Kakud Agri</h2>

          <p className="sm:text-lg mb-6 text-gray-900">
            <strong>Kakud Agri,</strong> a brand of
            <strong> Kakud Post Harvest Pvt. Ltd.</strong>,
            is a <strong>Science and technology-driven agri-tech company</strong> committed to transforming agriculture through
            <strong> Innovation, Sustainability, and Community Empowerment.</strong> We were established with a clear purpose: to build a sustainable agricultural
            ecosystem where farmers can access everything they need, <strong>Quality products, expert advice, and reliable services—all under one roof.</strong>
          </p>

          <p className="sm:text-lg mb-6 text-gray-900">
            We <strong>Manufacture and supply Agrochemicals, Fertilizers, and Agricultural machinery</strong> using
            cutting-edge technology to help farmers grow healthy, high-yielding crops. Our solutions are designed
            not just for productivity, but also to promote <strong>Sustainable practices</strong> that protect natural
            resources and support long-term food security.
          </p>

          <p className="sm:text-lg mb-6 text-gray-900">
            Our network of exclusive retail <strong>Franchise Stores</strong> provides farmers with easy access to premium
            agricultural inputs. In addition, our <strong>State-of-the-art Agriculture Consultation Centre</strong> offers expert guidance
            and practical solutions to address challenges across the farming lifecycle—from soil to harvest.
          </p>

          <p className="sm:text-lg mb-6 text-gray-900">
            At Kakud Agri, we believe that <strong>Empowered farmers build healthier communities and a stronger planet.</strong>
            That’s why we are focused on enabling them with the right tools, knowledge, and support
            needed to thrive in a competitive agricultural environment.
          </p>

          <p className="sm:text-lg text-gray-900">
            <strong>Headquartered in Hubli, India</strong>, we are an <strong>Emerging global agri-tech leader</strong>, with a bold vision to
            expand our footprint to <strong>Over 90 countries in the next 10 years.</strong>
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-10 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
        <h2 className="text-4xl text-center mb-8">Vision & Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-6 rounded-lg bg-gradient-to-br from-green-100 via-green-200 to-green-300">
            <h3 className="text-2xl text-center mb-2">Our Vision</h3>
            <p className="sm:text-lg text-center">
              To revolutionize agriculture through innovation, sustainability, and community
              empowerment, creating a future where farmers thrive, agricultural practices are efficient, and
              productivity is maximized through cutting-edge solutions.
            </p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
            <h3 className="text-2xl text-center mb-2">Our Mission</h3>
            <p className="sm:text-lg text-center">
              To empower farmers with innovative agri-input solutions, expert guidance, and a connected
              community, driving sustainable practices, improved productivity, and enriched soil health.
            </p>
          </div>


        </div>
      </section>
      <section className="py-10 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
        <h2 className="text-center text-4xl mb-8">Our Offerings</h2>

        {/* Desktop Carousel */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border hover:bg-gray-100 transition"
          >
            <ChevronLeft />
          </button>

          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${startIndex * cardWidth}px)` }}
            >
              {offerings.map((item, index) => (
                <div
                  key={index}
                  className="w-[16rem] h-[24rem] shrink-0 bg-gray-50 border border-gray-200 rounded-lg p-4 mx-1 bg-cover bg-top"
                  style={{
                    backgroundImage: `url(${item.imgSrc})`,
                  }}
                >
                  <h3 className="text-center text-xl border-b border-gray-500 w-fit mx-auto mb-1">
                    {item.title}
                  </h3>
                  <p className="text-center text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full border hover:bg-gray-100 transition"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Mobile Scrollable View */}
        <div className="md:hidden w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 w-max px-1 py-2 snap-x snap-mandatory">
            {offerings.map((item, index) => (
              <div
                key={index}
                className="w-[16rem] h-[24rem] shrink-0 bg-gray-50 border border-gray-200 rounded-lg p-4 mx-1 bg-cover bg-top"
                style={{
                  backgroundImage: `url(${item.imgSrc})`,
                }}
              >
                <h3 className="text-center text-xl border-b border-gray-500 w-fit mx-auto mb-1">
                  {item.title}
                </h3>
                <p className="text-center text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Core Values */}
      <section className="py-12 bg-white px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
        <h2 className="text-4xl text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((value, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-2xl shadow-sm border hover:border-gray-400 hover:shadow-md transition"
            >
              {/* <Leaf className="text-green-600" /> */}
              <h4 className="text-gray-700">0{i + 1}</h4>
              <h3 className="text-2xl  mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </div>

          ))}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="bg-[#F0FDF4] text-black py-20 px-6 text-center">
          <h2 className="text-3xl font-light">
            Join the Agri-Tech Revolution with Kakud Agri
          </h2>
          <p className="mt-4 mb-6 font-light">
            Together, we can create a future of sustainable farming and empowered
            communities.
          </p>
        </section> */}
      <Footer
        heading="Join the Agri-Tech Revolution with Kakud Agri"
        subHeading="Together, we can create a future of sustainable farming and empowered communities." />

    </div>
  );
};

export default AboutUs;