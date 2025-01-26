import { Link } from "luciano-react-router"
import Latex from "react-latex"

const bold = ({ text } : { text : string }) => <strong>{text}</strong>

const italic = ({ text } : { text : string }) => <em>{text}</em>

const underline = ({ text } : { text : string }) => <u>{text}</u>

const strikethrough = ({ text } : { text : string }) => <s>{text}</s>

const equation = ({ text } : { text : string }) => <Latex displayMode={false}>{`$$${text}$$`}</Latex>

const link = ({ url, text } : { url : string, text : string }) => <Link className="underline text-secondary-dark visited:text-primary-dark" href={url} target="_blank">{text}</Link>

export { bold, italic, underline, strikethrough, link, equation}