﻿import {
  ArrowDownTrayIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ColorPicker } from "@wellbees/color-picker-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { toAbsolutePath } from "../helpers/assetPath";
import * as htmlToImage from "html-to-image";

function Template15() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      Title: {
        Value: "Client",
        FontSize: 60,
        Color: "#413120",
      },
      Slogan: {
        Value: "Testimonial",
        FontSize: 38,
        Color: "#413120",
      },
      Desc: {
        Value: "It’s like you read my mind with the new product. Thank you! :)",
        FontSize: 18,
        Color: "#413120",
      },
      User: {
        Value: "Drew Feige",
        FontSize: 18,
        Color: "#413120",
      },
      Images: "/Thietke/myimage/anh-15.png",
      Icon: "/Thietke/myimage/icon-15-iphone.png",
      Width: 600,
      Height: 600,
    },
  });

  const [Scale, setScale] = useState(1);

  const onSubmit = (data) => console.log(data);

  const componentRef = useRef();
  const elRef = useRef();

  const { Title, Images, Background, Slogan, Width, Height, Desc, User, Icon } =
    watch();

  useEffect(() => {
    if (elRef && elRef?.current) {
      const { offsetWidth, offsetHeight } = elRef?.current;
      if (offsetHeight < Height) {
        setScale(((offsetHeight / Height) * 100) / 100);
      } else if (offsetWidth < Width) {
        setScale(((offsetWidth / Width) * 100) / 100);
        elRef.current.style.height = offsetWidth + "px";
      }
    }
  }, [elRef, Width, Height]);

  const getTokenParams = () => {
    let url = window.location.href;
    return url.split("token=")[1];
  };

  const onExportImage = async () => {
    setIsLoading(true);
    componentRef?.current?.classList.remove("el-scale");

    htmlToImage
      .toPng(componentRef.current, {
        canvasWidth: 600,
        canvasHeight: 600,
        pixelRatio: 1,
        skipAutoScale: true,
        cacheBust: true,
      })
      .then(function (image) {
        componentRef?.current?.classList.add("el-scale");
        var bodyFormData = new FormData();
        bodyFormData.append("title", "mau-15-" + new Date().valueOf());
        bodyFormData.append("base64", image);
        axios
          .post(
            `${
              import.meta.env.MODE === "development" ? "https://cser.vn" : ""
            }/api/v3/file?cmd=base64`,
            bodyFormData,
            {
              headers: { Authorization: `Bearer ${getTokenParams()}` },
            }
          )
          .then(({ data, error }) => {
            if (!error) {
              window?.parent?.postMessage(
                JSON.stringify({
                  Image: data?.src || "",
                }),
                "*"
              );
            }
            setIsLoading(false);
          });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-grow h-full overflow-auto md:h-full md:flex-row"
    >
      <div className="w-full md:w-[300px] md:min-w-[300px] lg:w-[400px] lg:min-w-[400px] p-5 bg-white h-full md:overflow-auto order-last md:order-first">
        <div className="grid grid-cols-4 gap-5 mb-5 md:grid-cols-3">
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images && (
                  <div className="absolute w-full h-full p-2 md:p-5">
                    <img
                      className="object-contain w-full h-full"
                      src={toAbsolutePath(Images)}
                    />
                  </div>
                )}
                {!Images && (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG
                    </p>
                  </div>
                )}

                <Controller
                  name="Images"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="Images"
                      type="file"
                      className="hidden"
                      //{...field}
                      onChange={(e) => {
                        var file = e.target.files[0];
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                          field.onChange(reader.result);
                        };
                        reader.onerror = function (error) {
                          console.log("Error: ", error);
                        };
                      }}
                    />
                  )}
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[12px] text-[#939393] mb-1 font-light">
            Nhập tiêu đề / Cỡ chữ / Màu sắc
          </div>
          <div className="flex mb-2">
            <div className="flex-1">
              <Controller
                name="Title.Value"
                control={control}
                render={({ field }) => (
                  <input
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
                    type="text"
                    placeholder="Nhập text"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-[50px] mx-2">
              <Controller
                name="Title.FontSize"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition text-center"
                    type="text"
                    placeholder="Nhập text"
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                  />
                )}
              />
            </div>
            <div className="w-[46px]">
              <Controller
                name="Title.Color"
                control={control}
                render={({ field }) => (
                  <>
                    <ColorPicker
                      value={field.value}
                      inputType="input"
                      onChange={field.onChange}
                      fullWidth
                      className="picker-color"
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-1">
              <Controller
                name="Slogan.Value"
                control={control}
                render={({ field }) => (
                  <input
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
                    type="text"
                    placeholder="Nhập text"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-[50px] mx-2">
              <Controller
                name="Slogan.FontSize"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition text-center"
                    type="text"
                    placeholder="Nhập cỡ chữ"
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                  />
                )}
              />
            </div>
            <div className="w-[46px]">
              <Controller
                name="Slogan.Color"
                control={control}
                render={({ field }) => (
                  <ColorPicker
                    value={field.value}
                    inputType="input"
                    onChange={field.onChange}
                    fullWidth
                    className="picker-color"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-1">
              <Controller
                name="Desc.Value"
                control={control}
                render={({ field }) => (
                  <input
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
                    type="text"
                    placeholder="Nhập text"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-[50px] mx-2">
              <Controller
                name="Desc.FontSize"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition text-center"
                    type="text"
                    placeholder="Nhập cỡ chữ"
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                  />
                )}
              />
            </div>
            <div className="w-[46px]">
              <Controller
                name="Desc.Color"
                control={control}
                render={({ field }) => (
                  <ColorPicker
                    value={field.value}
                    inputType="input"
                    onChange={field.onChange}
                    fullWidth
                    className="picker-color"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              <Controller
                name="User.Value"
                control={control}
                render={({ field }) => (
                  <input
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
                    type="text"
                    placeholder="Nhập text"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-[50px] mx-2">
              <Controller
                name="User.FontSize"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition text-center"
                    type="text"
                    placeholder="Nhập cỡ chữ"
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                  />
                )}
              />
            </div>
            <div className="w-[46px]">
              <Controller
                name="User.Color"
                control={control}
                render={({ field }) => (
                  <ColorPicker
                    value={field.value}
                    inputType="input"
                    onChange={field.onChange}
                    fullWidth
                    className="picker-color"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full w-full md:w-[calc(100%-300px)] lg:w-[calc(100%-400px)] md:order-last order-first">
        <div
          className="relative items-center justify-center overflow-hidden md:flex grow md:overflow-auto aspect-square"
          ref={elRef}
        >
          <div
            ref={componentRef}
            className="relative bg-no-repeat bg-cover el-scale"
            style={{
              width: Width,
              height: Height,
              backgroundImage: `url(${toAbsolutePath(Background)})`,
              "--el-scale": Scale,
              //transform: `scale(${Scale})`,
              transformOrigin: "0 0",
            }}
          >
            <div className="w-full h-full flex relative">
              <div className="h-full flex-1 bg-[#DFD7D1]"></div>
              <div className="h-full w-[160px] bg-[#413120]"></div>
              <div className="absolute w-full h-full">
                <div className="absolute h-full py-20 right-14">
                  <div className="relative">
                    <div className="absolute w-full h-full top-0">
                      <img src={toAbsolutePath(Icon)} alt="" />
                    </div>
                    <div className="p-2">
                      <img
                        className="w-[218px] h-[450px] rounded-[35px] object-cover"
                        src={toAbsolutePath(Images)}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="relative pl-20 pt-28 h-full">
                  <div
                    className="font-ephesis leading-[60px]"
                    style={{
                      color: Title.Color,
                      fontSize: Title.FontSize + "px",
                    }}
                  >
                    {Title.Value}
                  </div>
                  <div
                    className="font-play italic font-bold"
                    style={{
                      color: Slogan.Color,
                      fontSize: Slogan.FontSize + "px",
                    }}
                  >
                    {Slogan.Value}
                  </div>
                  <div className="bg-white w-[300px] p-6 text-center mt-20 rounded-[25px]">
                    <div
                      className="flex justify-center"
                      style={{
                        color: Desc.Color,
                      }}
                    >
                      <StarIcon className="w-6 mx-px" />
                      <StarIcon className="w-6 mx-px" />
                      <StarIcon className="w-6 mx-px" />
                      <StarIcon className="w-6 mx-px" />
                      <StarIcon className="w-6 mx-px" />
                    </div>
                    <div
                      className="mt-4"
                      style={{
                        color: Desc.Color,
                        fontSize: Desc.FontSize + "px",
                      }}
                    >
                      {Desc.Value}
                    </div>
                  </div>
                  <div className="mt-10">
                    <div
                      className="italic pl-24 relative"
                      style={{
                        color: User.Color,
                        fontSize: User.FontSize + "px",
                      }}
                    >
                      <div
                        className="absolute w-20 h-[1px] left-0 top-2/4 translate-y-2/4"
                        style={{
                          background: User.Color,
                        }}
                      ></div>
                      {User.Value}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="fixed flex items-center justify-center text-white rounded-full bg-danger top-2 right-2 h-11 w-11 disabled:opacity-75 md:hidden"
            onClick={() => {
              window?.parent?.postMessage(
                JSON.stringify({
                  isClose: true,
                }),
                "*"
              );
            }}
          >
            <XMarkIcon className="w-5" />
          </button>
          <button
            type="button"
            className="fixed flex items-center justify-center text-white rounded-full bg-primary top-16 right-2 h-11 w-11 disabled:opacity-75 md:hidden"
            onClick={onExportImage}
            disabled={isLoading}
          >
            {!isLoading && <ArrowDownTrayIcon className="w-5" />}

            {isLoading && (
              <div
                role="status"
                className="absolute left-[9px] top-2/4 -translate-y-2/4"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-6 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
        <div className="justify-between hidden px-4 py-3 bg-white border-l md:flex">
          <div></div>
          <div>
            <button
              type="button"
              className="bg-primary text-white h-[42px] px-4 rounded flex items-center justify-center"
              onClick={onExportImage}
            >
              <ArrowDownTrayIcon className="w-5 mr-2" />
              Tải xuống
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Template15;
