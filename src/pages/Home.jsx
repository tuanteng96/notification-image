import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

function Home() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      Title: {
        Value: "Beauty Treatment",
        FontSize: 30,
        Color: "#763c00",
      },
      Slogan: {
        Sub: "Big Promotion.",
        SubColor: "#763c00",
        SubFontSize: 20,
        Value: "30% OFF",
        FontSize: 70,
        Color: "#763c00",
      },
      Button: {
        LineColor: "#763c00",
        BackgroundColor: "#763c00",
        Title: "Book Now",
        Color: "#ffffff",
      },
      Color: "#763c00",
      Logo: "/images/theme1/logo-1.png",
      Background: "/images/theme1/background.png",
    },
  });

  const onSubmit = (data) => console.log(data);

  const componentRef = useRef();

  const {
    Title,
    Color,
    Logo,
    Background,
    Button,
    Slogan,
  } = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex flex-grow h-full">
        <div className="w-[400px] p-5 bg-white h-full overflow-auto">
          <div className="grid grid-cols-2 gap-5 pb-5 mb-5 border-b">
            <div>
              <div className="text-[12px] text-[#939393] mb-1 font-light">
                Logo
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="Logo"
                  className="relative flex flex-col items-center justify-center w-full h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
                >
                  {Logo && (
                    <div className="absolute w-full h-full p-5">
                      <img
                        className="object-contain w-full h-full"
                        src={Logo}
                      />
                    </div>
                  )}
                  {!Logo && (
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
                    name="Logo"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="Logo"
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
              <div className="text-[12px] text-[#939393] mb-1 font-light">
                Ảnh nền
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="Background"
                  className="relative flex flex-col items-center justify-center w-full h-44 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
                >
                  {Background && (
                    <div className="absolute w-full h-full">
                      <img
                        className="object-contain w-full h-full"
                        src={Background}
                      />
                    </div>
                  )}
                  {!Background && (
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
                    name="Background"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="Background"
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
          <div className="pb-5 mb-5 border-b">
            <div className="mb-5">
              <div className="text-[12px] text-[#939393] mb-1 font-light">
                Nhập tiêu đề
              </div>
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
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Cỡ chữ
                </div>
                <Controller
                  name="Title.FontSize"
                  control={control}
                  render={({ field }) => (
                    <NumericFormat
                      className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
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
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Màu sắc
                </div>
                <Controller
                  name="Title.Color"
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
            </div>
          </div>
          <div className="pb-5 mb-5 border-b">
            <div className="mb-5">
              <div className="text-[12px] text-[#939393] mb-1 font-light">
                Tiêu đề Sub Slogan
              </div>
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
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Cỡ chữ Sub Slogan
                </div>
                <Controller
                  name="Slogan.SubFontSize"
                  control={control}
                  render={({ field }) => (
                    <NumericFormat
                      className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
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
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Màu chữ Sub Slogan
                </div>
                <Controller
                  name="Slogan.SubColor"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
                      type="text"
                      placeholder="Nhập mã màu"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="text-[12px] text-[#939393] mb-1 font-light">
                Tiêu đề Slogan
              </div>
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
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Cỡ chữ Slogan
                </div>
                <Controller
                  name="Slogan.FontSize"
                  control={control}
                  render={({ field }) => (
                    <NumericFormat
                      className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
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
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Màu chữ Slogan
                </div>
                <Controller
                  name="Slogan.Color"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
                      type="text"
                      placeholder="Nhập mã màu"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Tiêu đề Button
                </div>
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
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Màu nền Button
                </div>
                <Controller
                  name="Button.BackgroundColor"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
                      type="text"
                      placeholder="Nhập mã màu"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Màu chữ Button
                </div>
                <Controller
                  name="Button.Color"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="h-12 w-full border border-[#bfc4c8] rounded focus:outline-none px-3 focus:border-primary transition"
                      type="text"
                      placeholder="Nhập mã màu"
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <div className="text-[12px] text-[#939393] mb-1 font-light">
                  Màu Line
                </div>
                <Controller
                  name="Button.LineColor"
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
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 h-full">
          <div className="flex items-center justify-center overflow-auto grow font-alegreya">
            <div
              ref={componentRef}
              className="relative bg-no-repeat bg-cover"
              style={{
                width: 600,
                height: 600,
                backgroundImage: `url(${Background})`,
              }}
            >
              <div
                className="absolute h-full w-[200px] top-0 left-[30px]"
                style={{
                  background: "rgb(249 247 220 / 70%)",
                }}
              >
                <div
                  className={clsx(
                    `border-b p-6 flex flex-col justify-center items-center`
                  )}
                  style={{
                    borderColor: Color,
                  }}
                >
                  <div className="py-8">
                    <img className="w-[50px]" src={Logo} />
                  </div>
                  <div
                    className={clsx(`text-center uppercase font-medium`)}
                    style={{
                      color: Title.Color,
                      fontSize: Number(Title.FontSize || 30) + "px",
                      lineHeight: Number(Title.FontSize || 30) + 5 + "px",
                    }}
                  >
                    <div>{Title.Value}</div>
                  </div>
                </div>
                <div
                  className={clsx(`p-6 text-center`)}
                >
                  <div
                    className="uppercase"
                    style={{
                      fontSize: (Slogan.SubFontSize || 20) + "px",
                      color: Slogan.SubColor,
                    }}
                  >
                    {Slogan.Sub}
                  </div>
                  <div
                    className="mt-5 font-medium"
                    style={{
                      fontSize: (Slogan.FontSize || 70) + "px",
                      lineHeight: (Slogan.FontSize || 70) + "px",
                      color: Slogan.Color,
                    }}
                  >
                    {Slogan.Value}
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  `absolute w-full flex justify-center bottom-[60px]`
                )}
              >
                <div
                  className="absolute top-2/4 w-[calc(100%-30px)] h-[1px] left-[30px]"
                  style={{
                    background: Button.LineColor,
                  }}
                ></div>
                <span
                  className={clsx(
                    `text-white relative z-10 rounded-[30px] px-4 py-1.5 ml-[30px]`
                  )}
                  style={{
                    background: Button.BackgroundColor,
                    color: Button.Color,
                  }}
                >
                  {Button.Title}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-4 py-3 bg-white border-l">
            <div></div>
            <div>
              <button
                type="button"
                className="bg-primary text-white h-[42px] px-4 rounded flex items-center justify-center"
                onClick={() =>
                  exportComponentAsPNG(componentRef, {
                    fileName: "Notifications 1",
                  })
                }
              >
                <ArrowDownTrayIcon className="w-5 mr-2" />
                Tải xuống
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Home;
