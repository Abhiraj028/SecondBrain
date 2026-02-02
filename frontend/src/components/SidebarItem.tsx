import type React from "react";

interface SidebarItemProps{
    icon: React.ReactElement;
    text: string;
}

export function SidebarItem(props: SidebarItemProps){
    return(
        <div className="flex items-center gap-3 p-2 hover:bg-purple-800/30 rounded-md cursor-pointer transition-colors">
            {props.icon}
            <span className="text-md font-medium text-gray-200">{props.text}</span>
        </div>
    )
}