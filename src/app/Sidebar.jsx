import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-[342px] bg-[#252627] relative">
      <div className="grid grid-cols-2 gap-2.5 p-4">
        <NavLink to="/1">
          <img
            className="w-full rounded-sm"
            src="https://template.canva.com/EAFS6bHmFKs/1/0/400w-XCbc3hSsY8M.jpg"
            alt=""
          />
        </NavLink>
        <NavLink to="/2">
          <img
            className="w-full rounded-sm"
            src="https://template.canva.com/EAFS6bHmFKs/1/0/400w-XCbc3hSsY8M.jpg"
            alt=""
          />
        </NavLink>
        <NavLink to="/">
          <img
            className="w-full rounded-sm"
            src="https://template.canva.com/EAFS6bHmFKs/1/0/400w-XCbc3hSsY8M.jpg"
            alt=""
          />
        </NavLink>
        <NavLink to="/">
          <img
            className="w-full rounded-sm"
            src="https://template.canva.com/EAFS6bHmFKs/1/0/400w-XCbc3hSsY8M.jpg"
            alt=""
          />
        </NavLink>
      </div>
      <div className="absolute -right-[12px] top-2/4 -translate-y-2/4 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 96"
          width="13"
          height="96"
          fill="none"
          className="IrLwCg"
        >
          <path
            className="fill-[#252627]"
            d="M0,0 h1 c0,20,12,12,12,32 v32 c0,20,-12,12,-12,32 H0 z"
          ></path>
          <path
            className="fill-[#252627]"
            d="M0.5,0 c0,20,12,12,12,32 v32 c0,20,-12,12,-12,32"
          ></path>
        </svg>
        <div className="text-white absolute top-2/4 -translate-y-2/4 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            viewBox="0 0 12 12"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.25"
              d="M7 3.17 4.88 5.3a1 1 0 0 0 0 1.42L7 8.83"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
