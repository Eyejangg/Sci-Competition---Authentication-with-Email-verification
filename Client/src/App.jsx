import { Router, RouterProvider } from "react-router";
import "./App.css";
import router from "./routers/index.jsx";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
