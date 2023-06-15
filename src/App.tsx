import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import Article from "./components/Articles";

function App() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          console.log(
            "ServiceWorker registered with scope:",
            registration.scope
          );
        },
        (error) => {
          console.log("ServiceWorker registration failed:", error);
        }
      );
    });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "articles/:id",
          element: <Article />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
