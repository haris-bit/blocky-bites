import Image from "next/image";
import React, { useState } from "react";
import { merchandiseShop } from "./common/Helper";
import Link from "next/link";
import { useGlobalInfoProvider } from "./common/CommonProvider";
import { BlackLockIconBlack, ShopDropDownIcon } from "./common/Icons";
import { toast } from "react-toastify";
import { readContract } from "@wagmi/core";
import { smartContract } from "@/config";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";

const MerchandiseShop = () => {
  const [flipImage, setFlipImage] = useState(
    Array(merchandiseShop.length).fill(true)
  );

  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { merchandiseRef } = useGlobalInfoProvider();
  const [dropdownStates, setDropdownStates] = useState(
    Array(merchandiseShop.length).fill(false)
  );
  const [selectedSizes, setSelectedSizes] = useState(
    Array(merchandiseShop.length).fill("")
  );
  const [rotateArrow, setRotateArrow] = useState(
    Array(merchandiseShop.length).fill(false)
  );

  const toggleDropdown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);

    const newRotateArrows = [...rotateArrow];
    newRotateArrows[index] = !newRotateArrows[index];
    setRotateArrow(newRotateArrows);
  };

  const selectSize = (index, size) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[index] = size;
    setSelectedSizes(newSelectedSizes);
    toggleDropdown(index);
  };
  const Data = [
    {
      selectValue: "sm",
    },
    {
      selectValue: "md",
    },
    {
      selectValue: "lg",
    },
    {
      selectValue: "xl",
    },
    {
      selectValue: "xxl",
    },
  ];

  const handleFlipImage = (index) => () => {
    setFlipImage((prevFlipImage) => {
      const newFlipImage = [...prevFlipImage];
      newFlipImage[index] = !newFlipImage[index];
      return newFlipImage;
    });
  };

  // ==========================================

  return (
    <div
      id="merchandise"
      ref={merchandiseRef}
      className="xl:pt-[150px] lg:pt-[130px] pt-[58px] relative
      "
    >
      <Image
        className="absolute top-[-50px] end-0 w-[30%] h-[1580px]"
        width="1700"
        height="980"
        src="/assets/images/svg/shop-wave.svg"
        alt="wave-img"
      />
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 relative z-10">
        <h3
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-delay="300"
          className="font-extrabold text-[28px] leading-9 md:text-2xl md:leading-[65px] text-white text-center mb-0"
        >
          MERCHANDISE SHOP
        </h3>

        {/* Card for Item */}
        <div
          className="w-full h-full mt-12
        md:flex md:flex-row justify-center items-center justify-around gap-4
        "
        >
          {merchandiseShop.slice(8, 12).map((item, index) => (
            <div
              className="w-full h-[30rem] flex flex-col gap-4 bg-[#18150E] rounded-xl
            hover:shadow-lg hover:backdrop-blur-md outine 
            shadow-sm shadow-[#ffbb00]
            transition duration-300 ease-in-out
            hover:shadow-[#ffbb00]
            px-4
            py-6
            "
              key={index}
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
              "
                >
                  <MdOutlineFlipCameraAndroid
                    className="text-[#FFBB00] text-[20px] cursor-pointer"
                    onClick={handleFlipImage(index)}
                  />
                </div>

                <Image
                  src={flipImage[index] ? item.itemImg1 : item.itemImg2}
                  width="800"
                  height="200"
                  alt="merchandise-1"
                  className="object-fit object-center"
                />
              </div>

              {/* Div For Text */}
              <div className="flex justify-between items-center text-white text-[14px]">
                <span className="text-gray-300">Item</span>
                <span className="text-gray-300">Price</span>
              </div>

              {/* Div For Name and price value */}
              <div className="flex justify-between items-center text-white text-[14px]">
                <span
                  className="text-white
                text-[20px] font-bold
              hover:text-[#FFBB00]"
                >
                  {item.nftArt}
                </span>
                <span
                  className="text-white
                text-[16px] font-bold"
                >
                  {item.prize}
                </span>
              </div>

              {/* Button For Shop Now */}
              <div
                className="uppercase text-xs lg:text-sm font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto
                cursor-pointer mt-6
            "
              >
                <Link
                  href={{
                    pathname: "/MerchandiseShopItem",
                    query: {
                      itemName: item?.nftArt,
                      itemPrice: item?.prize,
                      itemImg: item?.itemImg1,
                      itemImg2: item?.itemImg2,
                      itemDescription: item?.longDescription,
                    },
                  }}
                  className="text-white
              text-[20px] font-bold flex justify-center items-center gap-2
              "
                >
                  Shop Now
                  <MdOutlineShoppingBag className="inline-block mr-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div data-aos="fade-up" data-aos-easing="linear" data-aos-delay="300">
          <Link
            href="/"
            className="uppercase text-xs lg:text-sm font-bold text-black bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] h-[56px] w-[250px] bg-no-repeat duration-300 hover:text-[#FFBB00] flex justify-center items-center  mt-8 xl:mt-10 mx-auto bg_size_full"
          >
            Full Shop Coming Soon!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerchandiseShop;
