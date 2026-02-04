import { SidebarItem} from "./SidebarItem"
import { YoutubeIcon} from "../icons/YoutubeIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { ArticleIcon } from "../icons/ArticleIcon"
import { Logo } from "../icons/Logo"

interface SidebarProps{
    setFilter: (filter: React.SetStateAction<string>) => void;
    filter: string;
}

export function Sidebar(props: SidebarProps){

    return(
        <div className="w-16 sm:w-20 md:w-56 lg:w-64 h-screen border-r fixed border-purple-800/50 bg-slate-900/95 backdrop-blur-sm p-2 sm:p-3 md:p-4 transition-all duration-300">
            <div className="flex text-2xl items-center gap-2 p-2 border-b justify-center border-b-purple-600/50 hover:ring-violet-600">
                <div className="hover:scale-105">
                    <Logo size="xl"/>
                </div>
                <div className="font-semibold text-purple-300 hidden md:block">
                    Brainly    
                </div>
            </div>
            <div className="pt-4 pl-0 sm:pl-2">
                <SidebarItem filter={props.filter} setFilter={props.setFilter} text="Youtube" icon={<YoutubeIcon size="xl"/>}/>   
                <SidebarItem filter={props.filter} setFilter={props.setFilter} text="Twitter" icon={<TwitterIcon size="xl"/>}/>
                <SidebarItem filter={props.filter} setFilter={props.setFilter} text="Article" icon={<ArticleIcon size="xl"/>}/>

            </div>
        </div>
    )
}