import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-full bg-[#fff]">
        <Outlet />
    </div>
  );
}

export default App;
