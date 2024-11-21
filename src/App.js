import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import DraftPickerV3 from "./components/DraftPickerV3";
import DraftPickerControlPanel from "./components/DraftPickerControlPanel";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <DraftPickerControlPanel />,
  },
  {
    path: "/draft-pick",
    element: <DraftPickerV3 />,
  },
]);

function App() {
  return (
    <RouterProvider router={BrowserRouter}/>
  );
}

export default App;
