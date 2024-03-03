// pages/MerchandiseShopItem.js
import Footer from "@/components/Footer";
import Header from "@/components/common/Header";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { merchandiseShop } from "@/components/common/Helper";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";
// import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const MerchandiseShopItem = () => {
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // const addPaypalScript = () => {
  //   if (window.paypal) {

  //     setScriptLoaded(true);
  //     return;

  //   }

  //   const script = document.createElement("script");
  //   script.src = "https://www.paypal.com/sdk/js?client-id=Acxb_9S9ZZEuMvkt7QfV7KqQJcKfypd-O6Gqa_Ak--Pfs0IpFbg9gn7cKvPmlFGlsOPnqnw8vbVki5ck";

  //   script.type = "text/javascript";
  //   script.async = true;

  //   script.onload = () => setScriptLoaded(true);

  //   document.body.appendChild(script);

  // };

  // useEffect(() => {
  //   addPaypalScript();
  // }, []);

  const { itemName, itemPrice, itemImg, itemImg2, itemDescription } =
    router.query;

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const [flipImage, setFlipImage] = useState(
    Array(merchandiseShop.length).fill(true)
  );

  const handleFlipImage = (index) => () => {
    setFlipImage((prevFlipImage) => {
      const newFlipImage = [...prevFlipImage];
      newFlipImage[index] = !newFlipImage[index];
      return newFlipImage;
    });
  };

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
      <Header />

      {/* Section for item details */}
      <section className="w-full h-full pt-20 pb-4 md:py-12 px-12 md:px-20 ">
        {/* Div for image and description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 justify-start md:justify-center items-center">
          <span
            className="imageMagnifier"
            style={{ width: "100%", height: "100%", marginTop: "10rem" }}
          >
            <Zoom>
              <Image
                alt="thatwanakatree"
                src={itemImg}
                width="600"
                height="100"
              />
            </Zoom>
          </span>
          <span className="mt-4 md:mt-16">
            <h1 className="text-[#FFBB00] text-[24px] font-bold mb-2">
              {itemName}
            </h1>
            <div
              dangerouslySetInnerHTML={createMarkup(itemDescription)}
              className="text-white text-[14px]"
            ></div>
          </span>
        </div>

        {/* Div for name, price and size dropdown menu */}
        <div className="mt-12">
          <span className="flex items-center gap-40">
            <h1 className="text-[#FFBB00] text-[20px] font-bold mb-2">
              {itemName}
            </h1>
            <p>{itemPrice}</p>
          </span>

          <span>
            <select
              name="size"
              id="size"
              className="w-1/2 p-2 mt-4 bg-gray-800 text-[#FFBB00] text-[14px] font-bold
              cursor-pointer border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB00] focus:ring-opacity-50
              text-white
              "
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">X-Large</option>
            </select>
          </span>

          {/* Shop Now Button */}
          <button
            className="uppercase text-xs md:text-lg font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full md:w-[25rem] bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto
          cursor-pointer mt-8 md:mt-20
          "
          >
            Shop Now
            <IoIosArrowForward
              className="text-[20px]
            "
            />
            <PayPalScriptProvider
              options={{
                clientId:
                  "ARaVRMP3MOMPT53lrjayddba7uXtzpsEqVG309F_UvnsxN-01HO3_Z4TUOm_3kuED3yxB7Fgtxnx-GaM",
              }}
            >
              <PayPalButtons
                amount={itemPrice}
                style={{ layout: "horizontal" }}
              />
            </PayPalScriptProvider>
          </button>

          {/* {scriptLoaded ? <PayPalButton 
          amount={itemPrice}
          onSuccess={(details, data) => {
            console.log(details, data);
          }}
          
          /> : <span>Loading...</span>} */}
        </div>
      </section>

      <div className="flex items-center px-20 py-4 md:px-40 ">
        <hr className="w-full h-0.5 bg-[#FFBB00] mt-2 md:mt-" />
      </div>

      {/*Section for remaining cards display*/}
      <section className="w-full h-full pt-20 pb-4 md:py-12 px-12 md:px-20">
        <div
          className="w-full h-full 
          grid grid-cols-2 md:grid-cols-4 gap-4
        "
        >
          {merchandiseShop.map((item, index) => (
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
              <div className="flex justify-between items-center text-white text-[14px]">
                <span className="text-gray-300">Item</span>
                <span className="text-gray-300">Price</span>
              </div>

              {/* Div For Name and price value */}
              <div className="flex justify-between items-center text-white text-[14px]">
                <span
                  className="text-[#FFBB00]
                  text-[12px]
                  md:text-[16px] font-semibold
                  hover:text-[#FFBB00]
                  block w-full
                  "
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
                      itemDescription: item?.longDescription,
                    },
                  }}
                  className="text-white
                  text-[12px]
                  md:text-[20px] font-bold flex justify-center items-center gap-2
              "
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
  );
};

export default MerchandiseShopItem;
