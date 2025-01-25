import { ErrorMessage, Form, GeneralStatus, Input } from "pulido-react-form";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function ChangePassword() {
  const [emailSended, setEmailSended] = useState(false);
  const { fetcher } = useFetch();

  async function handleRecover(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget = event.currentTarget
      ? event.currentTarget
      : (event.target as HTMLFormElement);
    const { password } = event.currentTarget
      .elements as HTMLFormControlsCollection & {
      password: { value: string };
    };
    await fetcher("/auth/reset-password", "POST", {
        body: JSON.stringify({ password: password.value, token: new URLSearchParams(location.search).get("token")}),
    });
    setEmailSended(true);
  }

  return (
    <>
      {!emailSended ? (
        <main className="max-w-screen-mobileS px-2 mx-auto my-16">
          <Form className="flex flex-col pb-4" onSubmit={handleRecover}>
            <label htmlFor="password" className="font-semibold pb-1 pt-2">
              New password
            </label>
            <Input
              type="password"
              required={true}
              minLength={5}
              maxLength={30}
              equalize="password"
              name="password"
              className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
            />
            <ErrorMessage
              htmlFor="password"
              className="text-red-500 before:content-['ⓘ_']"
            />
            <label
              htmlFor="Confirm password"
              className="font-semibold pb-1 pt-2"
            >
              Confirm new password
            </label>
            <Input
              type="password"
              required={true}
              minLength={5}
              maxLength={30}
              equalize="password"
              name="Confirm password"
              className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
            />
            <ErrorMessage
              htmlFor="Confirm password"
              className="text-red-500 before:content-['ⓘ_']"
            />
            <input
              type="submit"
              value={"Recover password"}
              className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"
            />
            <GeneralStatus
              successMessage={null}
              errorMessage={<GeneralMessage />}
            />
          </Form>
        </main>
      ) : (
        <p className="font-bold text-center my-5">
          Your password has been changed successfully.
        </p>
      )}
    </>
  );
}

function GeneralMessage() {
  return (
    <div className="bg-red-300 my-2 p-2 w-full rounded-md text-center border-2 border-red-600">
      ⓘ There was an error recovering your account. If the e-mail is older than 10 minutes repeat the process.
    </div>
  );
}
