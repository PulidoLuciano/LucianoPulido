import { ErrorMessage, Form, GeneralStatus } from "pulido-react-form";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function RecoverPassword() {
  const [emailSended, setEmailSended] = useState(false);
  const { fetcher } = useFetch();

  async function handleRecover(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget = event.currentTarget
      ? event.currentTarget
      : (event.target as HTMLFormElement);
    const { email } = event.currentTarget
      .elements as HTMLFormControlsCollection & {
      email: { value: string };
    };
    await fetcher("/auth/recover?email=" + email.value, "POST");
    setEmailSended(true);
  }

  return (
    <>
      {!emailSended ? (
        <main className="max-w-screen-mobileS px-2 mx-auto my-16">
          <Form className="flex flex-col pb-4" onSubmit={handleRecover}>
            <label htmlFor="email" className="font-semibold pb-1 pt-2">
              Enter your e-mail address
            </label>
            <input
              type="email"
              required={true}
              name="email"
              id="email"
              className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
            />
            <ErrorMessage
              htmlFor="email"
              className="text-red-500 before:content-['ⓘ_']"
            />
            <input
              type="submit"
              value={"Recover password"}
              className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"
            />
            <GeneralStatus successMessage={null} errorMessage={<GeneralMessage />} />
          </Form>
        </main>
      ) : (
        <p className="font-bold text-center my-5">Check your e-mail to continue with the recovery process.</p>
      )}
    </>
  );
}

function GeneralMessage() {
  return (
    <div className="bg-red-300 my-2 p-2 w-full rounded-md text-center border-2 border-red-600">
      ⓘ There was an error recovering your account. Please check if the e-mail is correct or try again later.
    </div>
  );
}
