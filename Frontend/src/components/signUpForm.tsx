import { ErrorMessage, Form, Input } from "pulido-react-form";
import { SyntheticEvent } from "react";
import { useAuth } from "../contexts/authContext";

const ErrorMessages = [
    {
        name: "Password",
        messages: {
            equalize: "Passwords are different"
        }
    },
    {
        name: "Confirm password",
        messages: {
            equalize: "Passwords are different"
        }
    },
    {
      name: "Username",
      messages: {
        pattern: "Only letters, numbers, and . _ - are allowed"
      }
    }
]

export default function SignUpForm() {
  
  const auth = useAuth();

  async function handleSignUp(event:SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password, username, sendEmails } = event.currentTarget.elements as HTMLFormControlsCollection & {email : {value : string}, password : {value : string}, username : {value : string}, sendEmails : {checked : boolean}};
    try {
      auth.register({email: email.value, password: password.value, username: username.value, sendEmails: sendEmails.checked});
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <Form className="flex flex-col pb-4" customMessages={ErrorMessages} onSubmit={handleSignUp}>
      <label htmlFor="email" className="font-semibold pb-1 pt-2">
        E-mail
      </label>
      <input
        type="email"
        required={true}
        name="email"
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
      />
      <ErrorMessage
        htmlFor="email"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <label htmlFor="username" className="font-semibold pb-1 pt-2">
        Username
      </label>
      <input
        type="text"
        required={true}
        maxLength={30}
        pattern="^[a-zA-Z0-9._-]+$"
        name="username"
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
      />
      <ErrorMessage
        htmlFor="username"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <label htmlFor="password" className="font-semibold pb-1 pt-2">
        Password
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
      <label htmlFor="Confirm password" className="font-semibold pb-1 pt-2">
        Confirm password
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
      <div className="mt-2 pb-1 relative flex items-center gap-1">
        <input
          type="checkbox"
          name="sendEmails"
          id="sendEmails"
          className="opacity-0 cursor-pointer size-6 peer z-10"
        />
        <span className="absolute top-0 left-0 size-6 border-primary-dark border-2 bg-transparent peer-checked:bg-primary-light rounded-md after:hidden peer-checked:after:block after:absolute after:left-[6px] after:w-2 after:h-4 after:border-white after:border-r-4 after:border-b-4 after:rotate-45" />
        <label htmlFor="sendEmails" className="cursor-pointer select-none">
          Receive e-mails about new articles
        </label>
      </div>
      <input
        type="submit"
        value={"Sign-up"}
        className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"
      />
    </Form>
  );
}