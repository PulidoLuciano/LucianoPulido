import { ErrorMessage, Form, GeneralStatus, Input } from "pulido-react-form";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { CompleteUser } from "../types";
import { useAuth } from "../contexts/authContext";
import { applicationConstants } from "../constants/applicationConstants";

const ErrorMessages = [
  {
    name: "password",
    messages: {
      equalize: "Passwords are different",
    },
  },
  {
    name: "Confirm new password",
    messages: {
      equalize: "Passwords are different",
    },
  },
  {
    name: "username",
    messages: {
      pattern: "Only letters, numbers, and . _ - are allowed",
      custom: "Username already exists",
    },
  },
  {
    name: "email",
    messages: {
      custom: "Email already exists",
    },
  },
];

export default function EditUser() {
  const { fetcher } = useFetch();
  const [user, setUser] = useState<CompleteUser | null>(null);
  const [originalUser, setOriginalUser] = useState<CompleteUser | null>(null);
  const auth = useAuth();

  useEffect(() => {
    async function getUserData() {
      const response = await fetcher("/user/me", "GET");
      setUser({ ...response, password: "", currentPassword: "" });
      setOriginalUser({ ...response, password: "", currentPassword: "" });
    }
    getUserData();
  }, []);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    await auth.changeUserData(user);
  }

  function changeData(
    event: React.SyntheticEvent<HTMLInputElement>
  ) {
    if(!user) return;
    let newUser : CompleteUser = { ...user };
    const fieldName = (event.target as HTMLInputElement).name;
    newUser[fieldName] =
      fieldName != "sendEmails"
        ? (event.target as HTMLInputElement).value
        : (event.target as HTMLInputElement).checked;
    setUser(newUser);
  }

  async function emailExists(email: string, _: null) {
    if(email == originalUser?.email) return false;
    return await callExists({ email });
  }
  
  async function usernameExists(username: string, _: null) {
    if(username == originalUser?.username) return false;
    return await callExists({ username });
  }
  
  async function callExists(body: { email?: string; username?: string }) {
    const response = await fetch(
      `${applicationConstants.VITE_API_BASE_URL}/user/exists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    return data.exists as boolean;
  }

  return (
    <main className="max-w-screen-mobileS px-2 mx-auto">
      <h1 className="text-3xl font-bold py-4">Change your data</h1>
      <Form
        className="flex flex-col pb-4"
        customMessages={ErrorMessages}
        onSubmit={submitForm}
      >
        <label htmlFor="Email" className="font-semibold pb-1 pt-2">
          E-mail
        </label>
        <Input
          type="email"
          required={true}
          name="email"
          className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
          onChange={changeData}
          value={user?.email}
          custom={emailExists}
        />
        <ErrorMessage
          htmlFor="email"
          className="text-red-500 before:content-['ⓘ_']"
        />
        <label htmlFor="Username" className="font-semibold pb-1 pt-2">
          Username
        </label>
        <Input
          type="text"
          required={true}
          maxLength={15}
          name="username"
          className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
          onChange={changeData}
          value={user?.username}
          pattern="^[a-zA-Z0-9._-]+$"
          custom={usernameExists}
        />
        <ErrorMessage
          htmlFor="username"
          className="text-red-500 before:content-['ⓘ_']"
        />
        <div className="mt-2 pb-1 relative flex items-center gap-1">
          <input
            type="checkbox"
            name="sendEmails"
            id="sendEmails"
            className="opacity-0 cursor-pointer size-6 peer z-10"
            onChange={changeData}
            checked={user?.sendEmails}
          />
          <span className="absolute top-0 left-0 size-6 border-primary-dark border-2 bg-transparent peer-checked:bg-primary-light rounded-md after:hidden peer-checked:after:block after:absolute after:left-[6px] after:w-2 after:h-4 after:border-white after:border-r-4 after:border-b-4 after:rotate-45" />
          <label htmlFor="sendEmails" className="cursor-pointer select-none">
            Receive e-mails about new articles
          </label>
        </div>
        <label htmlFor="password" className="font-semibold pb-1 pt-2">
          New password
        </label>
        <Input
          type="password"
          minLength={5}
          maxLength={30}
          equalize="password"
          name="password"
          className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
          onChange={changeData}
          value={user?.password}
        />
        <ErrorMessage
          htmlFor="password"
          className="text-red-500 before:content-['ⓘ_']"
        />
        <label
          htmlFor="Confirm new password"
          className="font-semibold pb-1 pt-2"
        >
          Confirm new password
        </label>
        <Input
          type="password"
          minLength={5}
          maxLength={30}
          equalize="password"
          name="Confirm new password"
          className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
        />
        <ErrorMessage
          htmlFor="Confirm new password"
          className="text-red-500 before:content-['ⓘ_']"
        />
        <em className="text-gray-500 pt-2">
          If you don't want to change your password just left those inputs blank
        </em>
        <label htmlFor="currentPassword" className="font-semibold pb-1 pt-2 mt-8">
          Current password
        </label>
        <Input
          type="password"
          required={true}
          minLength={5}
          maxLength={30}
          name="currentPassword"
          className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
          onChange={changeData}
          value={user?.currentPassword}
        />
        <ErrorMessage
          htmlFor="currentPassword"
          className="text-red-500 before:content-['ⓘ_']"
        />
        <em className="text-gray-500 pt-2">
          Your current password is necessary to change your data
        </em>
        <input
          type="submit"
          value={"Save"}
          className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"
        />
        <GeneralStatus errorMessage={<GeneralMessage/>} successMessage={<SuccessMessage/>}/>
      </Form>
    </main>
  );
}

function GeneralMessage() {
  return (
    <div className="bg-red-300 my-2 p-2 w-full rounded-md text-center border-2 border-red-600">
      ⓘ There was an error. Check your current password or try again later.
    </div>
  );
}

function SuccessMessage() {
    return (
      <div className="bg-green-300 my-2 p-2 w-full rounded-md text-center border-2 border-green-600">
        ✓ Data changed successfully
      </div>
    );
  }
