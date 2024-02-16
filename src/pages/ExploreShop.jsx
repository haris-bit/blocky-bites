import Footer from "@/components/Footer";
import Header from "@/components/common/Header";
import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { merchandiseShop } from "@/components/common/Helper";
import Link from "next/link";

const ExploreShop = () => {
  const [flippedItems, setFlippedItems] = useState(
    Array(merchandiseShop.length).fill(false)
  );

  const handleMouseEnter = (index) => {
    setFlippedItems((prevFlippedItems) => {
      const newFlippedItems = [...prevFlippedItems];
      newFlippedItems[index] = true;
      return newFlippedItems;
    });
  };

  const handleMouseLeave = (index) => {
    setFlippedItems((prevFlippedItems) => {
      const newFlippedItems = [...prevFlippedItems];
      newFlippedItems[index] = false;
      return newFlippedItems;
    });
  };

  return (
    <div>
      <div className="w-full h-full flex flex-col ">
        <Header />
        {/* Content Div */}
        <section className="w-full h-full pt-20 pb-4 md:py-32 px-12 md:px-20">
          <h1 className="w-full h-full flex justify-center items-center">
            <span className="text-center text-[#FFBB00] text-[20px] md:text-[30px] font-bold mb-4">
              Explore Shop
            </span>
          </h1>
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 gap-4">
            {merchandiseShop.map((item, index) => (
              <div
                key={index}
                className={`w-full h-[30rem] gap-4 flex flex-col bg-[#18150E] rounded-xl
      hover:shadow-lg hover:backdrop-blur-md outine           
      shadow-sm shadow-[#ffbb00]
      transition duration-300 ease-in-out
      hover:shadow-[#ffbb00]
      px-4`}
              >
                {/* Div For Image */}
                <div
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "45%",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginTop: "10px",
                    position: "relative",
                  }}
                >
                  {/* Icon for card flip */}
                  <div
                    className="flex justify-end items-start absolute top-0 end-0 m-2
                    z-10"
                  >
                    <MdOutlineFlipCameraAndroid
                      className="text-[#FFBB00] text-[20px] cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    />
                  </div>

                  <div
                    className={`${
                      flippedItems[index] ? "flipped" : "backtooriginal"
                    }`}
                  >
                    <Image
                      src={flippedItems[index] ? item.itemImg2 : item.itemImg1}
                      width="800"
                      height="400"
                      alt="merchandise-1"
                      className={`object-cover md:object-contain md:object-center`}
                    />
                  </div>
                </div>

                {/* Div For Text */}
                <div className="text-white text-[14px]">
                  <span className="text-gray-300">Item</span>: {item.nftArt}
                </div>
                <div className="text-white text-[14px]">
                  <span className="text-gray-300">Price</span>: {item.prize}
                </div>

                {/* Button For Shop Now */}
                <div className="uppercase text-xs lg:text-sm font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto cursor-pointer mt-6">
                  <Link
                    href={{
                      pathname: "/MerchandiseShopItem",
                      query: {
                        itemName: item?.nftArt,
                        itemPrice: item?.prize,
                        itemImg: item?.itemImg1,
                        itemDescription: item?.longDescription,
                      },
                    }}
                    className="text-white text-[12px] md:text-[20px] font-bold flex justify-center items-center gap-2"
                  >
                    Show Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default ExploreShop;
