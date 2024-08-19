import Code from "../components/forum/articles/code"
import Danger from "../components/forum/articles/danger"
import Image from "../components/forum/articles/image"
import Info from "../components/forum/articles/info"
import Ordered from "../components/forum/articles/ordered"
import Paragraph from "../components/forum/articles/paragraph"
import Title1 from "../components/forum/articles/Title1"
import Title2 from "../components/forum/articles/Title2"
import Title3 from "../components/forum/articles/Title3"
import Unordered from "../components/forum/articles/unordered"
import Warning from "../components/forum/articles/warning"

interface ArticleArtifact{
    name : string
    type : ArtifactTypes
    structure: string
    component : ({} : any) => JSX.Element
}

export enum ArtifactTypes{
    OnlyText = "onlyText",
    List = "List",
    Image = "Image",
    Code = "Code"
}

const ARTICLE_ARTIFACTS : ArticleArtifact[] = [
    {
        name : "Title1",
        type : ArtifactTypes.OnlyText,
        structure: "#&Title1#&text",
        component: Title1
    },
    {
        name : "Title2",
        type : ArtifactTypes.OnlyText,
        structure: "#&Title2#&text",
        component: Title2
    },
    {
        name : "Title3",
        type : ArtifactTypes.OnlyText,
        structure: "#&Title3#&text",
        component: Title3
    },
    {
        name : "Paragraph",
        type : ArtifactTypes.OnlyText,
        structure: "#&Paragraph#&text",
        component: Paragraph
    },
    {
        name : "Danger",
        type : ArtifactTypes.OnlyText,
        structure: "#&Danger#&text",
        component: Danger
    },
    {
        name : "Warning",
        type : ArtifactTypes.OnlyText,
        structure: "#&Warning#&text",
        component: Warning
    },
    {
        name : "Info",
        type : ArtifactTypes.OnlyText,
        structure: "#&Info#&text",
        component: Info
    },
    {
        name : "Image",
        type : ArtifactTypes.Image,
        structure: "#&Image#&url#&alt#&description",
        component: Image
    },
    {
        name : "Ordered",
        type : ArtifactTypes.List,
        structure: "#&Ordered#&item1#&item2#&item3#&EndList#&",
        component: Ordered
    },
    {
        name : "Unordered",
        type : ArtifactTypes.List,
        structure: "#&Unordered#&item1#&item2#&item3#&EndList#&",
        component: Unordered
    },
    {
        name : "Code",
        type : ArtifactTypes.Code,
        structure: "#&Code#&language#&text",
        component: Code
    },
]

export default ARTICLE_ARTIFACTS;
