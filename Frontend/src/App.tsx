import Header from "./components/header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
