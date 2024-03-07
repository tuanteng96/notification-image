import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ColorPicker } from "@wellbees/color-picker-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { toAbsolutePath } from "../helpers/assetPath";
import * as htmlToImage from "html-to-image";

function Template16() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      Title: {
        Value: "Beauty & Spa",
        FontSize: 65,
        Color: "#48362B",
      },
      Voucher: {
        Title: "disc",
        TitleFontSize: 14,
        TitleColor: "#48362B",
        Value: "50%",
        FontSize: 38,
        Color: "#48362B",
      },
      Slogan: {
        Value: "Treatment Package",
        FontSize: 12,
        Color: "#48362B",
      },
      Copyright: {
        Value: "www.reallygreatsite.com",
        FontSize: 18,
        Color: "#392E2C",
      },
      Text1: {
        Value: "Body Treatment",
        Color: "#48362B",
        FontSize: 14,
      },
      Text2: {
        Value: "Hydrotherapy Treatment",
        Color: "#48362B",
        FontSize: 14,
      },
      Text3: {
        Value: "Massage Therapies",
        Color: "#48362B",
        FontSize: 14,
      },
      Text4: {
        Value: "Makeup & Waxing",
        Color: "#48362B",
        FontSize: 14,
      },
      Text5: {
        Value: "Nail Treatment",
        Color: "#48362B",
        FontSize: 14,
      },
      Color: "#763c00",
      Images: "/Thietke/myimage/anh-16.png",
      Images1: "/Thietke/myimage/anh-16-1.jpeg",
      Background: "/Thietke/myimage/bg-16.png",
      Icon: "/Thietke/myimage/check-16.png",
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
    Voucher,
    Images,
    Images1,
    Background,
    Slogan,
    Width,
    Height,
    Icon,
    Text1,
    Text2,
    Text3,
    Text4,
    Text5,
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
        bodyFormData.append("title", "mau-16-" + new Date().valueOf());
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
                htmlFor="Images1"
                className="relative flex flex-col items-center justify-center w-full h-20 md:h-36 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                {Images1 && (
                  <div className="absolute w-full h-full p-2 md:p-5">
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
                name="Text1.Value"
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
                name="Text1.FontSize"
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
                name="Text1.Color"
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
                name="Text2.Value"
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
                name="Text2.FontSize"
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
                name="Text2.Color"
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
                name="Text3.Value"
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
                name="Text3.FontSize"
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
                name="Text3.Color"
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
                name="Text4.Value"
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
                name="Text4.FontSize"
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
                name="Text4.Color"
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
                name="Text5.Value"
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
                name="Text5.FontSize"
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
                name="Text5.Color"
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
                name="Voucher.Title"
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
                name="Voucher.TitleFontSize"
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
                name="Voucher.TitleColor"
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
          <div className="flex">
            <div className="flex-1">
              <Controller
                name="Voucher.Value"
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
                name="Voucher.FontSize"
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
                name="Voucher.Color"
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
            <div className="flex flex-col h-full">
              <div className="flex flex-col items-center justify-center px-16 pt-16">
                <div
                  className="relative font-medium font-thasadith"
                  style={{
                    fontSize: Title.FontSize + "px",
                    color: Title.Color,
                    lineHeight: Title.FontSize + 5 + "px",
                  }}
                >
                  {Title.Value}
                  <div className="absolute rotate-[30deg] top-0 -right-[5%]">
                    <svg
                      className="w-12"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      preserveAspectRatio="xMidYMid meet"
                      version={1.0}
                      viewBox="-0.2 -0.9 215.6 126.2"
                      zoomAndPan="magnify"
                      style={{ fill: "rgb(0, 0, 0)" }}
                    >
                      <g id="__id163_s7394575j">
                        <path
                          d="M123.9747,7.8489c-0.6663-2.9478-2.0636-6.0089-4.9819-7.2927c-3.2853-1.4454-7.0496,0.085-9.2018,2.7651 c-2.3431,2.9177-2.7221,6.7318-2.9112,10.3376c-0.8676,16.5416-0.6286,33.15,0.4604,49.675 c1.0902,16.5438,3.0579,33.0398,5.9243,49.3704c0.3242,1.8466,0.6632,3.6905,1.0106,5.5329 c0.0141,0.2021,0.0531,0.3928,0.1259,0.5649c0.2874,0.9946,1.1455,1.3418,1.9844,1.2045c0.7822-0.0085,1.5435-0.4301,1.813-1.407 c4.4327-16.0678,7.2923-32.5622,8.5579-49.1821c1.2639-16.5971,0.9149-33.3181-1.0655-49.8455 C125.224,15.6761,124.8407,11.68,123.9747,7.8489z M116.3752,81.79c0.2358,0.8928,0.4916,1.7801,0.7644,2.6628 c-0.2057-0.1285-0.4296-0.2253-0.6603-0.2772C116.4436,83.3804,116.4059,82.5854,116.3752,81.79z M112.6427,6.7787 c-0.5275,1.1831-1.0215,2.3784-1.4746,3.5881c0.2143-1.4304,0.6016-2.8554,1.358-4.021 C112.5447,6.494,112.5867,6.6382,112.6427,6.7787z M111.5751,66.6235c0.1725,1.7651,0.3129,3.5323,0.4164,5.3019 c-0.0221-0.2606-0.0483-0.5209-0.0699-0.7816C111.7967,69.6378,111.6855,68.1307,111.5751,66.6235z M123.0111,65.6362 c0.0652-2.0551,0.0778-4.1137,0.0189-6.1771c-0.095-3.3218-0.4007-6.6374-0.9146-9.9204c0.4121,0.2399,0.9018,0.3192,1.3662,0.238 c0.0028,5.1331-0.1322,10.2664-0.4371,15.3904C123.0353,65.3237,123.0207,65.4797,123.0111,65.6362z M85.3007,110.1311 c0.0416-0.0836,0.075-0.1713,0.1034-0.2628c0.0123-0.0382,0.0229-0.0759,0.0331-0.1147c0.014-0.0588,0.0267-0.1177,0.0349-0.1794 c0.0574-0.3334,0.0341-0.6722-0.097-0.981c-2.7745-10.8527-5.6784-21.7225-10.0068-32.0773 c-4.2134-10.0797-9.8229-20.1171-17.8698-27.6615c-4.0359-3.7839-8.9226-6.9311-14.5192-7.5829 c-1.251-0.1457-2.4903-0.1376-3.7397,0.0174c-1.8745,0.2326-2.3579,2.191-2.6898,3.8018c-0.5746,2.7896-0.3276,5.7001,0.5385,8.4044 c1.7253,5.387,5.6451,9.566,9.4075,13.6396c0.4481,0.7189,0.9102,1.4292,1.3993,2.121c1.2805,1.8108,2.6053,3.8779,4.7497,4.6973 c1.7969,2.0385,3.5753,4.0932,5.3375,6.1614c8.2903,9.7301,16.3034,19.7273,23.7313,30.1345 c0.271,0.569,0.7488,0.8767,1.2758,0.9763c0.4845,0.1457,1.0157,0.108,1.5153-0.1843c0.2657-0.1555,0.488-0.3944,0.6603-0.6696 c0.0167-0.0237,0.03-0.0497,0.0457-0.0744C85.2422,110.2424,85.2738,110.1886,85.3007,110.1311z M40.635,45.1979 c0.0812-0.0017,0.1623-0.0032,0.2433-0.0035c-0.1165,0.0799-0.2261,0.1705-0.3253,0.2739 C40.5791,45.3781,40.6062,45.288,40.635,45.1979z M57.7874,66.6833c-0.6356-1.5744-1.3021-3.1366-2.0342-4.667 c-0.0696-0.1455-0.1489-0.2859-0.2195-0.4309c1.0624,1.3681,2.106,2.7503,3.1366,4.1422 C58.273,65.9497,57.9565,66.2847,57.7874,66.6833z M49.0396,61.4327c-0.3236,0.121-0.6136,0.3152-0.845,0.5569 c-0.2084-0.4041-0.4341-0.7992-0.6299-1.2095c-0.6915-1.4486-1.2659-2.9472-1.7777-4.467 C46.9176,57.9894,48.0092,59.6923,49.0396,61.4327z M40.1801,48.1205c0.0237,0.2521,0.0942,0.5015,0.2054,0.7412 c-0.0663,0.1262-0.1168,0.261-0.1565,0.4006C40.1924,48.8821,40.1775,48.5015,40.1801,48.1205z M78.4141,97.9973 c0.1639,0.5833,0.3279,1.1665,0.4886,1.7507c-0.352-0.4644-0.7057-0.9274-1.0597-1.3903 C78.0512,98.2663,78.2436,98.1448,78.4141,97.9973z M58.2608,122.3157c-10.0176-13.4974-25.8685-21.9542-42.598-23.2039 c-4.757-0.3553-9.5285-0.0582-14.2177,0.8057c-1.1016,0.2029-1.6121,1.48-1.3969,2.4602c0.8275,3.77,5.2916,5.4681,8.3102,7.1431 c3.6313,2.0149,7.2999,3.9655,11.0388,5.774c7.3865,3.5729,15.0839,6.6443,23.1191,8.3973 c4.6028,1.0042,9.306,1.5724,14.0175,1.6331c0.062,0.0008,0.1155-0.0113,0.1745-0.0151c0.0396-0.0027,0.0787-0.0048,0.1183-0.0102 c0.6816-0.0806,1.1509-0.4619,1.4055-0.9667C58.6003,123.7132,58.698,122.9047,58.2608,122.3157z M50.0112,118.8298 c0.1138,0.1135,0.2341,0.2205,0.3469,0.335c-0.1266-0.051-0.25-0.1089-0.3758-0.1616 C49.992,118.9452,50.0078,118.89,50.0112,118.8298z M13.5197,105.0421c1.6675,0.2361,3.3224,0.5676,4.966,0.9648 c-0.5669-0.1103-1.134-0.2211-1.7003-0.3321C15.7806,105.4779,14.6495,105.2974,13.5197,105.0421z M17.5216,109.8883 c0.6166,0.1202,1.2324,0.2443,1.8484,0.3671c0.0666,0.2664,0.1906,0.5219,0.3801,0.7548 C19.0043,110.6409,18.2613,110.2675,17.5216,109.8883z M171.5468,86.5741c3.3063-4.165,6.4301-8.4777,9.2153-13.0103 c2.7532-4.4805,5.3987-9.2739,6.4232-14.4861c0.5107-2.5981,0.6237-5.2196,0.2417-7.8411c-0.3239-2.223-1.0066-5.0911-2.7167-6.6766 c-2.0621-1.9118-4.9452-0.9581-6.9893,0.4361c-1.9001,1.296-3.6948,2.7713-5.3488,4.3686 c-6.8167,6.5829-11.2551,15.1724-14.744,23.8731c-4.4182,11.0182-7.7463,22.5281-10.344,34.1096 c-0.0525,0.054-0.1049,0.1081-0.1573,0.1621c-0.9434,0.9709-0.6058,2.2079,0.1835,2.9c0.9121,1.1772,3.1023,1.2725,3.5081-0.58 c0.0364-0.1661,0.0763-0.3313,0.113-0.4973C158.0637,101.9886,165.1765,94.5989,171.5468,86.5741z M179.9093,54.7918 c-0.001-0.0003-0.002-0.0005-0.0029-0.0009c0.002-0.0047,0.0039-0.0086,0.0059-0.0134 C179.9112,54.7823,179.9104,54.787,179.9093,54.7918z M177.4734,58.9887c-0.1821,0.0092-0.3636,0.0397-0.5411,0.1 c0.1739-0.2011,0.3425-0.4058,0.514-0.6091C177.4584,58.6501,177.4643,58.819,177.4734,58.9887z M169.4116,82.8664 c-0.5219,0.6677-1.0586,1.3228-1.5908,1.9818c-0.0528-0.0651-0.1012-0.1324-0.1652-0.1912 c-0.0028-0.0026-0.0063-0.0043-0.0091-0.0069c3.7405-4.1737,6.7324-8.9142,9.3545-13.8541 c0.1702,0.1361,0.3666,0.2333,0.5763,0.2984C175.0973,75.1771,172.3531,79.1038,169.4116,82.8664z M181.2955,64.2212 c0.0967-0.8245,0.1686-1.6517,0.1998-2.4811c0.4315-0.9446,0.8508-1.8937,1.2383-2.8532c0.3303-0.818,0.6091-1.6414,0.8258-2.4678 c-0.0441,0.394-0.085,0.7892-0.153,1.1764C183.0009,59.9026,182.244,62.1005,181.2955,64.2212z M182.1476,47.6755 c0.0348,0.0297,0.0641,0.0741,0.0968,0.1094c-0.3895-0.1608-0.8241-0.2109-1.194-0.1314 C181.4359,47.4794,181.8316,47.4061,182.1476,47.6755z M178.4291,49.368c-0.3705,0.4377-0.6842,0.9238-0.9711,1.4354 c-0.1531-0.1111-0.3192-0.2027-0.4985-0.2644C177.4388,50.132,177.9286,49.7415,178.4291,49.368z M159.4185,79.7792 c-0.0251,0.5615-0.0674,1.1226-0.0729,1.6844c-0.0044,0.4537,0.1763,0.8934,0.4619,1.2484 c-0.7328,1.6246-1.4656,3.2491-2.1984,4.8737c-0.8506,1.8857-1.7012,3.7714-2.5518,5.6571 C156.3811,88.7142,157.83,84.2224,159.4185,79.7792z M212.8002,93.003c-2.6259-2.3052-6.9172-0.7097-9.6148,0.5855 c-6.0009,2.8813-11.6226,6.7979-16.8209,10.9285c-5.7463,4.5661-10.9799,9.748-15.6231,15.4309 c-1.2853,1.5731,0.2327,3.6876,1.7279,3.4855c0.499,0.2208,1.0935,0.2454,1.7108-0.0775 c6.4908-3.3951,12.9822-6.7889,19.4723-10.1854c0.3809,0.0522,0.797-0.0157,1.2218-0.251c1.2985-0.7192,2.5427-1.5276,3.7573-2.3774 c1.8836-1.0119,3.7535-2.0487,5.5832-3.1558c2.7809-1.6828,5.9241-3.4669,8.0844-5.9404 C214.2953,99.1601,215.4317,95.313,212.8002,93.003z M200.8859,99.3821c0.6581-0.3983,1.3277-0.8013,2.0085-1.1881 c-0.6821,0.459-1.3586,0.9257-2.0328,1.3962C200.872,99.5209,200.8825,99.4517,200.8859,99.3821z M206.306,97.158 c-0.2344-0.1556-0.4965-0.2631-0.7818-0.2886c0.4353-0.1862,0.8738-0.3601,1.3192-0.5053 C206.6701,96.6332,206.4856,96.8934,206.306,97.158z M187.7985,108.5231c-1.1104,1.1443-2.2321,2.2779-3.3647,3.4005 c-0.5743,0.5692-0.6896,1.2379-0.5218,1.8319c-1.422,0.7437-2.8438,1.4877-4.2659,2.2313 C182.2234,113.3483,184.9511,110.8637,187.7985,108.5231z"
                          style={{ fill: Title.Color }}
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className="uppercase tracking-[3px] px-5 py-1.5"
                    style={{
                      fontSize: Slogan.FontSize + "px",
                      color: Slogan.Color,
                    }}
                  >
                    {Slogan.Value}
                  </span>
                </div>
              </div>
              <div className="relative overflow-hidden grow">
                <div className="absolute top-0 -left-[100px]">
                  <div className="w-[350px] h-[400px] relative">
                    <img
                      className="object-cover w-full h-full border-[5px] border-white rounded-t-[170px] rounded-b-[50px]"
                      src={toAbsolutePath(Images)}
                      alt=""
                    />
                    <div className="absolute w-[120px] h-[120px] top-10 -right-5">
                      <img
                        className="object-cover w-full h-full border-[3px] border-white rounded-full"
                        src={toAbsolutePath(Images1)}
                        alt=""
                      />
                      <div className="absolute -right-3 -top-3">
                        <svg
                          className="w-[50px]"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          preserveAspectRatio="xMidYMid meet"
                          version={1.0}
                          viewBox="0.0 -0.7 198.9 200.8"
                          zoomAndPan="magnify"
                          style={{ fill: "rgb(0, 0, 0)" }}
                        >
                          <g id="__id165_s7394575j">
                            <path
                              d="M196.1382,144.4868c-5.073-0.3905-10.4026-0.6349-15.1867-2.5349c-1.9465-0.7731-3.7927-2.045-5.4975-3.261 c-0.0471-0.0336-0.0753-0.0531-0.1019-0.0716c-0.0193-0.0168-0.0399-0.0345-0.0779-0.0661 c-0.1662-0.1382-0.3351-0.2729-0.4989-0.414c-0.4044-0.348-0.7933-0.714-1.1641-1.0978c-0.3632-0.3759-0.7057-0.7695-1.0351-1.1752 c-0.0069-0.0085-0.006-0.0074-0.0123-0.0151c-0.0997-0.1333-0.1982-0.2676-0.2943-0.4036c-0.178-0.2521-0.3493-0.5089-0.5142-0.7698 c-1.6391-2.5936-2.4789-5.2941-3.0715-8.4447c-0.5579-2.9661-0.7542-5.9972-0.7493-9.0316 c0.3478-2.6759,0.4595-5.3858,0.3962-8.0759c0.1167-1.3596-0.895-2.0277-1.9564-2.0144c-1.1143-0.0901-2.2834,0.5746-2.2496,2.0144 c-0.2175,2.5351-0.3865,5.1848-0.4156,7.8614c-0.5565,4.0349-1.7038,7.9613-3.7518,11.5005 c-3.4864,6.0249-9.3095,10.0971-15.8827,12.281c-5.0503,1.6778-10.3368,2.3828-15.6382,2.5944c-2.667,0.2038-2.7314,4.3149,0,4.206 c8.3542-0.6384,16.5285,3.6192,22.2,9.5345c6.3424,6.6149,8.3555,15.5673,9.297,24.4212c0.562,5.2845,0.7794,10.5965,1.211,15.8917 c0.2184,2.6793,4.0675,2.7312,4.206,0c0.454-8.9521,1.5337-18.0318,4.3742-26.5706c1.2273-3.6894,2.8548-7.1089,5.3674-10.1036 c2.6177-3.12,5.7466-5.8071,9.2151-7.9387c3.5613-2.1886,7.6047-3.9304,11.8309-4.1106 C198.8652,148.5766,198.8221,144.6935,196.1382,144.4868z M172.4769,135.7437 C172.4561,135.7181,172.4589,135.7213,172.4769,135.7437L172.4769,135.7437z M173.4067,156.315 c-2.9432,3.1456-5.1526,6.6477-6.7346,10.6459c-1.3132,3.3187-2.2762,6.7713-3.0249,10.2641 c-0.4928-3.3467-1.1849-6.6539-2.235-9.8798c-2.9526-9.0701-9.4536-16.4907-18.0116-20.7285 c-0.5578-0.2762-1.1243-0.5374-1.6969-0.7852c4.7564-1.1619,9.3173-2.9996,13.3038-5.8596c4.2559-3.0532,7.5184-7.0803,9.735-11.695 c0.6244,2.7624,1.5749,5.4188,2.982,7.8619c2.2772,3.9533,6.0245,6.9663,10.079,8.9859c2.3054,1.1484,4.7758,1.8626,7.3081,2.3535 C180.6755,149.6685,176.6519,152.8468,173.4067,156.315z M114.807,69.4646c-0.8301-0.0902-1.6582-0.139-2.4842-0.1631 c-9.3563-0.9323-18.0526-5.8383-25.0408-11.9511C79.0342,50.136,72.2886,40.796,68.5316,30.4677 c-1.9707-5.4176-3.1217-11.105-2.9066-16.8848c0.1017-2.7349-3.9786-2.6607-4.206,0c-0.717,8.3873-1.5903,16.9047-4.6996,24.8011 c-2.4147,6.1324-6.412,11.485-11.4686,15.6876c-8.4876,7.0542-19.4972,10.4542-30.2223,12.2221 c-4.1981,0.692-8.5315,1.0794-12.9255,1.4559C0.9751,67.6001,0,68.8232,0,69.8527c0,0.3389,0.0746,0.6332,0.1992,0.8905 c0.24,0.7391,0.871,1.301,1.9038,1.2125c6.8342,0.9059,13.6411,2.6799,19.8647,5.6822c5.9872,2.8882,11.3717,6.7947,16.2059,11.3401 c5.1146,4.809,9.8488,10.1353,13.5192,16.1381c3.3787,5.5258,5.778,11.525,7.4384,17.7755 c1.0261,3.8629,1.7863,7.7933,2.3899,11.7429c0.3091,2.0227,0.5723,4.0514,0.806,6.0841c0.2142,1.8637,0.6442,3.8823,0.5902,5.7581 c-0.0493,2.7103,4.1281,2.7038,4.206,0c0.1701-9.3601,1.4981-18.8846,3.6548-27.9782c1.6788-7.0789,4.1045-13.732,7.799-20.009 c3.7508-6.3729,8.051-12.5545,13.6631-17.4377c5.6998-4.9597,12.5645-7.6892,19.998-7.5376 c0.8524,0.0798,1.708,0.1376,2.5689,0.1566C117.5689,73.7316,117.4365,69.7504,114.807,69.4646z M69.7249,83.3267 c0.1486-0.2886,0.231-0.6348,0.1976-1.0549c-0.0942-1.182-0.2291-2.3597-0.3487-3.5391c0.5632,2.2413,1.1263,4.4826,1.6896,6.7238 c-0.5431,0.0848-1.0345,0.4052-1.326,1.0034C69.8747,85.4149,69.8009,84.3708,69.7249,83.3267z M53.9333,68.6054 c0.2326-0.3063,0.4654-0.6124,0.6979-0.9186c0.1293,0.8017,0.2584,1.6034,0.3878,2.4051 C54.658,69.5957,54.308,69.0924,53.9333,68.6054z M59.0244,64.0685c-0.1379-0.4887-0.2781-0.9767-0.4154-1.4655 c0.1697-0.2181,0.3371-0.4377,0.499-0.661C59.0801,62.6508,59.0522,63.3596,59.0244,64.0685z M80.3446,72.1544 c0.5207,0.8368,1.0414,1.6735,1.5621,2.5103c-0.3817,0.7657-0.7634,1.5314-1.1451,2.2971 C80.5852,75.3637,80.4499,73.7609,80.3446,72.1544z M52.3295,86.8608c0.0099,0.0101,0.02,0.02,0.0299,0.0302 c-0.034,0.0084-0.0673,0.0185-0.1008,0.0284C52.2816,86.8992,52.3073,86.8818,52.3295,86.8608z M90.4775,71.4107 c-0.7483,0.7879-1.4955,1.5771-2.2599,2.3487c-0.1527-0.459-0.3163-0.9136-0.4893-1.3642c0.2755-0.5526,0.551-1.1053,0.8266-1.6579 C89.1859,70.9853,89.826,71.2097,90.4775,71.4107z M60.086,47.2499c-0.2545,0.3154-0.4218,0.7251-0.4483,1.2284 c-0.823,1.3418-1.696,2.6503-2.614,3.9259c-0.1576,0.0791-0.3136,0.1733-0.4643,0.2984c-0.3582,0.2973-0.7282,0.5792-1.0887,0.8735 c-0.4833-0.1337-1.0055-0.0721-1.4731,0.2873c-0.1815,0.1395-0.363,0.279-0.5445,0.4186c2.2957-2.87,4.5026-5.8109,6.6087-8.8238 C60.0725,46.0554,60.0812,46.6527,60.086,47.2499z M67.1406,38.3966c-0.0064-0.1731-0.0079-0.3459-0.0153-0.519 c0.2314,0.4715,0.4713,0.9376,0.7133,1.4028C67.6059,38.9858,67.3731,38.6911,67.1406,38.3966z M39.1368,64.6083 c-0.0406,0.2284-0.0352,0.4548,0.0056,0.6759c-0.0954,0.0734-0.1907,0.1466-0.2862,0.22c-0.377-0.5221-0.7539-1.0442-1.1309-1.5663 c-0.038-0.0526-0.0822-0.0917-0.1225-0.1395c0.4511-0.2226,0.9006-0.4481,1.3452-0.6819 C38.8579,63.5967,38.9316,64.1178,39.1368,64.6083z M24.5978,68.9836c0.2147,0.3,0.4295,0.6001,0.6443,0.9001 c-0.6191-0.3541-1.2585-0.676-1.8889-1.0121c0.3422-0.0827,0.681-0.1818,1.0223-0.2689 C24.4331,68.7288,24.5065,68.856,24.5978,68.9836z M34.5236,80.2156c0.0854,0.1355,0.1836,0.2644,0.3101,0.3757 c0.3294,0.2898,0.6705,0.565,1.0068,0.8461c-0.4975-0.3922-0.9979-0.7802-1.5054-1.1591 C34.3986,80.2622,34.4609,80.2389,34.5236,80.2156z M64.6579,128.1824c-0.0019,0.0129-0.0039,0.0258-0.0058,0.0387 c-0.002-0.0101-0.0039-0.0203-0.0059-0.0303C64.65,128.1878,64.654,128.1852,64.6579,128.1824z M71.0338,103.8678 c0.0461,0.0103,0.093,0.0157,0.1398,0.0227c-0.0635,0.1445-0.1255,0.2896-0.188,0.4346 C71.0013,104.1727,71.0173,104.0202,71.0338,103.8678z M81.9583,85.9264c0.0366-0.1809,0.0546-0.3717,0.028-0.5832 c-0.0022-0.0177-0.0051-0.0352-0.0074-0.0529c0.0807-0.0692,0.1608-0.1391,0.2413-0.2086c0.334-0.2172,0.655-0.4505,0.9797-0.6793 C82.7816,84.9067,82.3622,85.4099,81.9583,85.9264z M91.0446,65.5358c-0.8448-0.2432-1.68-0.5179-2.5076-0.8171 c-0.943-0.5173-1.9072-0.9959-2.8943-1.4352c-0.4357-0.5276-0.8729-1.0541-1.3073-1.5828c0.1606-0.3899,0.1997-0.8187,0.0627-1.2464 C86.502,62.2967,88.7227,63.9975,91.0446,65.5358z M66.3652,36.2834c-0.1703-0.1624-0.3619-0.2921-0.5666-0.3959 c-0.1065-0.5535-0.2209-1.1055-0.3296-1.6585C65.7556,34.9192,66.0543,35.6042,66.3652,36.2834z M14.9742,70.488 c1.1869-0.1819,2.37-0.3833,3.5498-0.6028c-0.0413,0.6675,0.2542,1.3332,1.0568,1.7343c1.3252,0.6622,2.6237,1.3744,3.9067,2.1133 C20.7214,72.4385,17.8772,71.369,14.9742,70.488z M37.3326,82.6389c1.25,0.9678,2.5446,1.875,3.8833,2.718 c0.0101,0.1095,0.0219,0.2192,0.0492,0.3283c0.0506,0.2023,0.1156,0.3996,0.1696,0.6008 C40.1079,85.0273,38.7413,83.8082,37.3326,82.6389z M77.0619,92.9026c-0.7983,1.2552-1.5488,2.5243-2.274,3.8021 c0.1523-0.6899,0.3047-1.3797,0.457-2.0696c0.6126-0.2351,1.1339-0.7111,1.2423-1.3673c0.034-0.2055,0.0679-0.4111,0.1019-0.6166 c0.4955-0.3496,0.8247-0.8954,0.7592-1.6141c-0.0556-0.6101-0.1233-1.2184-0.1908-1.8268c0.0826-0.4999,0.1651-0.9998,0.2477-1.4997 c0.1874,0.5695,0.3747,1.1389,0.5621,1.7084c0.1508,0.4582,0.3995,0.7969,0.6988,1.0367 C78.1189,91.2644,77.5845,92.0808,77.0619,92.9026z M148.0521,13.1479c0-1.2097,0.9718-2.0007,2.103-2.103 c3.2831-0.297,6.5737-0.4711,9.8664-0.5302c0-2.8278,0-5.6555,0-8.4832c0-2.7108,4.206-2.7063,4.206,0c0,2.8281,0,5.6561,0,8.4842 c2.0408,0.0262,4.0815,0.0825,6.1208,0.2002c2.6951,0.1555,2.7041,4.362,0,4.206c-2.0393-0.1176-4.08-0.174-6.1208-0.2002 c0,3.8619,0,7.7238,0,11.5858c0,2.7108-4.206,2.7063-4.206,0c0-3.8623,0-7.7245,0-11.5867 c-3.2927,0.059-6.5834,0.2332-9.8664,0.5302C149.0173,15.3537,148.0521,14.206,148.0521,13.1479z M148.0521,13.1479 c0-1.2097,0.9718-2.0007,2.103-2.103c3.2831-0.297,6.5737-0.4711,9.8664-0.5302c0-2.8278,0-5.6555,0-8.4832 c0-2.7108,4.206-2.7063,4.206,0c0,2.8281,0,5.6561,0,8.4842c2.0408,0.0262,4.0815,0.0825,6.1208,0.2002 c2.6951,0.1555,2.7041,4.362,0,4.206c-2.0393-0.1176-4.08-0.174-6.1208-0.2002c0,3.8619,0,7.7238,0,11.5858 c0,2.7108-4.206,2.7063-4.206,0c0-3.8623,0-7.7245,0-11.5867c-3.2927,0.059-6.5834,0.2332-9.8664,0.5302 C149.0173,15.3537,148.0521,14.206,148.0521,13.1479z"
                              style={{ fill: "rgb(198, 148, 114)" }}
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 w-2/4 h-full pl-2">
                  <div className="pt-14">
                    <div className="flex items-end mb-5 last:mb-0">
                      <div>
                        <img
                          className="w-8"
                          src={toAbsolutePath(Icon)}
                          alt=""
                        />
                      </div>
                      <div
                        className="pl-3"
                        style={{
                          fontSize: Text1.FontSize + "px",
                          color: Text1.Color,
                        }}
                      >
                        {Text1.Value}
                      </div>
                    </div>
                    <div className="flex items-end mb-5 last:mb-0">
                      <div>
                        <img
                          className="w-8"
                          src={toAbsolutePath(Icon)}
                          alt=""
                        />
                      </div>
                      <div
                        className="pl-3"
                        style={{
                          fontSize: Text2.FontSize + "px",
                          color: Text2.Color,
                        }}
                      >
                        {Text2.Value}
                      </div>
                    </div>
                    <div className="flex items-end mb-5 last:mb-0">
                      <div>
                        <img
                          className="w-8"
                          src={toAbsolutePath(Icon)}
                          alt=""
                        />
                      </div>
                      <div
                        className="pl-3"
                        style={{
                          fontSize: Text3.FontSize + "px",
                          color: Text3.Color,
                        }}
                      >
                        {Text3.Value}
                      </div>
                    </div>
                    <div className="flex items-end mb-5 last:mb-0">
                      <div>
                        <img
                          className="w-8"
                          src={toAbsolutePath(Icon)}
                          alt=""
                        />
                      </div>
                      <div
                        className="pl-3"
                        style={{
                          fontSize: Text4.FontSize + "px",
                          color: Text4.Color,
                        }}
                      >
                        {Text4.Value}
                      </div>
                    </div>
                    <div className="flex items-end mb-5 last:mb-0">
                      <div>
                        <img
                          className="w-8"
                          src={toAbsolutePath(Icon)}
                          alt=""
                        />
                      </div>
                      <div
                        className="pl-3"
                        style={{
                          fontSize: Text5.FontSize + "px",
                          color: Text5.Color,
                        }}
                      >
                        {Text5.Value}
                      </div>
                    </div>
                  </div>
                  <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center flex-col text-center mt-10">
                    <div
                      style={{
                        fontSize: Voucher.TitleFontSize + "px",
                        color: Voucher.TitleColor,
                      }}
                    >
                      {Voucher.Title}
                    </div>
                    <div
                      className="font-medium font-gentium"
                      style={{
                        fontSize: Voucher.FontSize + "px",
                        color: Voucher.Color,
                        lineHeight: Voucher.FontSize + "px",
                      }}
                    >
                      {Voucher.Value}
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

export default Template16;
