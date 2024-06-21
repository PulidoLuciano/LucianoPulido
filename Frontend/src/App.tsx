import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header/>
      <main className="max-w-screen-laptop mx-auto p-2">
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App
