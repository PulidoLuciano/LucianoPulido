import codeIcon from "../assets/code.svg"
import Project from "../components/portfolio/project"
import GithubLink from "../components/socialLinks/github"
import LinkedInLink from "../components/socialLinks/linkedIn"
import TwitterLink from "../components/socialLinks/twitter"

export default function Portfolio(){
    return(
        <main>
            <section className="h-[75vh] flex flex-col justify-center p-2 select-none">
                <div className="max-w-screen-mobileS laptop:max-w-screen-tablet m-auto w-full flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl">Welcome! I'm</h1>
                        <h1 className="text-4xl text-secondary-dark"><strong>Luciano Pulido</strong></h1>
                        <h1 className="text-4xl text-primary-dark"><em>software developer</em></h1>  
                        <div className="flex gap-4 mt-4">
                            <TwitterLink className="size-8 invert hover:brightness-110"/>
                            <GithubLink className="size-8 invert hover:brightness-110"/>
                            <LinkedInLink className="size-8 invert hover:brightness-110"/>
                        </div>
                    </div>
                    <img src={codeIcon} alt="Code icon" className="hidden laptop:block laptop:size-60"/>
                </div>
            </section>
            <section className="flex flex-col justify-center p-2 select-none bg-primary-dark py-16">
                <div className="max-w-screen-mobileS laptop:max-w-screen-tablet m-auto w-full">
                    <h1 className="text-tertiary font-bold text-2xl pb-2">About me</h1>
                    <p className="text-tertiary py-1 text-pretty">
                        I'm Luciano Nicolás Pulido. I born and live in Tucumán, Argentina. Since child I was passionate about computers. I learnt a lot alone during high school and when I graduated I chose to study Systems Engineering.
                    </p>
                    <p className="text-tertiary py-1 text-pretty">
                        I'm currently studying on Universidad Tecnológica Nacional - Facultad Regional Tucumán. I'm developing web right now. However, I've practiced with various technologies and languages. 
                    </p>
                    <p className="text-tertiary py-1 text-pretty">
                        I'm always learning new skills. I love reading books and play video games. And I'm eager to hear your offers!
                    </p>
                </div>
            </section>
            <section className="flex flex-col justify-center p-2 select-none bg-secondary-dark py-16" id="projects">
                <div className="max-w-screen-mobileS laptop:max-w-screen-tablet m-auto w-full">
                    <h1 className="text-tertiary font-bold text-2xl pb-2">Projects</h1>
                    <Project title={"SportsCalendar"} description={"Schedule your favorites football team's matches on google calendar with only few clicks"} image={"/sportsCalendar.webp"} github={"https://github.com/PulidoLuciano/sports-calendar"} visit="https://sportscalendar.vercel.app/" technologies="Next.js - TailwindCSS - PostgreSQL"/>
                    <Project title="CVBuilder" description="A web to make great CVs easy" image="/cvBuilder.webp" github="https://github.com/PulidoLuciano/CVBuilder" visit="https://cvsbuilder.vercel.app/" technologies="React.js"/>
                    <Project title="Hamming calculator" description="A web application to codify binary series with Hamming code" image="/hamming.webp" github="https://github.com/PulidoLuciano/Hamming" visit="https://hamming-five.vercel.app/" technologies="React.js"/>
                </div>
            </section>
            <section className="flex flex-col justify-center px-2 py-16 select-none">
                <div className="max-w-screen-mobileS laptop:max-w-screen-tablet m-auto w-full flex flex-col laptop:flex-row justify-between items-center gap-5">
                    <div>
                        <h1 className="text-4xl text-secondary-dark"><strong>Contact me!</strong></h1> 
                        <div className="flex gap-4 mt-4 justify-center laptop:justify-normal">
                            <TwitterLink className="size-8 invert hover:brightness-110"/>
                            <GithubLink className="size-8 invert hover:brightness-110"/>
                            <LinkedInLink className="size-8 invert hover:brightness-110"/>
                        </div>
                    </div>
                    <form action="" className="w-full laptop:w-3/5 flex flex-col">
                        <label htmlFor="name" className="font-semibold pb-1 pt-2">Your name</label>
                        <input type="text" placeholder="Luciano Pulido" name="name" id="name" maxLength={30} required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
                        <label htmlFor="email" className="font-semibold pb-1 pt-2">Your e-mail address</label>
                        <input type="email" placeholder="example@example.com" maxLength={50} name="email" id="email" required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
                        <label htmlFor="subject" className="font-semibold pb-1 pt-2">Subject</label>
                        <input type="text" placeholder="Just the subject of your message" name="subject" id="subject" maxLength={30} required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
                        <label htmlFor="body" className="font-semibold pb-1 pt-2">Message</label>
                        <textarea name="body" id="body" placeholder="Write your message here!" required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none resize-none scroll h-32" maxLength={300}></textarea>
                        <input type="submit" value="Send" className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"/>
                    </form>
                </div>
            </section>
        </main>
    )
}