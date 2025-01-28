import Header from "./components/header";
import Footer from "./components/footer";
import { RouteObject } from "luciano-react-router/types";
import { Router } from "luciano-react-router";
import ErrorPage from "./pages/error";
import { Suspense } from "react";
import { AuthContext } from "./contexts/authContext";

function App({routes} : {routes : Array<RouteObject>}) {
  return (
    <>
      <AuthContext>
        <Header/>
        <Suspense fallback={<LoadingPage/>}>
          <Router routes={routes} defaultComponent={ErrorPage}/>
        </Suspense>
        <Footer/>
      </AuthContext>
    </>
  )
}

function LoadingPage(){
  return(
    null
  )
}

export default App
