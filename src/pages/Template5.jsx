import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ColorPicker } from "@wellbees/color-picker-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { toAbsolutePath } from "../helpers/assetPath";
import * as htmlToImage from "html-to-image";

function Template5() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      Title: {
        Value: "save up to 30%",
        FontSize: 60,
        Color: "#222222",
      },
      Slogan: {
        Value: "Free Delivery For All Customer",
        FontSize: 20,
        Color: "#222222",
      },
      Copyright: {
        Value: "@reallygreatsite",
        FontSize: 18,
        Color: "#222222",
      },
      Images1: "/Thietke/myimage/anh-5-1.png",
      Images2: "/Thietke/myimage/anh-5-2.png",
      Images3: "/Thietke/myimage/anh-5-3.png",
      Images4: "/Thietke/myimage/anh-5-4.png",
      Images5: "/Thietke/myimage/anh-5-5.png",
      Images6: "/Thietke/myimage/anh-5-6.png",
      Icon: "/Thietke/myimage/icon-5.png",
      Background: "#fff",
      Color: "#F5C8B4",
      Width: 600,
      Height: 600,
    },
  });

  const [Scale, setScale] = useState(1);

  const onSubmit = (data) => console.log(data);

  const componentRef = useRef();
  const elRef = useRef();

  const {
    Title,
    Background,
    Slogan,
    Width,
    Height,
    Copyright,
    Icon,
    Color,
    Images1,
    Images2,
    Images3,
    Images4,
    Images5,
    Images6,
  } = watch();

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
        bodyFormData.append("title", "mau-5-" + new Date().valueOf());
        bodyFormData.append("base64", image);
        axios
          .post(
            `${
              import.meta.env.DEV ? "https://cser.vn" : ""
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
      className="flex flex-grow md:h-full flex-col md:flex-row h-full"
    >
      <div className="w-full md:w-[300px] md:min-w-[300px] lg:w-[400px] lg:min-w-[400px] p-5 bg-white h-full md:overflow-auto order-last md:order-first">
        <div className="grid grid-cols-4 md:grid-cols-2 md:gap-5 gap-3 mb-5">
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images1"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images1 && (
                  <div className="absolute w-full h-full md:p-5 p-3">
                    <img
                      className="object-contain w-full h-full"
                      src={toAbsolutePath(Images1)}
                    />
                  </div>
                )}
                {!Images1 && (
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
                  name="Images1"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="Images1"
                      type="file"
                      className="hidden"
                      //{...field}
                      onChange={(e) => {
                        var file = e.target.files[0];
                        const objectUrl = URL.createObjectURL(file);
                        field.onChange(objectUrl);
                      }}
                    />
                  )}
                />
              </label>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images2"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images2 && (
                  <div className="absolute w-full h-full md:p-5 p-3">
                    <img
                      className="object-contain w-full h-full"
                      src={toAbsolutePath(Images2)}
                    />
                  </div>
                )}
                {!Images2 && (
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
                  name="Images2"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="Images2"
                      type="file"
                      className="hidden"
                      //{...field}
                      onChange={(e) => {
                        var file = e.target.files[0];
                        const objectUrl = URL.createObjectURL(file);
                        field.onChange(objectUrl);
                      }}
                    />
                  )}
                />
              </label>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images3"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images3 && (
                  <div className="absolute w-full h-full md:p-5 p-3">
                    <img
                      className="object-contain w-full h-full"
                      src={toAbsolutePath(Images3)}
                    />
                  </div>
                )}
                {!Images3 && (
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
                  name="Images3"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="Images3"
                      type="file"
                      className="hidden"
                      //{...field}
                      onChange={(e) => {
                        var file = e.target.files[0];
                        const objectUrl = URL.createObjectURL(file);
                        field.onChange(objectUrl);
                      }}
                    />
                  )}
                />
              </label>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images4"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images4 && (
                  <div className="absolute w-full h-full md:p-5 p-3">
                    <img
                      className="object-contain w-full h-full"
                      src={toAbsolutePath(Images4)}
                    />
                  </div>
                )}
                {!Images4 && (
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
                  name="Images4"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="Images4"
                      type="file"
                      className="hidden"
                      //{...field}
                      onChange={(e) => {
                        var file = e.target.files[0];
                        const objectUrl = URL.createObjectURL(file);
                        field.onChange(objectUrl);
                      }}
                    />
                  )}
                />
              </label>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images5"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images5 && (
                  <div className="absolute w-full h-full md:p-5 p-3">
                    <img
                      className="object-contain w-full h-full"
                      src={toAbsolutePath(Images5)}
                    />
                  </div>
                )}
                {!Images5 && (
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
                  name="Images5"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="Images5"
                      type="file"
                      className="hidden"
                      //{...field}
                      onChange={(e) => {
                        var file = e.target.files[0];
                        const objectUrl = URL.createObjectURL(file);
                        field.onChange(objectUrl);
                      }}
                    />
                  )}
                />
              </label>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images5"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images6 && (
                  <div className="absolute w-full h-full md:p-5 p-3">
                    <img
                      className="object-contain w-full h-full"
                      src={toAbsolutePath(Images6)}
                    />
                  </div>
                )}
                {!Images6 && (
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
                  name="Images6"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="Images6"
                      type="file"
                      className="hidden"
                      //{...field}
                      onChange={(e) => {
                        var file = e.target.files[0];
                        const objectUrl = URL.createObjectURL(file);
                        field.onChange(objectUrl);
                      }}
                    />
                  )}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div className="text-[12px] text-[#939393] mb-1 font-light">
            Mùa nền / Màu chủ đạo
          </div>
          <div className="flex mb-2">
            <div className="w-[46px] mx-2">
              <Controller
                name="Background"
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
            <div className="w-[46px]">
              <Controller
                name="Color"
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
        <div className="mb-5">
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
                name="Copyright.Value"
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
                name="Copyright.FontSize"
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
                name="Copyright.Color"
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
      <div className="flex flex-col flex-1 h-full w-full md:w-[calc(100%-300px)] lg:w-[calc(100%-400px)] md:order-last order-first bg-[#ebecf0]">
        <div
          className="md:flex items-center justify-center grow overflow-hidden md:overflow-auto relative"
          ref={elRef}
        >
          <div
            ref={componentRef}
            className={`relative bg-no-repeat bg-cover overflow-hidden el-scale`}
            style={{
              width: Width,
              height: Height,
              "--el-scale": Scale,
              background: `${Background}`,
              //transform: `scale(${Scale})`,
              transformOrigin: "0 0",
            }}
          >
            <div
              className="absolute -bottom-[70px] -left-[70px]"
              style={{
                transform: "rotate(-20deg)",
              }}
            >
              <img className="w-[170px]" src={toAbsolutePath(Icon)} />
            </div>
            <div
              className="absolute -top-[70px] -right-[70px]"
              style={{
                transform: "rotate(180deg)",
              }}
            >
              <img className="w-[170px]" src={toAbsolutePath(Icon)} />
            </div>
            <div className="pt-16">
              <div className="text-center relative">
                <div
                  className="uppercase font-medium font-play"
                  style={{
                    color: Title.Color,
                    fontSize: Title.FontSize,
                    lineHeight: "75px",
                  }}
                >
                  {Title.Value}
                </div>
                <div
                  className="font-light"
                  style={{
                    color: Slogan.Color,
                    fontSize: Slogan.FontSize,
                  }}
                >
                  {Slogan.Value}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5 px-20 mt-10 relative">
                <div className="w-[40px] absolute -top-12 left-16">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid meet"
                    version={1.0}
                    viewBox="-13.5 -7.3 490.8 589.0"
                    zoomAndPan="magnify"
                    style={{ fill: "rgb(0, 0, 0)" }}
                  >
                    <g data-name="Layer 2">
                      <g
                        data-name="Layer 1"
                        id="__id126_sdmq0rn4zi"
                        style={{ fill: "rgb(166, 132, 119)" }}
                      >
                        <path
                          d="M134.2,129.59c-7.72,59.32-17.64,148.35-101.55,154.19-46.16,3.21-45.24,23.29,14.77,33.73s83.09,65.85,86.78,115.64,30.46,63.44,39.7,0,17.53-121.34,96-130.1c36-4,45.24-16.86,3.69-24.09-62.09-10.8-97-94.71-108-148.56C156.36,85.43,139.74,87,134.2,129.59Z"
                          style={{ fill: "inherit" }}
                        />
                        <path
                          d="M345.68,20.17c-4.8,36.9-11,92.29-63.18,95.92-28.72,2-28.14,14.49,9.19,21s51.69,41,54,71.94,18.95,39.47,24.7,0,10.9-75.49,59.73-80.93c22.4-2.5,28.14-10.5,2.3-15-38.64-6.72-60.33-58.93-67.2-92.43C359.46-7.31,349.13-6.31,345.68,20.17Z"
                          style={{ fill: "inherit" }}
                        />
                        <path
                          d="M385.37,554.25c4.81-36.9,11-92.29,63.18-95.93,28.72-2,28.14-14.48-9.19-21s-51.69-41-54-71.94-18.95-39.47-24.69,0-10.91,75.49-59.74,80.93c-22.4,2.5-28.14,10.5-2.29,15,38.63,6.72,60.32,58.93,67.2,92.43C371.59,581.73,381.93,580.73,385.37,554.25Z"
                          style={{ fill: "inherit" }}
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div
                  className="aspect-square rounded-[20px] overflow-hidden"
                  style={{
                    border: `3px solid ${Color}`,
                  }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={toAbsolutePath(Images1)}
                  />
                </div>
                <div
                  className="aspect-square rounded-[20px] overflow-hidden"
                  style={{
                    border: `3px solid ${Color}`,
                  }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={toAbsolutePath(Images2)}
                  />
                </div>
                <div
                  className="aspect-square rounded-[20px] overflow-hidden"
                  style={{
                    border: `3px solid ${Color}`,
                  }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={toAbsolutePath(Images3)}
                  />
                </div>
                <div
                  className="aspect-square rounded-[20px] overflow-hidden"
                  style={{
                    border: `3px solid ${Color}`,
                  }}
                >
                  <img
                    className="w-full h-full"
                    src={toAbsolutePath(Images4)}
                  />
                </div>
                <div
                  className="aspect-square rounded-[20px] overflow-hidden"
                  style={{
                    border: `3px solid ${Color}`,
                  }}
                >
                  <img
                    className="w-full h-full"
                    src={toAbsolutePath(Images5)}
                  />
                </div>
                <div
                  className="aspect-square rounded-[20px] overflow-hidden"
                  style={{
                    border: `3px solid ${Color}`,
                  }}
                >
                  <img
                    className="w-full h-full"
                    src={toAbsolutePath(Images6)}
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-full flex justify-between items-center px-10 pb-8">
              <div
                className="w-full text-center"
                style={{
                  color: Copyright.Color,
                  fontSize: Number(Copyright.FontSize || 30) + "px",
                }}
              >
                <div>{Copyright.Value}</div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="bg-danger text-white fixed top-2 right-2 h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-75 md:hidden"
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
            className="bg-primary text-white fixed top-16 right-2 h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-75 md:hidden"
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
        <div className="hidden md:flex justify-between px-4 py-3 bg-white border-l">
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

export default Template5;
