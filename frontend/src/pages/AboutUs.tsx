import { useEffect, useState } from "react";
import heroImg from "../assets/images/about-hero.png"
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
    <div className="font-inter">
      <section className="w-full min-h-screen bg-no-repeat bg-cover flex flex-col overflow-hidden relative transition-all duration-500"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundPosition: isDesktop ? "center top" : "center top",
        }}>
        <Navbar />

        <div className="w-full absolute inset-0 flex flex-col justify-center items-center px-10 text-white md:text-black">
          <h1 className="text-4xl text-center max-w-5xl">
            Empowering <span className="font-playfair italic font-bold">Farmers</span> Through <span className="font-playfair italic font-bold">Innovation</span> and Sustainability
          </h1>
          <p className="text-xl mt-4 text-center">
            An Agri-Tech Brand by Kakud Post Harvest Pvt. Ltd.
          </p>

          <ScrollLink
            to="explore-our-vision"
            smooth={true}
            duration={500}
          >
            <button className="mt-6 px-8 py-3 rounded-full bg-white/20 border border-white/30 hover:bg-white/30 transition-all">
              Explore Our Vision
            </button>
          </ScrollLink>
        </div>
      </section>

      {/* About Section */}
      <div
        id="explore-our-vision"
        className="w-full py-10 pt-16 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]"
      >
        <div className="block sm:hidden">
          <h2 className="text-4xl mb-8 text-center font-playfair">About Kakud Agri</h2>

          <p className="sm:text-lg mb-6 text-gray-900">
            <strong>Kakud Agri,</strong> a brand of
            <strong> Kakud Post Harvest Pvt. Ltd.</strong>,
            is a <strong>science and technology-driven agri-tech company</strong> committed to transforming agriculture through
            <strong> innovation, sustainability, and community empowerment.</strong> We were established with a clear purpose: to build a sustainable agricultural
            ecosystem where farmers can access everything they need, <strong>quality products, expert advice, and reliable services—all under one roof.</strong>
          </p>

          <p className="sm:text-lg mb-6 text-gray-900">
            We <strong>manufacture and supply agrochemicals, fertilizers, and agricultural machinery</strong> using
            cutting-edge technology to help farmers grow healthy, high-yielding crops. Our solutions are designed
            not just for productivity, but also to promote <strong>sustainable practices</strong> that protect natural
            resources and support long-term food security.
          </p>

          <p className="sm:text-lg mb-6 text-gray-900">
            Our network of exclusive retail <strong>franchise stores</strong> provides farmers with easy access to premium
            agricultural inputs. In addition, our <strong>state-of-the-art Agriculture Consultation Centre</strong> offers expert guidance
            and practical solutions to address challenges across the farming lifecycle—from soil to harvest.
          </p>

          <p className="sm:text-lg mb-6 text-gray-900">
            At Kakud Agri, we believe that <strong>empowered farmers build healthier communities and a stronger planet.</strong>
            That’s why we are focused on enabling them with the right tools, knowledge, and support
            needed to thrive in a competitive agricultural environment.
          </p>

          <p className="sm:text-lg text-gray-900">
            <strong>Headquartered in Hubli, India</strong>, we are an <strong>emerging global agri-tech leader</strong>, with a bold vision to
            expand our footprint to <strong>over 90 countries in the next 10 years.</strong>
          </p>
        </div>


        <div className="hidden sm:block">
          <h2 className="text-4xl mb-8 sm:text-center font-playfair">About Kakud Agri</h2>
          <p className="sm:text-lg mb-6 text-gray-900 ">
            <span className="inline-block bg-purple-100 text-purple-900 rounded-full px-3 py-[2px] mr-2">Kakud Agri</span> a brand of
            <span className=" inline-block bg-purple-100 text-purple-900 rounded-full px-3 py-[2px] mx-2">Kakud Post Harvest Pvt. Ltd.</span>
            is a <strong>science and technology-driven agri-tech company</strong> committed to transforming agriculture through
            <strong> innovation, sustainability, and community empowerment.</strong> We were established with a clear purpose: to build a sustainable agricultural
            ecosystem where farmers can access everything they need, <strong>quality products, expert advice, and
              reliable services—all under one roof.</strong>
          </p>
          <p className="sm:text-lg mb-6 text-gray-900">
            We <strong>manufacture and supply</strong> <span className="inline-block bg-green-100 text-green-900 rounded-full px-3 py-[2px] mx-2">agrochemicals</span>
            <span className="inline-block bg-green-100 text-green-900 rounded-full px-3 py-[2px] mx-2">fertilizers</span>
            and <span className="inline-block bg-green-100 text-green-900 rounded-full px-3 py-[2px] mx-2">agricultural machinery</span> using
            cutting-edge technology to help farmers grow healthy, high-yielding crops. Our solutions are designed
            not just for productivity, but also to promote <strong></strong> that protect natural
            resources and support long-term food security.
          </p>
          <p className="sm:text-lg mb-6 text-gray-900">Our network of exclusive retail
            <span className=" inline-block bg-purple-100 text-purple-900 rounded-full px-3 py-[2px] mx-2">franchise stores</span> provides farmers with easy access to premium
            agricultural inputs. In addition, our <strong>state-of-the-art Agriculture Consultation Centre</strong> offers expert guidance
            and practical solutions to address challenges across the farming lifecycle—from soil to harvest.
          </p>
          <p className="sm:text-lg mb-6 text-gray-900">
            At Kakud Agri, we believe that <strong>empowered farmers build healthier communities and a stronger
              planet.</strong> That’s why we are focused on enabling them with the right tools, knowledge, and support
            needed to thrive in a competitive agricultural environment.
          </p>
          <p className="sm:text-lg text-gray-900">
            <span className=" inline-block bg-purple-100 text-purple-900 rounded-full px-3 py-[2px] mr-2">Headquartered in Hubli, India</span> we are an <strong>emerging global agri-tech leader</strong>, with a bold vision to
            expand our footprint to <strong>over 90 countries in the next 10 years.</strong>
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-10 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
        <h2 className="text-4xl font-playfair text-center mb-8">Vision & Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-6 rounded-lg bg-gradient-to-br from-green-100 via-green-200 to-green-300">
            <h3 className="text-2xl text-center mb-2">Our Vision</h3>
            <p className="sm:text-lg text-center font-light">
              To revolutionize agriculture through innovation, sustainability, and community
              empowerment, creating a future where farmers thrive, agricultural practices are efficient, and
              productivity is maximized through cutting-edge solutions.
            </p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
            <h3 className="text-2xl text-center mb-2">Our Mission</h3>
            <p className="sm:text-lg text-center font-light">
              To empower farmers with innovative agri-input solutions, expert guidance, and a connected
              community, driving sustainable practices, improved productivity, and enriched soil health.
            </p>
          </div>


        </div>
      </section>
      <section className="py-10 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
        <h2 className="text-center text-4xl font-playfair mb-8">Our Offerings</h2>

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
        <h2 className="text-4xl text-center font-playfair mb-8">Our Core Values</h2>
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