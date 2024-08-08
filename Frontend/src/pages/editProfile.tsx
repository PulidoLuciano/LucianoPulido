import { ErrorMessage, Form, Input } from "pulido-react-form";

const ErrorMessages = [
    {
        name: "New password",
        messages: {
            equalize: "Passwords are different"
        }
    },
    {
        name: "Confirm new password",
        messages: {
            equalize: "Passwords are different"
        }
    }
]

export default function EditUser(){
    return(
        <main className="max-w-screen-mobileS px-2 mx-auto">
            <h1 className="text-3xl font-bold py-4">Change your data</h1>
            <Form className="flex flex-col pb-4" customMessages={ErrorMessages}>
                <label htmlFor="Email" className="font-semibold pb-1 pt-2">
                    E-mail
                </label>
                <input
                    type="email"
                    required={true}
                    name="Email"
                    className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
                />
                <ErrorMessage
                    htmlFor="Email"
                    className="text-red-500 before:content-['ⓘ_']"
                />
                <label htmlFor="Username" className="font-semibold pb-1 pt-2">
                    Username
                </label>
                <input
                    type="text"
                    required={true}
                    maxLength={15}
                    name="Username"
                    className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
                />
                <ErrorMessage
                    htmlFor="Username"
                    className="text-red-500 before:content-['ⓘ_']"
                />
                <label htmlFor="New password" className="font-semibold pb-1 pt-2">
                    New password
                </label>
                <Input
                    type="password"
                    required={true}
                    minLength={5}
                    maxLength={30}
                    equalize="password"
                    name="New password"
                    className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
                />
                <ErrorMessage
                    htmlFor="New password"
                    className="text-red-500 before:content-['ⓘ_']"
                />
                <label htmlFor="Confirm new password" className="font-semibold pb-1 pt-2">
                    Confirm new password
                </label>
                <Input
                    type="password"
                    required={true}
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
                <label htmlFor="Current password" className="font-semibold pb-1 pt-2">
                    Current password
                </label>
                <Input
                    type="password"
                    required={true}
                    minLength={5}
                    maxLength={30}
                    name="Current password"
                    className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
                />
                <ErrorMessage
                    htmlFor="Current password"
                    className="text-red-500 before:content-['ⓘ_']"
                />
                <div className="mt-2 pb-1 relative flex items-center gap-1">
                    <input
                    type="checkbox"
                    name="receiveEmail"
                    id="receiveEmail"
                    className="opacity-0 cursor-pointer size-6 peer z-10"
                    />
                    <span className="absolute top-0 left-0 size-6 border-primary-dark border-2 bg-transparent peer-checked:bg-primary-light rounded-md after:hidden peer-checked:after:block after:absolute after:left-[6px] after:w-2 after:h-4 after:border-white after:border-r-4 after:border-b-4 after:rotate-45" />
                    <label htmlFor="receiveEmail" className="cursor-pointer select-none">
                    Receive e-mails about new articles
                    </label>
                </div>
                <input
                    type="submit"
                    value={"Sign-up"}
                    className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"
                />
            </Form>
        </main>
    )
}