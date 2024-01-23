export const toAbsolutePath = (pathname) => {
  //process.env.REACT_APP_API_URL + "/upload/image/" + pathname;
  if (pathname && pathname.includes("localhost:3001")) {
    return pathname;
  }
  return import.meta.env.DEV ? "https://cser.vn" + pathname : pathname;
};
