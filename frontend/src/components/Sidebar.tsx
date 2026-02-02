import { SidebarItem } from "./SidebarItem"
import { YoutubeIcon} from "../icons/YoutubeIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { ArticleIcon } from "../icons/ArticleIcon"
import { Logo } from "../icons/Logo"
export function Sidebar(){
    return(
        <div className="w-72 h-screen border-r fixed border-purple-800/50 bg-slate-900/95 backdrop-blur-sm p-4">
            <div className="flex text-2xl items-center gap-2 p-2 border-b justify-center border-b-purple-600/50 hover:ring-violet-600">
                <div className="hover:scale-105">
                    <Logo size="xl"/>
                </div>
                <div className="font-semibold text-purple-300">
                    Brainly    
                </div>
            </div>
            <div className="pt-4 pl-14">
                <SidebarItem text="Youtube" icon={<YoutubeIcon size="xl"/>}/>   
                <SidebarItem text="Twitter" icon={<TwitterIcon size="xl"/>}/>
                <SidebarItem text="Article" icon={<ArticleIcon size="xl"/>}/>

            </div>
        </div>
    )
}