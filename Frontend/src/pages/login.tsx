import { Form, GeneralStatus } from "pulido-react-form";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Link } from "luciano-react-router";
const SignUpForm = lazy(() => import("../components/signUpForm"));

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [signedUp, setSignedUp] = useState(false);
  const buttonBackground = useRef(null);
  const auth = useAuth();

  useEffect(() => {
    if (auth.refreshToken) {
      window.history.back();
      const navigationEvent = new Event("popstate");
      window.dispatchEvent(navigationEvent);
    }
  }, [auth.refreshToken]);

  useEffect(() => {
    if (buttonBackground.current)
      if(showLogin)(buttonBackground.current as HTMLInputElement).classList.remove("translate-x-full");
        else (buttonBackground.current as HTMLInputElement).classList.add("translate-x-full");
  }, [showLogin]);

  async function handleLogin(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget = event.currentTarget
      ? event.currentTarget
      : (event.target as HTMLFormElement);
    const { email, password, keepLoggedIn } = event.currentTarget
      .elements as HTMLFormControlsCollection & {
      email: { value: string };
      password: { value: string };
      keepLoggedIn: { checked: boolean };
    };
    await auth.login({
      email: email.value,
      password: password.value,
      keepLoggedIn: keepLoggedIn.checked,
    });
  }

  return (
    <main className="max-w-screen-mobileS px-2 mx-auto">
      {!signedUp ? (
        <>
          <p className="text-gray-500 mb-1 pt-3">
            Sign-up if you don't have an account yet
          </p>
          <div className="border-primary-light border-2 rounded-2xl grid grid-cols-2 relative mb-4">
            <button
              className="font-semibold z-20 py-2"
              onClick={() => setShowLogin(true)}
            >
              Log-in
            </button>
            <button
              className="font-semibold z-20"
              onClick={() => setShowLogin(false)}
            >
              Sign-up
            </button>
            <div
              ref={buttonBackground}
              className="absolute h-full w-1/2 text-center font-semibold bg-primary-light rounded-xl transition-transform"
            />
          </div>
          {showLogin ? (
            <>
            
            <Form className="flex flex-col pb-4" onSubmit={handleLogin}>
              <label htmlFor="email" className="font-semibold pb-1 pt-2">
                E-mail
              </label>
              <input
                type="email"
                required={true}
                name="email"
                id="email"
                className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
              />
              <label htmlFor="password" className="font-semibold pb-1 pt-2">
                Password
              </label>
              <input
                type="password"
                required={true}
                minLength={5}
                name="password"
                className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
              />
              <div className="mt-2 pb-1 relative flex items-center gap-1">
                <input
                  type="checkbox"
                  name="keepLoggedIn"
                  id="keepLoggedIn"
                  className="opacity-0 cursor-pointer size-6 peer z-10"
                />
                <span className="absolute top-0 left-0 size-6 border-primary-dark border-2 bg-transparent peer-checked:bg-primary-light rounded-md after:hidden peer-checked:after:block after:absolute after:left-[6px] after:w-2 after:h-4 after:border-white after:border-r-4 after:border-b-4 after:rotate-45" />
                <label
                  htmlFor="keepLoggedIn"
                  className="cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <input
                type="submit"
                value={"Log-in"}
                className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"
              />
              <GeneralStatus
                successMessage={null}
                errorMessage={<GeneralMessage />}
              />
            </Form>
            <Link href="/recover" className="block text-center text-secondary-dark underline">Did you forget your password?</Link>
            </>
          ) : (
            <Suspense fallback={"Loading..."}>
              <SignUpForm setSignedUp={setSignedUp} />
            </Suspense>
          )}
        </>
      ) : (
        <p className="font-semibold">Check your e-mail and verify your account before login!</p>
      )}
    </main>
  );
}

function GeneralMessage() {
  return (
    <div className="bg-red-300 my-2 p-2 w-full rounded-md text-center border-2 border-red-600">
      ⓘ Your credentials are not correct
    </div>
  );
}
