import Header from "./components/header";
import Footer from "./components/footer";
import { RouteObject } from "luciano-react-router/types";
import { Router } from "luciano-react-router";
import ErrorPage from "./pages/error";

function App({routes} : {routes : Array<RouteObject>}) {
  return (
    <>
      <Header/>
      <Router routes={routes} defaultComponent={ErrorPage}/>
      <Footer/>
    </>
  )
}

export default App
