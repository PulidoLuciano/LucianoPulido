import Header from "./components/header";
import Footer from "./components/footer";
import { RouteObject } from "luciano-react-router/types";
import { Router } from "luciano-react-router";
import ErrorPage from "./pages/error";
import { Suspense } from "react";

function App({routes} : {routes : Array<RouteObject>}) {
  return (
    <>
      <Header/>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router routes={routes} defaultComponent={ErrorPage}/>
      </Suspense>
      <Footer/>
    </>
  )
}

export default App
