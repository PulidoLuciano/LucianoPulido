import githubIcon from "../../assets/github.svg"

interface PropsObject{
    title : string,
    description: string,
    image: string,
    github: string,
    technologies: string,
    visit?: string
}

export default function Project(props : PropsObject){
    return(
        <article className="bg-tertiary rounded-xl p-4 shadow-xl flex justify-between items-center gap-4 my-4">
            <div>
                <h2 className="font-semibold text-primary-dark text-xl pb-2">{props.title}</h2>
                <p className="pb-3 text-balance">{props.description}</p>
                <p className="pb-1"><strong>Made with: </strong> {props.technologies}</p>
                <div className="flex gap-4">
                    <a href={props.github} className="size-8" target="_blank" referrerPolicy="no-referrer"><img src={githubIcon} alt="GitHub's icon" className="invert size-8"/></a>
                    {
                        props.visit ?
                        <a href={props.visit} target="_blank" referrerPolicy="no-referrer" className="py-1 px-8 text-center bg-secondary-light rounded-lg font-semibold">Visit</a>
                        : null
                    }
                </div>
            </div>
            <img src={props.image} alt={`${props.title} screenshot`} className="h-36 hidden rounded-md laptop:block"/>
        </article>
    )
}