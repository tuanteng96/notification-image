import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ColorPicker } from "@wellbees/color-picker-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { toAbsolutePath } from "../helpers/assetPath";
import * as htmlToImage from "html-to-image";

function Template18() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      Title: {
        Value: "BEAUTY",
        FontSize: 30,
        Color: "#886356",
      },
      Slogan: {
        Value: "SKINCARE",
        FontSize: 40,
        Color: "#886356",
      },
      Desc: {
        Value: "Special For You",
        FontSize: 15,
        Color: "#886356",
      },
      Content: {
        Value: "use the right skin care products so as not to damage your skin",
        FontSize: 16,
        Color: "#886356",
      },
      Button: {
        BackgroundColor: "#A86851",
        Title: "Booking",
        Color: "#fff",
        FontSize: 20,
      },
      BackgroundColor: "#DDAC99",
      Color: "#ffffff",
      Images: "/Thietke/myimage/anh-18.png",
      Images2: "/Thietke/myimage/anh-18-1.png",
      Background: "/Thietke/myimage/bg-18.png",
      Width: 600,
      Height: 600,
    },
  });

  const [Scale, setScale] = useState(1);

  const onSubmit = (data) => console.log(data);

  const componentRef = useRef();
  const elRef = useRef();

  const {
    BackgroundColor,
    Title,
    Images,
    Images2,
    Background,
    Slogan,
    Content,
    Desc,
    Width,
    Height,
    Button,
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
        bodyFormData.append("title", "mau-18-" + new Date().valueOf());
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
        <div className="grid grid-cols-4 gap-5 mb-5 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-36 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
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
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images2"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-36 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images2 && (
                  <div className="absolute w-full h-full p-2 md:p-5">
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
        <div className="mb-5">
          <div className="text-[12px] text-[#939393] mb-1 font-light">
            Mùa chủ đạo
          </div>
          <div className="flex mb-2">
            <div className="w-[46px] mx-2">
              <Controller
                name="BackgroundColor"
                control={control}
                render={({ field }) => (
                  <ColorPicker
                    value={field.value}
                    inputType="input"
                    onChange={field.onChange}
                    fullWidth
                    className="picker-color picker-color-left"
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
          <div className="flex mb-2">
            <div className="flex-1">
              <Controller
                name="Content.Value"
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
                name="Content.FontSize"
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
                name="Content.Color"
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
        <div>
          <div className="text-[12px] text-[#939393] mb-1 font-light">
            Tiêu đề Button / Màu nền / Màu chữ / Cỡ chữ
          </div>
          <div className="flex">
            <div className="flex-1">
              <Controller
                name="Button.Title"
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
            <div className="w-[46px] ml-2">
              <Controller
                name="Button.BackgroundColor"
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
            <div className="w-[46px] ml-2">
              <Controller
                name="Button.Color"
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
            <div className="w-[50px] mx-2">
              <Controller
                name="Button.FontSize"
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
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full w-full md:w-[calc(100%-300px)] lg:w-[calc(100%-400px)] md:order-last order-first">
        <div
          className="relative items-center justify-center overflow-hidden md:flex grow md:overflow-auto aspect-square bg-[#ebecf0]"
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
            <div className="flex flex-col h-full relative">
              <div
                className="absolute h-full w-[130px] right-0 top-0"
                style={{
                  background: BackgroundColor,
                }}
              ></div>
              <div className="absolute w-[45%] h-full right-0 top-0 z-10">
                <div className="h-full pr-10 py-20 relative">
                  <div className="h-full relative z-20">
                    <img
                      className="w-full h-full object-cover"
                      src={toAbsolutePath(Images)}
                      alt=""
                    />
                  </div>
                  <div
                    className="absolute w-[200px] h-[200px] rounded-full -left-[115px] top-2/4 -translate-y-2/4 z-10"
                    style={{
                      background: BackgroundColor,
                    }}
                  ></div>
                  <div className="w-[160px] h-[160px] absolute rounded-full -left-[92px] top-2/4 -translate-y-2/4 z-20 border-white border-[3px]">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={toAbsolutePath(Images2)}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="py-20 h-full pl-12 relative z-30 w-2/4">
                <div className="pt-10">
                  <div
                    className="uppercase font-bold"
                    style={{
                      fontSize: Title.FontSize + "px",
                      color: Title.Color,
                      lineHeight: Title.FontSize + "px",
                    }}
                  >
                    {Title.Value}
                  </div>
                  <div
                    className="uppercase font-[800] mt-1"
                    style={{
                      fontSize: Slogan.FontSize + "px",
                      color: Slogan.Color,
                      lineHeight: Slogan.FontSize + 5 + "px",
                    }}
                  >
                    {Slogan.Value}
                  </div>
                  <div
                    className="uppercase tracking-[3px]"
                    style={{
                      color: Desc.Color,
                      fontSize: Desc.FontSize + "px",
                    }}
                  >
                    {Desc.Value}
                  </div>
                </div>
                <div
                  className="mt-12 w-[60%] font-light"
                  style={{
                    color: Content.Color,
                    fontSize: Content.FontSize + "px",
                  }}
                >
                  {Content.Value}
                </div>
                <div className="mt-20 relative">
                  <svg
                    className="absolute -top-[60px] right-[30px] w-[90px] rotate-[150deg]"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid meet"
                    version={1.0}
                    viewBox="7.7 20.8 269.2 76.3"
                    zoomAndPan="magnify"
                    style={{ fill: "rgb(0, 0, 0)" }}
                  >
                    <g id="__id154_sl1xjy77s" style={{ fill: BackgroundColor }}>
                      <path
                        d="M11.54,23.02c-0.14,0.19-0.16,0.4-0.07,0.62c-0.54,0.62-1.78,0.14-1.99,1.28l0,0 c-1.82,1.81-1.13,3.66-0.05,5.49c3.04,5.12,6.85,9.64,10.94,13.93c14.66,15.35,31.85,26.93,51.27,35.58 c33.9,15.11,68.89,17.2,104.76,9.82c16.63-3.42,32.35-9.68,47.78-16.67c9.07-4.11,17.86-8.75,26.77-13.18c0,0,0,0,0,0 c0.25-0.3,0.49-0.6,0.74-0.9c0.44-0.02,0.93-0.17,1.29-0.01c0,0,0,0,0.01,0.01c0.28,0.13,0.09,0.53-0.23,0.69 c-1.73,3.5-4.14,6.52-6.71,9.41c-1.76,1.98-3.32,4.03-4.24,6.53c-3.82,4.23-3.95,8.76-0.55,12.7c10.61-4.09,17.08-12.5,22.96-21.59 c2.19-3.38,4.6-6.6,6.96-9.86c5.66-7.8,4.4-6.99,1.27-14.18c-0.7-1.61-1.76-3.03-2.96-4.33c-0.44-0.48-0.89-0.88-1.58-0.88l0,0 c-0.9-1.79-2.58-1.81-4.22-1.75c-4.87,0.18-9.73,0.42-14.6,0.64c-1.02-0.56-2.08-0.39-3.14-0.17c-1-0.6-2.07-0.41-3.13-0.27 c-0.64-0.54-1.44-0.34-2.17-0.44c-9.89-1.39-19.48-3.87-28.62-7.98c-0.69-0.31-1.4-0.56-2.1-0.84c-0.83-0.34-1.77-0.73-2.43,0.05 c-0.5,0.59-0.36,1.66,0.08,2.15c1.94,2.18,2.23,5.19,3.92,7.46c0.75,1.01,1.85,1.63,2.98,2.24c8.69,4.75,17.98,7.83,27.61,9.97 c0.86,0.19,1.77,0.25,2.56,0.61c0.92,0.42,0.66,1.2,0.2,1.89c-1-0.12-1.71,0.28-2.17,1.15c-0.93,0.07-1.83,0.21-2.3,1.18 c0,0,0,0,0,0c-0.23-0.11-0.38-0.04-0.45,0.2c-0.89,0.04-1.71,0.22-2.19,1.09c-0.6,0.16-1.23,0.24-1.79,0.5 c-6.15,2.82-12.25,5.74-18.43,8.49c-5.61,2.5-11.29,4.82-16.94,7.21c0,0,0,0,0,0c-1.57,0.45-3.15,0.84-4.69,1.35 c-15.02,4.87-30.4,7.86-46.19,8.54c-5.64,0.24-11.28,0.31-16.92,0.45c-1.07-0.6-2.17-0.36-3.28-0.14c-1.01-0.6-2.06-0.39-3.12-0.19 c-0.92-0.64-1.92-0.37-2.91-0.27c-0.57-0.48-1.2-0.45-1.85-0.22c-0.22-0.16-0.44-0.17-0.67-0.02c-0.64-0.52-1.43-0.34-2.15-0.46 c-3.56-0.61-7.21-0.58-10.7-1.63c-0.31,0.29-1.34,0.44-0.08,0.97c0.84,0.36,0.89,0.61,0.66,0.82c-0.2,0.18-0.61,0.33-0.91,0.48 c-11.18-2.28-21.95-5.88-32.49-10.19c0,0,0,0,0,0c0,0,0,0,0,0c-0.94-0.49-1.89-0.98-2.83-1.47c-5.62-2.93-11.25-5.86-16.87-8.78 c-0.11-0.24-0.27-0.4-0.47-0.49c-0.14-0.06-0.29-0.09-0.46-0.09c-0.18-0.39-0.49-0.57-0.91-0.56c-0.17-0.4-0.48-0.58-0.91-0.56 c-0.16-0.41-0.47-0.59-0.91-0.57c-0.16-0.41-0.46-0.61-0.9-0.58c-0.15-0.42-0.45-0.61-0.89-0.58l-0.01-0.01 c-0.14-0.41-0.44-0.61-0.87-0.58l-0.02-0.01c-0.27-0.21-0.56-0.41-0.86-0.59l-0.03-0.02c-0.14-0.41-0.42-0.61-0.86-0.59l-0.03-0.02 c-0.14-0.41-0.42-0.61-0.86-0.59l-0.03-0.02c0,0-0.01-0.01-0.01-0.01c0,0,0.01,0.01,0.01,0.01c-0.13-0.42-0.42-0.62-0.86-0.6 l-0.02-0.01c0,0,0,0,0,0c0,0,0,0,0,0c-0.13-0.42-0.42-0.62-0.86-0.6l-0.01-0.01c0,0,0,0,0,0c-0.14-0.42-0.43-0.63-0.87-0.62 c-2.56-2.07-5.11-4.14-7.67-6.21c0,0,0,0,0,0c0,0,0,0,0,0c-1.67-0.66-2.82-2.01-4.11-3.16c0.05-0.2,0.14-0.36,0.25-0.5 c0.17-0.22,0.39-0.37,0.69-0.46c-0.88-0.97-1.69-2.01-2.96-2.52c-0.4-0.12-0.77-0.29-1.06-0.61l0,0c0.35,0.2,0.7,0.41,1.06,0.61 c-0.22-0.37-0.47-0.69-0.94-0.62c-0.12-0.65-0.53-1.04-1.13-1.28c-0.07-0.42-0.29-0.68-0.74-0.7c-0.18-0.4-0.42-0.71-0.89-0.76 c-0.06-0.21-0.17-0.37-0.39-0.46c-0.69-1.1-1.57-2-2.67-2.69c-0.53-0.75-1.04-1.52-1.91-1.93c-0.16-0.6-0.65-0.92-1.1-1.27l0,0 c-2.08-2.96-4.69-5.52-6.28-9.03C13.22,21.85,11.76,21.67,11.54,23.02z M240.06,54.31c-0.01,0-0.01,0-0.02,0 c0,0.01,0.01,0.01,0.01,0.01c-0.01,0-0.02-0.01-0.02-0.01c0,0,0.01,0,0.01,0c0-0.01,0-0.02-0.01-0.03 C240.05,54.29,240.05,54.3,240.06,54.31z M44.66,55.46c0.06,0.06,0.12,0.12,0.18,0.18c-0.02-0.01-0.04-0.02-0.06-0.03 c-0.06-0.04-0.12-0.08-0.18-0.13C44.61,55.48,44.63,55.47,44.66,55.46z M55.52,60.1C55.52,60.1,55.52,60.1,55.52,60.1 c0,0.01-0.01,0.01-0.01,0.02c-0.02,0.02-0.03,0.05-0.05,0.07l-0.07,0.07l0.12-0.15c0-0.01-0.01-0.01-0.01-0.02 C55.5,60.1,55.51,60.1,55.52,60.1z M44.29,55.6c0.1-0.04,0.2-0.08,0.29-0.11c0.06,0.04,0.12,0.08,0.18,0.12 C44.62,55.54,44.46,55.53,44.29,55.6z M45.15,55.9c0.07,0.05,0.14,0.1,0.2,0.15c0,0.01,0.01,0.01,0.01,0.02 C45.29,56.01,45.22,55.95,45.15,55.9z M13.45,29.59c-0.01,0-0.02-0.01-0.03-0.01c0,0-0.01-0.01-0.01-0.01 c0-0.01-0.01-0.02-0.01-0.03C13.42,29.55,13.43,29.57,13.45,29.59z M14.38,30.9C14.38,30.9,14.38,30.9,14.38,30.9 c0,0.02,0,0.04,0.02,0.05C14.4,30.93,14.38,30.91,14.38,30.9z M28.43,38.87c-0.07,0.03-0.14,0.07-0.21,0.13 c-0.01-0.05-0.02-0.1-0.03-0.15C28.27,38.86,28.35,38.86,28.43,38.87z M26.64,36.66c-0.11-0.08-0.19-0.2-0.24-0.35c0,0,0,0,0.01,0 C26.47,36.45,26.54,36.57,26.64,36.66z"
                        style={{ fill: "inherit" }}
                      />
                      <path
                        d="M48.31,55.46c0.29,0.2,0.58,0.39,0.86,0.59C49.03,55.63,48.74,55.44,48.31,55.46z"
                        style={{ fill: "inherit" }}
                      />
                    </g>
                  </svg>
                  <div
                    className="uppercase inline-block font-bold px-8 py-px"
                    style={{
                      fontSize: Button.FontSize + "px",
                      background: Button.BackgroundColor,
                      color: Button.Color,
                    }}
                  >
                    {Button.Title}
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

export default Template18;
