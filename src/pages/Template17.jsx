import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ColorPicker } from "@wellbees/color-picker-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { toAbsolutePath } from "../helpers/assetPath";
import * as htmlToImage from "html-to-image";

function Template17() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      Title: {
        Value: "Peel Da",
        FontSize: 90,
        Color: "#9C6756",
      },
      Slogan: {
        Value: "To Have The Perfect Spa Day",
        FontSize: 16,
        Color: "#9C6756",
      },
      Text1: {
        Value: "Choose the Right Spa",
        Color: "#9C6756",
        FontSize: 16,
      },
      Text2: {
        Value: "Choose the Right Order",
        Color: "#9C6756",
        FontSize: 16,
      },
      Text3: {
        Value: "Eat a Light and Healthy Meal Beforehand",
        Color: "#9C6756",
        FontSize: 16,
      },
      Text4: {
        Value: "Bring the Right Spa Partner",
        Color: "#9C6756",
        FontSize: 16,
      },
      Text5: {
        Value: "Make it a Whole Day Event",
        Color: "#9C6756",
        FontSize: 16,
      },
      BackgroundColor: "#9C6756",
      Color: "#ffffff",
      Images: "/Thietke/myimage/anh-17.png",
      Frame: "/Thietke/myimage/khung-17.png",
      Background: "/Thietke/myimage/bg-17.png",
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
    Color,
    Title,
    Images,
    Frame,
    Background,
    Slogan,
    Width,
    Height,
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
        bodyFormData.append("title", "mau-17-" + new Date().valueOf());
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
        </div>
        <div className="mb-5">
          <div className="text-[12px] text-[#939393] mb-1 font-light">
            Mùa chủ đạo / Màu chữ
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
          <div className="flex">
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
                  className="relative font-bold font-thasadith"
                  style={{
                    fontSize: Title.FontSize + "px",
                    color: Title.Color,
                    lineHeight: Title.FontSize + 5 + "px",
                  }}
                >
                  {Title.Value}
                  <div className="absolute -rotate-[30deg] -top-2 -left-5">
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
                    className="uppercase tracking-[3px] px-5 py-1.5 font-medium"
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
                <div className="absolute bottom-10 -right-36 z-20">
                  <div className="w-[315px] h-[382px] relative p-[1px]">
                    <img
                      className="absolute top-0 left-0"
                      src={toAbsolutePath(Frame)}
                      alt=""
                    />
                    <img
                      className="object-cover w-full h-full"
                      src={toAbsolutePath(Images)}
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute left-0 w-[60%] h-full">
                  <div className="pt-14 pl-14">
                    <div className="flex items-center mb-3.5 last:mb-0 bg-[#EAE0DF] px-4 py-3 rounded-lg">
                      <div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center leading-[28px]"
                          style={{
                            background: BackgroundColor,
                            color: Color,
                          }}
                        >
                          1
                        </div>
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
                    <div className="flex items-center mb-3.5 last:mb-0 bg-[#EAE0DF] px-4 py-3 rounded-lg">
                      <div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center leading-[28px]"
                          style={{
                            background: BackgroundColor,
                            color: Color,
                          }}
                        >
                          2
                        </div>
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
                    <div className="flex items-center mb-3.5 last:mb-0 bg-[#EAE0DF] px-4 py-3 rounded-lg">
                      <div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center leading-[28px]"
                          style={{
                            background: BackgroundColor,
                            color: Color,
                          }}
                        >
                          3
                        </div>
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
                    <div className="flex items-center mb-3.5 last:mb-0 bg-[#EAE0DF] px-4 py-3 rounded-lg">
                      <div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center leading-[28px]"
                          style={{
                            background: BackgroundColor,
                            color: Color,
                          }}
                        >
                          4
                        </div>
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
                    <div className="flex items-center mb-3.5 last:mb-0 bg-[#EAE0DF] px-4 py-3 rounded-lg">
                      <div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center leading-[28px]"
                          style={{
                            background: BackgroundColor,
                            color: Color,
                          }}
                        >
                          5
                        </div>
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

export default Template17;
