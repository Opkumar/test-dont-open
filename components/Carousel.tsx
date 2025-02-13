"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getServices } from "@/app/actions/getServices";

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const services = await getServices();

      setCarouselItems(services);
    }
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,
    arrows: false,
  };

  return (
    <section className="pt-10 pb-20 bg-gray-100 rounded-xl">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {carouselItems.map((item) => (
            <div key={item._id} className="outline-none">
              <Link href={"services" + "/" + item.slug} passHref>
                <div className="relative h-[32rem] w-full rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src={item.banner || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {/* Background shade with increased opacity */}
                  <div className="absolute inset-0 bg-black/70" />
                  {/* Centered text container */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
                    <h3 className="text-4xl lg:text-5xl font-bold mb-4">{item.name}</h3>
                    
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Carousel;
