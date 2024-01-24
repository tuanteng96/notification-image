import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ColorPicker } from "@wellbees/color-picker-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { toAbsolutePath } from "../helpers/assetPath";
import * as htmlToImage from "html-to-image";

function Template6() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      Title: {
        Value: "Spa",
        FontSize: 60,
        Color: "#221616",
      },
      Slogan: {
        Sub: "massage & beauty salon",
        SubColor: "#221616",
        SubFontSize: 20,
        SubTitle: "special offer",
        SubTitleColor: "#221616",
        SubTitleFontSize: 32,
        Value: "50% Off",
        FontSize: 40,
        Color: "#fff",
      },
      Images: "/Thietke/myimage/anh-6.png",
      Background: "#DDB69E",
      Color: "#A76E5A",
      Width: 600,
      Height: 600,
    },
  });

  const [Scale, setScale] = useState(1);

  const onSubmit = (data) => console.log(data);

  const componentRef = useRef();
  const elRef = useRef();

  const { Title, Background, Slogan, Width, Height, Images, Copyright, Color } =
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
        bodyFormData.append("title", "mau-6-" + new Date().valueOf());
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
          <div className="flex mb-2">
            <div className="flex-1">
              <Controller
                name="Slogan.SubTitle"
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
                name="Slogan.SubTitleFontSize"
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
                name="Slogan.SubTitleColor"
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
            <div className="flex flex-col h-full pt-8">
              <div className="text-center">
                <div
                  className="uppercase font-play"
                  style={{
                    color: Title.Color,
                    fontSize: Title.FontSize,
                    lineHeight: "60px",
                  }}
                >
                  {Title.Value}
                </div>
                <div
                  className="font-medium font-play"
                  style={{
                    color: Slogan.SubColor,
                    fontSize: Slogan.SubFontSize,
                  }}
                >
                  {Slogan.Sub}
                </div>
              </div>
              <div className="relative px-20 pt-5 pb-24 grow">
                <div
                  className="relative h-full"
                  style={{
                    background: Color,
                  }}
                >
                  <div className="absolute w-full text-center top-3.5">
                    <div className="absolute w-[500px] h-[1.5px] bg-white -left-[300px] top-8"></div>
                    <span
                      className="relative z-10 px-16 text-white font-alegreya"
                      style={{
                        background: Color,
                        fontSize: Slogan.SubTitleFontSize,
                      }}
                    >
                      {Slogan.SubTitle}
                    </span>
                  </div>
                  <div
                    className="absolute w-full text-center top-[190px] -right-[193px]"
                    style={{
                      transform: "rotate(90deg)",
                    }}
                  >
                    <div className="absolute w-[500px] h-[1.5px] bg-white -right-[300px] top-8"></div>
                    <span
                      className="relative z-10 px-16 text-white font-alegreya"
                      style={{
                        background: Color,
                        fontSize: Slogan.SubTitleFontSize,
                      }}
                    >
                      {Slogan.SubTitle}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-16 left-0 w-[76%] h-[70%]">
                  <img
                    className="object-cover w-full h-full"
                    src={toAbsolutePath(Images)}
                  />
                  <div className="w-[130px] absolute -bottom-10 left-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      preserveAspectRatio="xMidYMid meet"
                      version={1.0}
                      viewBox="-53.0 489.7 1813.0 1812.1"
                      zoomAndPan="magnify"
                      style={{ fill: "rgb(255, 255, 255)" }}
                    >
                      <g>
                        <g id="__id122_s7vzrcgpqs">
                          <path
                            d="M1721.8049,1373.0479L1713.0853,1488.0292Q1655.0977,1835.2417,1386.3368,2041.4222Q1115.7297,2247.4185,751.7603,2204.9473Q404.5474,2146.9597,198.36765,1878.1985Q132.31181,1791.3285,89.93898,1689.1887L54.48844,1584.2509Q25.459389,1476.0049,26.122768,1358.6028Q38.283573,998.4009,279.5568,761.2034Q520.83014,524.0059,881.1864,517.9834Q1241.3881,530.14417,1478.5853,771.41766Q1715.7828,1012.69116,1721.8049,1373.0479"
                            style={{ fill: "inherit" }}
                          />
                        </g>
                        <g id="__id123_s7vzrcgpqs">
                          <path
                            d="M1748.875,1370.9985L1748.851,1364.7607Q1744.5966,1105.8848,1595.1217,894.21533Q1439.402,680.1101,1192.5878,583.9788Q948.7411,489.66534,679.7689,538.4021Q410.79153,592.98584,223.13364,773.495Q67.41756,930.2439,6.547756,1124.9525L5.4342117,1133.04Q21.181168,1082.0598,45.12854,1029.9744Q61.928818,992.93536,89.28994,947.31805Q158.3927,839.20905,194.76584,815.1323Q112.913475,915.7512,94.0673,955.60516Q63.31852,1019.30164,93.50109,972.3109L56.103745,1045.8135Q76.87699,1005.79065,97.24583,974.6804Q26.07415,1091.5842,14.323647,1170.2853Q-33.294067,1347.7266,6.4181786,1538.8763Q40.1662,1718.6738,186.54459,1893.0237Q212.21436,1923.3044,249.91818,1958.953Q290.12653,1996.46,334.83136,2028.5398Q308.8852,2011.4706,330.65848,2026.8241Q440.84976,2108.2832,523.0403,2135.8188Q883.8647,2272.8086,1242.9614,2113.3677Q1172.1022,2164.572,1032.3582,2191.4424Q971.4341,2203.2432,909.33417,2206.7837Q838.26904,2210.391,779.2738,2205.0193L792.812,2209.343Q797.73645,2209.3809,763.0484,2206.4556Q771.0686,2210.5796,767.86255,2212.055Q791.6907,2214.4497,816.96625,2215.5173L873.18274,2216.225L947.7451,2211.9338L937.60034,2213.6016L968.69745,2210.3716Q950.2377,2213.3513,964.50696,2211.4473L1007.9542,2205.36Q1054.3237,2197.4556,1087.6575,2188.6523Q1124.0964,2179.3264,1159.6705,2167.0605Q1209.4149,2149.7283,1156.1718,2166.5635L1228.8467,2139.5886Q1370.0823,2077.314,1474.3901,1978.0265Q1382.6666,2077.1938,1206.2377,2154.2046Q1284.9895,2121.754,1346.3655,2082.8845Q1549.8148,1952.843,1639.5068,1770.8058Q1742.5764,1589.072,1745.0878,1371.823Q1748.2021,1429.3569,1742.9926,1487.4939Q1737.9812,1548.0801,1720.4808,1618.0397Q1725.0195,1610.3726,1723.3618,1614.7412Q1689.8625,1739.3176,1630.0315,1839.1238Q1671.263,1784.0657,1704.875,1719.798Q1630.7545,1869.1394,1528.2843,1972.3472Q1409.3301,2098.9683,1236.6931,2173.7168Q1212.7516,2184.024,1188.3762,2192.9678L1229.1544,2174.5269Q1145.2257,2209.8545,1056.1675,2228.6804Q963.5506,2247.6592,883.23505,2248.9507Q462.38416,2221.2798,216.68265,1984.3575Q35.071404,1809.1165,-24.877188,1576.5734Q94.57978,1907.7983,340.443,2068.5854Q147.75415,1928.9438,68.566505,1766.3049Q-11.841923,1618.9897,-28.504864,1462.2662Q-12.509739,1600.699,48.186195,1726.1274Q81.128075,1794.0459,125.64385,1854.9977Q142.96317,1879.3804,136.15698,1866.6559Q94.572044,1810.8296,118.67336,1837.91Q184.69656,1920.1582,194.26215,1926.2959Q135.54956,1862.8672,90.31403,1787.799L68.90735,1749.9174Q40.666,1692.8644,47.871628,1708.2008Q42.158195,1697.4255,49.234856,1707.5742L20.115982,1634.9983Q-9.624695,1555.2526,-27.729174,1412.2979Q-27.770796,1448.3479,-23.543629,1491.9584Q-28.493605,1454.3478,-27.142893,1467.6907Q-27.894054,1461.4646,-28.545036,1455.261L-31.936483,1411.5554Q-34.140232,1367.7512,-31.582136,1323.9359Q-38.003498,1379.8867,-36.539894,1439.2734Q-43.555588,1347.8749,-33.01138,1269.1729Q-46.69184,1344.4929,-45.9284,1411.9259Q-52.69232,1391.1255,-53.005486,1358.7866Q-50.999634,1175.6127,35.79078,993.5973Q95.91244,863.6492,219.10025,747.30707Q353.32175,623.4835,524.23535,559.7603Q654.8114,512.0621,706.93567,521.08276Q544.14355,549.86914,430.47092,612.9392Q633.08405,510.9251,858.91925,510.7942Q1233.3542,516.20593,1499.0565,768.7373Q1629.8497,897.1813,1694.7994,1055.2495Q1715.1989,1105.374,1726.2407,1145.2435L1719.5123,1125.812Q1737.4984,1185.4749,1745.0754,1231.9615Q1759.9922,1304.3328,1748.875,1370.9985 M1626.0892,972.9192L1628.4979,977.6912Q1693.9298,1110.2482,1708.3767,1247.0955Q1639.8645,833.63116,1241.9269,636.2793Q1127.9371,588.0467,1040.5709,570.9314Q920.68976,546.1707,798.84546,553.9397Q803.02637,553.0237,828.7133,550.6545L827.2391,550.5827Q597.78156,556.17834,426.72232,638.17505Q523.84674,561.3522,744.04236,529.0274Q926.9476,507.09927,1104.9681,555.7644Q1291.5752,608.69257,1432.7031,723.14386Q1531.2249,802.5216,1602.9607,906.65704Q1693.4122,1044.3063,1692.5142,1103.4749Q1685.8447,1073.9604,1626.0892,972.9192"
                            style={{ fill: "inherit" }}
                          />
                        </g>
                        <g id="__id124_s7vzrcgpqs">
                          <path
                            d="M1741.4008,1407.0013L1741.3777,1400.7632Q1736.0667,1139.602,1595.9138,933.46387Q1454.2008,724.2937,1209.5919,623.27734Q978.0538,530.9843,722.00226,582.1817Q468.90292,638.02045,290.14362,822.8452Q145.06052,982.08954,92.301315,1170.1147Q91.4153,1178.0566,92.47461,1174.0508Q109.35553,1117.1432,128.35085,1074.169Q145.73402,1033.9752,167.2062,995.8104Q234.10532,883.2186,265.8205,863.27856Q189.53265,963.58826,172.17584,1004.5188L159.28539,1037.769L173.75723,1018.02625Q154.4745,1054.2562,138.84158,1091.9785Q158.2555,1051.5453,177.00446,1021.18896Q113.52205,1129.6461,99.79849,1219.8679Q57.777077,1401.4681,97.345116,1583.341Q122.46094,1742.0997,272.57193,1933.8103Q306.2416,1973.2349,335.25293,2000.3014L398.09296,2054.2197Q378.27573,2040.2399,387.4222,2047.0952L411.6206,2065.6704Q485.67587,2127.4268,589.615,2168.934Q938.67096,2301.7417,1269.2771,2140.3623Q1199.365,2193.8994,1067.787,2220.6504Q1007.1129,2233.3098,945.08356,2236.8403Q882.5894,2240.2388,822.97235,2234.859L836.5232,2238.9883L833.0696,2238.9197Q847.64996,2239.6167,807.17377,2236.4004Q815.06305,2240.0684,811.93463,2241.7935Q836.0068,2244.3613,861.1901,2245.4585Q886.3677,2246.5571,911.13336,2246.1636Q942.46387,2245.9282,986.03546,2241.6372L976.42224,2243.3345L1005.3558,2240.171Q990.9324,2242.7446,1004.05817,2240.8604L1047.4215,2234.191Q1084.4227,2227.5073,1120.6827,2217.5464Q1156.9427,2207.5845,1192.1772,2194.4219Q1242.4038,2175.7285,1185.1547,2195.3076Q1224.2754,2182.8708,1257.0028,2166.626Q1390.32,2103.282,1487.6637,2003.8069Q1400.6903,2104.4575,1234.6448,2181.809Q1299.528,2154.0786,1364.3137,2111.53Q1558.2311,1979.372,1640.2097,1799.4296Q1734.9436,1621.8701,1737.5669,1408.6471Q1740.8223,1461.612,1736.2421,1521.3231Q1731.2267,1584.5394,1716.6454,1647.0187Q1721.5901,1637.8112,1719.1611,1644.6243Q1689.8569,1764.1627,1636.491,1861.4719Q1673.0164,1810.2483,1705.3429,1743.9309Q1636.8011,1893.8427,1537.1544,2000.7814Q1426.207,2126.6143,1260.8813,2202.7812L1218.8892,2220.6218L1258.3903,2201.59Q1181.1416,2236.919,1090.0645,2257.998Q1004.0809,2276.7517,929.09033,2278.846Q527.8563,2253.2747,294.03375,2017.8398Q122.89861,1848.9148,62.26264,1605.4939Q172.61197,1931.3086,399.5344,2092.2686Q229.93512,1961.619,152.50146,1798.8436Q75.36631,1648.8464,60.73956,1495.1841Q75.77356,1631.3406,129.80148,1751.2626Q160.67105,1820.1195,203.30371,1882.4408Q227.27505,1914.6162,187.01633,1854.3446L195.56192,1863.0441L265.26672,1950.668Q208.6437,1883.7772,170.36862,1814.7631L150.09253,1776.2583L132.07568,1737.3016L133.98965,1742.3713L130.08795,1733.4991Q126.46233,1726.165,132.21059,1734.3032Q117.56475,1700.0327,106.039795,1664.6016Q80.448326,1593.3577,62.03306,1447.1763L62.612976,1479.7104Q63.408314,1501.2971,65.35959,1523.1077L64.988686,1521.1362Q54.196213,1450.888,57.967453,1362.8464Q55.109707,1389.0955,53.887157,1415.2078L52.969193,1472.2009Q46.654182,1390.3024,56.213085,1308.4045Q42.961983,1386.1802,43.948566,1446.96Q37.022774,1423.9974,36.871964,1398.2327Q38.927586,1214.4504,117.58631,1038.9249Q176.58273,904.57104,289.89307,791.9894Q415.5428,668.2435,579.36273,602.9432Q701.8126,555.07855,752.04553,564.1494Q601.5431,591.40906,486.50943,658.6399Q674.7761,555.2708,896.7484,552.8994Q1261.7642,561.16144,1504.1693,807.611Q1626.1398,931.4526,1690.5046,1092.9158Q1710.09,1143.3389,1720.6097,1183.3346Q1726.4122,1202.761,1715.0669,1167.228Q1731.4252,1224.3623,1738.7108,1271.8198Q1752.3976,1336.2773,1741.4008,1407.0013 M1628.3931,1019.01685L1630.6421,1023.8605Q1690.5653,1157.1392,1702.1089,1288.3127Q1677.5951,1064.354,1516.2579,872.90186Q1341.041,683.9913,1127.1123,627.14685Q1057.1522,606.60895,984.67914,598.82513Q912.12714,591.07214,839.6669,596.288L871.58203,592.63763L829.1239,595.1265Q638.72345,605.0869,484.5528,683.4116Q576.87213,604.97986,789.5151,571.3285Q966.2735,548.75494,1137.4628,599.05194Q1308.3436,650.1042,1444.4126,765.4686Q1534.0996,840.8025,1605.3505,948.97363Q1692.603,1090.949,1689.5258,1146.0225Q1684.6804,1121.6008,1628.3931,1019.01685"
                            style={{ fill: "inherit" }}
                          />
                        </g>
                        <g id="__id125_s7vzrcgpqs">
                          <path
                            d="M1731.7915,1383.5979L1731.7688,1377.3596Q1728.3094,1118.9492,1584.3353,904.20044Q1437.7426,691.27405,1198.7074,592.8502Q958.51013,497.3926,705.22675,548.42053Q443.2111,606.60364,266.637,789.9426Q115.97688,955.4629,63.946823,1142.924L63.25711,1150.5137Q78.7093,1096.4517,101.220406,1044.7699Q118.71624,1004.6239,140.2509,966.4921Q206.95166,854.3701,239.70879,833.0597Q163.64502,932.95105,145.452,974.4199L131.91014,1008.74945L146.03696,990.3109Q124.87167,1030.0972,111.15513,1063.9526Q130.64548,1023.43884,149.24278,993.3092Q85.79421,1101.9971,71.774734,1191.7795Q28.53474,1370.2883,68.56931,1561.3896Q91.82901,1718.6895,246.54169,1917.2864Q271.89526,1947.8232,309.27698,1983.7759Q340.45178,2013.315,373.75143,2038.9697L361.0809,2030.3391Q373.0174,2039.8792,385.2558,2048.9697Q457.61057,2110.1973,565.67993,2154.021Q916.1759,2289.2192,1254.3958,2125.5452Q1187.6565,2178.2646,1047.3726,2207.3218Q986.6118,2219.755,924.6129,2223.1487Q861.83795,2226.38,803.01154,2221.083L816.5578,2225.18L813.21545,2225.1252Q804.07367,2224.4646,814.09766,2224.851L786.72974,2222.5027Q794.7668,2226.1357,791.7855,2227.865L839.68176,2231.5903Q864.8587,2232.7444,889.6243,2232.4216Q927.17566,2231.9402,964.54425,2228.1465Q971.30804,2227.389,955.31854,2229.7537L985.6736,2226.4744Q976.5632,2228.2363,981.9621,2227.5159L1025.3497,2221.0708Q1062.3877,2214.5876,1098.7151,2204.8591Q1141.0186,2193.2188,1170.3784,2182.2283Q1229.1173,2160.3845,1169.856,2180.7515Q1206.8688,2169.0728,1240.3356,2152.6555Q1381.788,2084.5806,1476.0756,1986.3794Q1387.691,2088.701,1219.4016,2167.2644Q1288.8655,2137.0588,1351.9741,2095.1042Q1439.4303,2037.8296,1517.7976,1950.8787Q1558.3517,1904.2278,1565.949,1889.6267L1627.9807,1783.3564Q1726.3522,1597.6794,1728.0939,1386.0482Q1730.9537,1446.2664,1726.7595,1496.501Q1722.2944,1557.7878,1706.813,1626.1204L1709.9526,1620.7356Q1679.7242,1744.7832,1624.8419,1844.4807Q1665.6865,1785.2676,1694.6764,1725.0842Q1624.9385,1876.6572,1525.8102,1983.0264Q1418.1772,2107.4788,1244.5154,2188.6497L1202.5182,2206.4373Q1222.9648,2197.2603,1243.2194,2186.909Q1165.791,2222.316,1074.8844,2243.547Q992.1718,2262.4011,907.69495,2265.0989Q509.76257,2241.1863,267.65515,2000.9146Q90.83016,1822.6643,34.009293,1585.5276Q141.7367,1908.832,375.0674,2077.025Q274.87436,2002.1472,223.58815,1933.0798Q216.45009,1936.9983,123.79289,1778.1084Q46.99038,1628.1807,32.12896,1473.9158Q45.052254,1603.0808,102.441574,1733.2727Q133.43803,1802.0632,176.06367,1864.3914Q200.54265,1897.3767,159.36267,1835.821L167.85814,1844.4507Q232.27357,1930.3398,237.85242,1932.3308Q186.65755,1873.4348,142.0278,1794.8064L121.80333,1756.2673L104.136314,1718.0808L106.05589,1723.1497L101.89698,1713.6428Q98.43448,1706.6196,104.13752,1714.7244Q89.487755,1680.4495,77.9241,1645.0271Q49.80249,1562.6228,33.390717,1425.7078Q33.13331,1464.8854,36.715694,1502.459Q31.382189,1470.5892,28.955498,1422.9067L29.152855,1338.597Q22.948904,1397.3408,24.289326,1451.538Q17.669783,1360.1628,27.702291,1281.4443Q14.683731,1355.5507,15.020504,1423.7823Q8.19815,1402.9878,7.993742,1370.5365Q10.461854,1186.6554,92.361145,1004.9279Q153.6819,870.0374,267.168,758.5116Q401.2488,629.6696,563.2023,567.995Q675.197,523.90967,733.1121,530.9173Q585.35455,556.2998,461.90317,627.2482Q661.6348,519.6102,879.90436,519.8676Q1242.309,526.6979,1492.5037,778.1721Q1616.5824,904.4839,1681.4984,1069.2145Q1698.8857,1113.6489,1711.29,1159.7227L1705.4471,1142.4524Q1719.1628,1188.0986,1729.1063,1247.68Q1742.9117,1320.9044,1731.7915,1383.5979 M1617.658,991.09576L1619.911,995.9392Q1678.5803,1123.6321,1692.0447,1261.1431Q1668.9529,1039.8131,1502.2891,840.87756Q1326.5212,652.6284,1112.8806,595.1824Q1042.9539,574.43317,970.4978,566.2905Q900.98004,557.969,819.39667,563.3059L852.17535,559.6064L809.7017,562.07635Q621.024,571.1703,460.7652,651.42236Q497.34348,613.78436,588.84296,582.11127Q677.7494,549.97864,771.6224,538.04535Q948.3773,516.00494,1119.6102,566.01776Q1299.1702,620.70966,1432.0745,735.29486Q1528.2554,817.515,1596.5574,924.00574Q1682.737,1065.4475,1679.4622,1120.2Q1674.0671,1093.6042,1617.658,991.09576"
                            style={{ fill: "inherit" }}
                          />
                        </g>
                      </g>
                    </svg>
                    <div
                      className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-medium text-center font-play"
                      style={{
                        fontSize: Slogan.FontSize,
                        color: Slogan.SubTitleColor,
                        lineHeight: "40px",
                      }}
                    >
                      {Slogan.Value}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-3 relative inline-block w-[65%]">
                <img
                  className="w-full object-cover rounded-tr-[70px]"
                  src={toAbsolutePath(Images)}
                  alt="Anh"
                />
                <div
                  className="absolute w-[150px] h-[150px] rounded-full flex items-center justify-center -right-[120px] bottom-10"
                  style={{ background: Color }}
                >
                  <div
                    className="font-medium text-center"
                    style={{
                      fontSize: (Slogan.FontSize || 40) + "px",
                      color: Slogan.Color,
                      lineHeight: "50px",
                    }}
                  >
                    {Slogan.Value}
                  </div>
                </div>
              </div> */}
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

export default Template6;
