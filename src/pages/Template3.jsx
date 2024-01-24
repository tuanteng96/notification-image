import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ColorPicker } from "@wellbees/color-picker-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { toAbsolutePath } from "../helpers/assetPath";
import * as htmlToImage from "html-to-image";

function Template3() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      Title: {
        Value: "Spring Message",
        FontSize: 60,
        Color: "#000",
      },
      Slogan: {
        Sub: "Start at",
        SubColor: "#000",
        SubFontSize: 28,
        Value: "$10",
        FontSize: 75,
        Color: "#000",
        Background: "#EAB37F",
      },
      Button: {
        BackgroundColor: "#EAB37F",
        Title: "visit now",
        Color: "#000",
        FontSize: 18,
      },
      Images: "/Thietke/myimage/anh-3.png",
      Background: "#E7DDCA",
      Color: "#EAB37F",
      Width: 600,
      Height: 600,
    },
  });

  const [Scale, setScale] = useState(1);

  const onSubmit = (data) => console.log(data);

  const componentRef = useRef();
  const elRef = useRef();

  const { Title, Background, Slogan, Width, Height, Images, Button, Color } = watch();

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
        bodyFormData.append("title", "mau-3-" + new Date().valueOf());
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
        <div className="grid grid-cols-4 md:grid-cols-2 gap-5 mb-5">
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Images"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images && (
                  <div className="absolute w-full h-full md:p-5 p-2">
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
                        const objectUrl = URL.createObjectURL(file);
                        field.onChange(objectUrl);
                      }}
                    />
                  )}
                />
              </label>
            </div>
          </div>
          {/* <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Icon"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Icon && (
                  <div className="absolute w-full h-full">
                    <img
                      className="object-contain w-full h-full"
                      src={toAbsolutePath(Icon)}
                    />
                  </div>
                )}
                {!Icon && (
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
                  name="Icon"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="Icon"
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
          </div> */}
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
                name="Slogan.Sub"
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
                name="Slogan.SubFontSize"
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
                name="Slogan.SubColor"
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
            <div className="w-[46px] ml-2">
              <Controller
                name="Button.FontSize"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition text-center"
                    type="text"
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
          className="md:flex items-center justify-center grow overflow-hidden md:overflow-auto relative"
          ref={elRef}
        >
          <div
            ref={componentRef}
            className={`relative bg-no-repeat bg-cover overflow-hidden el-scale font-alegreya`}
            style={{
              width: Width,
              height: Height,
              "--el-scale": Scale,
              background: `${Background}`,
              //transform: `scale(${Scale})`,
              transformOrigin: "0 0",
            }}
          >
            <div className="absolute -top-[20%] -left-[12%] w-[300px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                viewBox="79.5 192.8 839.0 610.0"
                x={0}
                xmlSpace="preserve"
                y={0}
                zoomAndPan="magnify"
                style={{ fill: "rgb(0, 0, 0)" }}
              >
                <g id="__id119_sydva6vwqt">
                  <path
                    d="M538.33,773.51c-38.44-0.32-80.73-4.24-120.07-2.79c-41.78,1.62-81.73,15.55-122.77,22.09 c-72.32,10.03-138.42-38.22-177.02-95.59c-28.41-40.65-38.96-91.42-33.32-140.56c1.04-16.43,7.8-30.87,13.9-45.51 c8.15-19.59,17.22-38.83,30.45-55.66c43.52-52.76,105.03-85.89,156.95-129.33c5.08-4.02,8.6-9.26,11.58-14.98 c16.2-33.36,32.99-69.71,68.57-86.16c57.94-32.18,133.91-22.9,183.42,21.22c12.34,11.25,22.65,24.42,35.16,35.42 c36.09,33.45,71.74,74.18,121.93,84.82c53.12,4.58,80.74-34.89,137.68-16.95c55.1,14.5,73.75,78.58,71.33,129.67 c-4.09,46.26-22.67,90.29-47.51,129.12C787.96,723.94,678.56,776.05,538.33,773.51z"
                    style={{ fill: Color }}
                  />
                </g>
              </svg>
            </div>
            <div className="absolute -bottom-[10%] -left-[15%] w-[250px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                version={1.0}
                viewBox="-11.2 -2.0 511.6 391.2"
                zoomAndPan="magnify"
                style={{ fill: "rgb(0, 0, 0)" }}
              >
                <g data-name="Layer 2">
                  <g
                    data-name="Layer 3 copy"
                    id="__id117_sydva6vwqt"
                    style={{ fill: Color }}
                  >
                    <path
                      d="M313.66,328.7c-1.5,0-3-.06-4.51-.19-13.33-1.13-25.22-7.34-36.71-13.35-7.49-3.92-15.23-8-23.19-10.47-19.31-6.09-40.38-3.41-60.75-.82-6.44.82-13.11,1.67-19.65,2.23-10.83.94-24.87,1.36-37.41-3.73-14.89-6-27.11-19.39-34.42-37.63-6.48-16.16-8.41-33.94-10.12-49.63-3.15-29-7.08-65.05,4.54-97.1,10.85-29.93,34.69-53.79,63.79-63.84l1,2.83-1-2.83C178.78,46,206,47.9,231.9,59.44c24.4,10.87,45.51,29.56,57.91,51.3,1.7,3,3.29,6.08,4.83,9.08,4,7.74,7.73,15.05,13.4,20.94,8.82,9.16,22.36,14.58,38.12,15.26,7.56.33,15.35-.4,22.88-1.11a184.8,184.8,0,0,1,22.43-1.17c19,.55,34.59,8.21,41.63,20.49,3.2,5.59,4.95,12.39,5.49,21.38,1.6,26.74-8,55.21-26.23,78.11-16.34,20.48-39.64,37-67.38,47.93C336.41,325,325.36,328.7,313.66,328.7ZM222.43,295a94.18,94.18,0,0,1,28.62,4c8.47,2.66,16.45,6.84,24.17,10.87,11.47,6,22.31,11.67,34.44,12.69s24.07-2.91,33.13-6.46c26.76-10.5,49.2-26.43,64.88-46.09,17.36-21.76,26.44-48.73,24.93-74-.48-8-2-14-4.71-18.76-6-10.45-19.67-17-36.59-17.47a176.85,176.85,0,0,0-21.7,1.15c-7.73.72-15.73,1.47-23.7,1.13-17.31-.75-32.29-6.82-42.18-17.09-6.29-6.54-10.42-14.59-14.42-22.37-1.51-2.94-3.07-6-4.7-8.85C262.16,74.39,207.07,42.6,157.19,59.84c-27.4,9.46-49.87,32-60.11,60.21-11.14,30.74-7.3,66.05-4.21,94.41,1.66,15.31,3.55,32.65,9.72,48,6.6,16.46,17.94,29,31.1,34.3,11.36,4.61,24.48,4.19,34.65,3.32,6.41-.56,13-1.4,19.41-2.21C199.2,296.46,210.86,295,222.43,295Z"
                      style={{ fill: "inherit" }}
                    />
                    <path
                      d="M301.81,278.65a104.43,104.43,0,0,1-42.1-8.66c-3.21-1.42-6.38-3-9.44-4.55a118.19,118.19,0,0,0-15.38-6.86c-6.86-2.31-14.3-3.36-21.5-4.38l-3.8-.54c-15.46-2.27-35.31-6.22-51.69-16.78-17.22-11.12-28.11-28.8-28.41-46.14-.15-8.91,2.35-17.65,5.08-25.77a301,301,0,0,1,21.19-48.45h0c5.62-10.29,13.77-11.32,21.66-12.31,2.47-.32,5-.64,7.64-1.24a61.34,61.34,0,0,1,39.81,4.39c14.74,7,27.59,20,36.18,36.64,1.09,2.1,2.12,4.27,3.11,6.36,2.41,5.08,4.68,9.88,7.87,14.11,6.8,9,17.74,15.5,34.42,20.43,4,1.18,8.17,2.26,12.19,3.29,9.67,2.49,19.66,5.07,28.92,9.52,15.58,7.49,26.19,19.94,28.4,33.3a27.82,27.82,0,0,1-2.12,16.74c-3.19,6.53-9.11,11-13.92,14.09C342.86,273,322.3,278.65,301.81,278.65ZM161,119.4a294.52,294.52,0,0,0-20.76,47.48c-2.95,8.8-4.9,16.2-4.77,23.76.27,15.37,10.1,31.15,25.67,41.19,15.31,9.88,33.51,13.58,49.3,15.89,1.25.19,2.51.36,3.77.54,7.47,1.06,15.19,2.15,22.57,4.63A124,124,0,0,1,253,260.08c3,1.51,6.09,3.06,9.17,4.43,29.93,13.22,67,10.2,94.51-7.7,4.16-2.71,9.26-6.48,11.8-11.69A22.12,22.12,0,0,0,370,232c-1.89-11.42-11.26-22.22-25.09-28.87-8.72-4.19-18.42-6.69-27.8-9.11-4.07-1.05-8.28-2.13-12.4-3.35-18-5.31-29.89-12.48-37.51-22.57-3.56-4.72-6.07-10-8.5-15.15-1-2.05-2-4.16-3-6.18-8-15.46-19.86-27.52-33.43-34a55.26,55.26,0,0,0-35.89-4,79.74,79.74,0,0,1-8.23,1.34c-7.54,1-13,1.64-17.15,9.24Z"
                      style={{ fill: "inherit" }}
                    />
                    <path
                      d="M243.88,241.65a65.42,65.42,0,0,1-8.33-.54c-14.55-1.89-27.83-8.15-37.78-13.39-9.27-4.88-18.46-10.72-23-20.31-4.93-10.53-2.46-21.8-.28-31.74.59-2.67,1.06-5.46,1.55-8.4,1.28-7.61,2.6-15.47,6.15-22.24,4.41-8.42,10.11-10,14.1-9.83,11.61.48,23.6,16.24,28,26.74a75.58,75.58,0,0,1,4,14.16c1.44,6.89,2.81,13.4,6.8,18.41,6,7.53,16,9.68,26.55,12,3.73.81,7.58,1.64,11.24,2.72,2.83.84,6,2.07,7.95,4.86,4.18,5.9.25,13.57-5.8,18.09C266.77,238.32,255.71,241.65,243.88,241.65ZM195.8,141.19c-3.21,0-5.91,2.17-8.25,6.63-3.1,5.92-4.34,13.3-5.54,20.44-.49,2.89-1,5.88-1.61,8.69-2.07,9.46-4.22,19.23-.15,27.91,3.74,8,12,13.15,20.31,17.55,9.51,5,22.16,11,35.76,12.75,13.36,1.73,26.17-1.13,35.16-7.84,3-2.26,6.53-6.93,4.49-9.82-.91-1.29-2.91-2-4.75-2.57-3.44-1-7.19-1.82-10.81-2.6-11.14-2.4-22.66-4.88-30-14.08-4.87-6.13-6.45-13.65-8-20.92a69.9,69.9,0,0,0-3.6-13.05h0c-4-9.41-14.58-22.75-22.76-23.08Z"
                      style={{ fill: "inherit" }}
                    />
                    <path
                      d="M60.41,389.16c-1.06,0-2.12,0-3.18-.05-11.47-.38-19.63-3.35-24.95-9.09-4.41-4.75-6.88-11.52-7.57-20.69-.92-12.29,1.17-24.55,3.19-36.41,2.05-12.06,4.18-24.53,3-36.64-1.46-14.43-7.37-27.6-13.63-41.54-2.93-6.53-6-13.29-8.45-20.13-20.06-55-5-121.94,37.5-166.58,19.94-21,45.85-37.24,75-47.12A207.19,207.19,0,0,1,209.71,1.2C266.05,7.37,322,37,363.39,82.62c2.85,1.08,6.48,5.27,14.18,15.92,1.34,1.85,2.5,3.46,3,4.08.84,1,1.66,2,2.52,3.09,3.13,3.91,6.67,8.34,10.79,9.72,2.74.91,6.25.5,9.64.1,1.52-.18,3.09-.37,4.61-.43,6.16-.28,12.41-.29,18.46-.3,3,0,5.94,0,8.91,0,15.69-.16,37.46,1.47,45.2,17.94,3.31,7,2.87,14.62,2.45,22a65.38,65.38,0,0,0,.12,13.3c.85,5.63,3.27,10.87,5.82,16.42,1.17,2.55,2.39,5.18,3.44,7.86,7.84,20,6.58,42.26,5.46,61.91-.88,15.6-2,35-11.65,50.35-10.46,16.57-30.06,27.67-59.92,33.94A295.79,295.79,0,0,1,312.9,339.8c-5.37-1-10.79-2.15-16-3.27-11.7-2.5-23.8-5.09-35.82-5.9-40.8-2.76-81.24,14.88-115.94,31.62l-2.7,1.3C116.33,376.15,89.4,389.16,60.41,389.16ZM187.73,6C135.56,6,84.48,26.59,50.63,62.17c-41,43-55.51,107.48-36.22,160.39,2.42,6.63,5.41,13.29,8.3,19.72,6.17,13.77,12.56,28,14.12,43.4,1.3,12.91-.89,25.79-3,38.25-2,11.5-4,23.39-3.12,35,.58,7.75,2.54,13.33,6,17.05,4.18,4.5,11,6.85,20.75,7.17,28.7.93,56-12.22,82.37-25l2.7-1.31c35.4-17.07,76.69-35.06,119-32.2,12.45.84,24.77,3.48,36.68,6,5.2,1.12,10.57,2.27,15.86,3.24a289.75,289.75,0,0,0,111.24-1.34c28.18-5.92,46.53-16.15,56.07-31.27,8.85-14,9.86-31.8,10.74-47.49,1.08-19,2.3-40.6-5.06-59.38-1-2.52-2.16-5.07-3.3-7.54-2.62-5.69-5.32-11.56-6.3-18a70.65,70.65,0,0,1-.18-14.53c.4-6.9.77-13.42-1.89-19.07-6.27-13.33-25.66-14.65-39.7-14.49-3,0-6,0-9,0-6,0-12.17,0-18.2.29-1.3.06-2.7.22-4.18.4-3.86.45-8.23,1-12.24-.37-5.8-1.94-9.93-7.11-13.57-11.66-.84-1-1.63-2-2.39-2.93s-1.82-2.35-3.35-4.48c-2.5-3.45-9.06-12.54-11.34-13.77a2.91,2.91,0,0,1-1.81-1c-40.48-44.9-95.33-74.11-150.5-80.16A198,198,0,0,0,187.73,6Zm174,82.31h0Z"
                      style={{ fill: "inherit" }}
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="absolute w-[50px] top-5 right-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                viewBox="217.5 51.0 564.5 897.1"
                x={0}
                xmlSpace="preserve"
                y={0}
                zoomAndPan="magnify"
                style={{ fill: "rgb(0, 0, 0)" }}
              >
                <g id="__id121_sydva6vwqt">
                  <path
                    d="M757.93,576.14c-12.1-1.03-24.04-0.15-35.99,2.91c-31.38,8.07-60.49,21.41-88.96,36.57 c-38.02,20.25-72.1,45.27-99.09,79.26c-0.56-0.54-1.12-1.08-1.68-1.62c0,0,0,0,0,0c0-0.01,0.01-0.01,0.01-0.02 c0.33-1.03,0.58-2.12,1.03-3.09c20.25-44.57,38.48-89.96,54.52-136.2c16.22-46.72,31.2-93.84,45.54-141.2 c10.58-34.93,21.62-69.77,29.62-105.39c8.7-38.57,12.92-77.83,16.68-117.16c3.18-33.47,2.52-66.86-0.45-100.24 c-0.91-10.07-2.37-20.25-8.28-29.02c-5.52-8.22-13.83-9.98-21.95-4.21c-3.55,2.52-6.88,5.55-9.67,8.88 c-14.61,17.43-25.92,37.08-33.93,58.22c-17.71,46.75-34.69,93.78-51.48,140.9c-19.31,54.12-40.57,107.43-63.92,159.94 c-18.95,42.72-36.29,86.11-47.6,131.62c-7.88,31.78-11.28,64.13-12.98,96.87c-1.97,38.3,0.24,76.26,3.34,114.31 c1.09,13.7,3.3,27.5,1.21,41.48c-4.52-15.49-8.67-31.05-12.16-46.75c-13.58-61.19-17.19-123.74-24.71-185.78 c-4.4-36.2-9.34-72.35-17.71-107.85c-19.5-82.68-50.09-160.97-94.45-233.59c-9.58-15.71-18.95-31.69-31.93-44.94 c-7.52-7.73-18.04-5.91-23.44,3.4c-3.94,6.82-5.34,14.46-6,22.1c-3.09,33.93-3.73,68.01-4.82,102.03 c-1.21,37.66,0.82,75.32,3.18,112.88c1.52,24.38,3.79,48.73,6.97,72.89c4.76,35.87,10.19,71.65,16.1,107.34 c5,30.05,10.43,60.22,23.44,88.08c33.78,72.5,76.41,139.81,121.16,205.88c6.22,9.22,14.13,16.89,23.98,22.26 c9.43,5.12,18.74,10.34,27.29,16.95c4.18,3.24,9.4,4.21,13.55,0c17.07-17.31,39.21-26.05,60.46-36.29 c21.32-10.25,42.69-20.47,62.52-33.47c42.9-28.2,81.38-61.73,117.74-97.88c32.69-32.5,57.09-70.25,74.38-112.79 c7.19-17.68,12.55-35.84,12.22-55.12C781.37,590.91,771.33,577.3,757.93,576.14z M435.98,915.43 c-12.86-5.03-23.35-12.83-30.87-23.98c-41.84-62.01-81.9-125.13-114.55-192.63c-14.04-29.05-20.19-60.31-25.77-91.69 c-8.07-45.33-14.31-90.99-19.53-136.75c-3.18-28.08-4.85-56.34-5.4-84.63c-0.24-12.37-1.58-24.74-1.33-37.08 c0.79-37.63,1.97-75.29,3.24-112.91c0.27-7.52,1.64-14.95,2.76-24.74c11.13,15.55,20.5,29.35,28.8,43.81 c43.78,76.17,74.95,157.15,91.51,243.48c6.97,36.32,11.92,73.04,15.55,109.91c6.37,64.98,12.49,130.02,29.87,193.26 c9.25,33.6,19.25,67.01,25.35,101.39C436.35,906.94,436.92,910.92,435.98,915.43z M451.9,765.65c-2.21-24.32-3.03-48.79-3.58-73.22 c-1.73-77.23,13.98-150.97,44.09-222.01c19.83-46.78,41.51-92.81,58.97-140.6c18.01-49.27,35.75-98.63,53.7-147.93 c10.43-28.65,19.68-57.82,35.87-83.99c3.34-5.34,7.16-10.43,10.92-15.49c0.91-1.21,2.58-2.7,3.82-2.64 c1.73,0.12,1.94,2.33,2.12,3.97c1.09,10.37,2.64,20.71,3.18,31.08c2.64,50.73-3.79,100.79-10.82,150.88 c-6.09,43.21-19.5,84.41-31.65,125.98c-16.31,55.61-33.87,110.88-53.43,165.43c-17.04,47.6-36.2,94.36-57.46,140.29 c-16.62,35.87-39.33,68.74-51.76,109.15C451.39,791.51,453.09,778.44,451.9,765.65z M755.87,640.7 c-13.89,42.75-36.32,80.77-67.25,113.25c-35.69,37.48-74.8,71.25-117.86,100.21c-17.59,11.79-36.26,21.8-55.34,31.08 c-19.25,9.34-38.23,19.16-57.12,30.68c-3.34-24.62-1.09-48.09,9.43-69.13c22.86-45.69,45.51-91.69,76.68-132.56 c23.44-30.68,52.12-55.58,86.23-74.16c31.2-17.01,62.55-33.41,97.54-41.51c7.79-1.79,15.58-3.15,23.62-2.76 c4.79,0.21,7.46,2.18,8.67,7.03C763.72,616.08,759.81,628.57,755.87,640.7z"
                    style={{ fill: Color }}
                  />
                </g>
              </svg>
            </div>
            <div className="absolute right-[5%] top-[5%] rounded-full w-[400px] h-[400px]">
              <img
                className="w-full h-full object-cover rounded-full"
                src={toAbsolutePath(Images)}
                alt="Anh"
              />
              <div
                className="absolute z-20 w-[180px] h-[180px] rounded-full flex justify-center items-center text-center -left-[28%] bottom-[6%]"
                style={{
                  background: Color,
                }}
              >
                <div className="absolute w-[25px] -top-16 right-2/4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    viewBox="217.5 51.0 564.5 897.1"
                    x={0}
                    xmlSpace="preserve"
                    y={0}
                    zoomAndPan="magnify"
                    style={{ fill: "rgb(0, 0, 0)" }}
                  >
                    <g id="__id121_sydva6vwqt">
                      <path
                        d="M757.93,576.14c-12.1-1.03-24.04-0.15-35.99,2.91c-31.38,8.07-60.49,21.41-88.96,36.57 c-38.02,20.25-72.1,45.27-99.09,79.26c-0.56-0.54-1.12-1.08-1.68-1.62c0,0,0,0,0,0c0-0.01,0.01-0.01,0.01-0.02 c0.33-1.03,0.58-2.12,1.03-3.09c20.25-44.57,38.48-89.96,54.52-136.2c16.22-46.72,31.2-93.84,45.54-141.2 c10.58-34.93,21.62-69.77,29.62-105.39c8.7-38.57,12.92-77.83,16.68-117.16c3.18-33.47,2.52-66.86-0.45-100.24 c-0.91-10.07-2.37-20.25-8.28-29.02c-5.52-8.22-13.83-9.98-21.95-4.21c-3.55,2.52-6.88,5.55-9.67,8.88 c-14.61,17.43-25.92,37.08-33.93,58.22c-17.71,46.75-34.69,93.78-51.48,140.9c-19.31,54.12-40.57,107.43-63.92,159.94 c-18.95,42.72-36.29,86.11-47.6,131.62c-7.88,31.78-11.28,64.13-12.98,96.87c-1.97,38.3,0.24,76.26,3.34,114.31 c1.09,13.7,3.3,27.5,1.21,41.48c-4.52-15.49-8.67-31.05-12.16-46.75c-13.58-61.19-17.19-123.74-24.71-185.78 c-4.4-36.2-9.34-72.35-17.71-107.85c-19.5-82.68-50.09-160.97-94.45-233.59c-9.58-15.71-18.95-31.69-31.93-44.94 c-7.52-7.73-18.04-5.91-23.44,3.4c-3.94,6.82-5.34,14.46-6,22.1c-3.09,33.93-3.73,68.01-4.82,102.03 c-1.21,37.66,0.82,75.32,3.18,112.88c1.52,24.38,3.79,48.73,6.97,72.89c4.76,35.87,10.19,71.65,16.1,107.34 c5,30.05,10.43,60.22,23.44,88.08c33.78,72.5,76.41,139.81,121.16,205.88c6.22,9.22,14.13,16.89,23.98,22.26 c9.43,5.12,18.74,10.34,27.29,16.95c4.18,3.24,9.4,4.21,13.55,0c17.07-17.31,39.21-26.05,60.46-36.29 c21.32-10.25,42.69-20.47,62.52-33.47c42.9-28.2,81.38-61.73,117.74-97.88c32.69-32.5,57.09-70.25,74.38-112.79 c7.19-17.68,12.55-35.84,12.22-55.12C781.37,590.91,771.33,577.3,757.93,576.14z M435.98,915.43 c-12.86-5.03-23.35-12.83-30.87-23.98c-41.84-62.01-81.9-125.13-114.55-192.63c-14.04-29.05-20.19-60.31-25.77-91.69 c-8.07-45.33-14.31-90.99-19.53-136.75c-3.18-28.08-4.85-56.34-5.4-84.63c-0.24-12.37-1.58-24.74-1.33-37.08 c0.79-37.63,1.97-75.29,3.24-112.91c0.27-7.52,1.64-14.95,2.76-24.74c11.13,15.55,20.5,29.35,28.8,43.81 c43.78,76.17,74.95,157.15,91.51,243.48c6.97,36.32,11.92,73.04,15.55,109.91c6.37,64.98,12.49,130.02,29.87,193.26 c9.25,33.6,19.25,67.01,25.35,101.39C436.35,906.94,436.92,910.92,435.98,915.43z M451.9,765.65c-2.21-24.32-3.03-48.79-3.58-73.22 c-1.73-77.23,13.98-150.97,44.09-222.01c19.83-46.78,41.51-92.81,58.97-140.6c18.01-49.27,35.75-98.63,53.7-147.93 c10.43-28.65,19.68-57.82,35.87-83.99c3.34-5.34,7.16-10.43,10.92-15.49c0.91-1.21,2.58-2.7,3.82-2.64 c1.73,0.12,1.94,2.33,2.12,3.97c1.09,10.37,2.64,20.71,3.18,31.08c2.64,50.73-3.79,100.79-10.82,150.88 c-6.09,43.21-19.5,84.41-31.65,125.98c-16.31,55.61-33.87,110.88-53.43,165.43c-17.04,47.6-36.2,94.36-57.46,140.29 c-16.62,35.87-39.33,68.74-51.76,109.15C451.39,791.51,453.09,778.44,451.9,765.65z M755.87,640.7 c-13.89,42.75-36.32,80.77-67.25,113.25c-35.69,37.48-74.8,71.25-117.86,100.21c-17.59,11.79-36.26,21.8-55.34,31.08 c-19.25,9.34-38.23,19.16-57.12,30.68c-3.34-24.62-1.09-48.09,9.43-69.13c22.86-45.69,45.51-91.69,76.68-132.56 c23.44-30.68,52.12-55.58,86.23-74.16c31.2-17.01,62.55-33.41,97.54-41.51c7.79-1.79,15.58-3.15,23.62-2.76 c4.79,0.21,7.46,2.18,8.67,7.03C763.72,616.08,759.81,628.57,755.87,640.7z"
                        style={{ fill: Color }}
                      />
                    </g>
                  </svg>
                </div>
                <div>
                  <div
                    className="font-medium uppercase"
                    style={{
                      fontSize: (Slogan.SubFontSize || 20) + "px",
                      color: Slogan.SubColor,
                    }}
                  >
                    {Slogan.Sub}
                  </div>
                  <div
                    className="font-medium"
                    style={{
                      fontSize: (Slogan.FontSize || 32) + "px",
                      color: Slogan.Color,
                      lineHeight: "50px",
                    }}
                  >
                    {Slogan.Value}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-full flex justify-between items-center px-16 pb-12">
              <div
                className="capitalize font-medium flex-1"
                style={{
                  color: Title.Color,
                  fontSize: Number(Title.FontSize || 30) + "px",
                  lineHeight: Number(Title.FontSize || 30) + 5 + "px",
                }}
              >
                <div>{Title.Value}</div>
              </div>
              <button
                className="font-medium rounded-full px-12 py-2 uppercase"
                style={{
                  background: Button.BackgroundColor,
                  color: Button.Color,
                  fontSize: Button.FontSize,
                  lineHeight: "30px",
                }}
              >
                {Button.Title}
              </button>
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

export default Template3;
