import {ErrorMessage, Form, GeneralStatus} from "pulido-react-form"

const messages = [
    {
        name: "Name",
        messages: {
            maxLength: "Name must not excede 30 characters"
        }
    },
    {
        name: "Email",
        messages: {
            maxLength: "E-mail must not excede 50 characters"
        }
    },
    {
        name: "Subject",
        messages: {
            maxLength: "Subject must not excede 30 characters"
        }
    },
    {
        name: "Name",
        messages: {
            maxLength: "Name must not excede 30 characters"
        }
    },
    {
        name: "Message",
        messages: {
            maxLength: "Message must not excede 300 characters"
        }
    }
]

export default function PortfolioForm() {
  
  function handleSubmit(event : React.SyntheticEvent<HTMLFormElement>){
    event.preventDefault();
    (event.target as HTMLFormElement).reset();
  }
  
  return (
    <Form
      action=""
      className="w-full laptop:w-3/5 flex flex-col"
      customMessages={messages}
      onSubmit={handleSubmit}
      id="messageForm"
    >
      <label htmlFor="Name" className="font-semibold pb-1 pt-2">
        Your name
      </label>
      <input
        type="text"
        placeholder="Luciano Pulido"
        name="Name"
        maxLength={30}
        required={true}
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
      />
      <ErrorMessage
        htmlFor="Name"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <label htmlFor="Email" className="font-semibold pb-1 pt-2">
        Your e-mail address
      </label>
      <input
        type="email"
        placeholder="example@example.com"
        maxLength={50}
        name="Email"
        required={true}
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
      />
      <ErrorMessage
        htmlFor="Email"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <label htmlFor="Subject" className="font-semibold pb-1 pt-2">
        Subject
      </label>
      <input
        type="text"
        placeholder="Just the subject of your message"
        name="Subject"
        maxLength={30}
        required={true}
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
      />
      <ErrorMessage
        htmlFor="Subject"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <label htmlFor="Message" className="font-semibold pb-1 pt-2">
        Message
      </label>
      <textarea
        name="Message"
        id="Message"
        placeholder="Write your message here!"
        required={true}
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none resize-none scroll h-32"
        maxLength={300}
      ></textarea>
      <ErrorMessage
        htmlFor="Message"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <input
        type="submit"
        value="Send"
        className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"
      />
      <GeneralStatus successMessage={"Message sended successfully"} errorMessage={"Failed to send message"}/>
    </Form>
  );
}
