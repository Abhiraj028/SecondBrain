import type React from "react";

interface SidebarItemProps{
    icon: React.ReactElement;
    text: string;
}

export function SidebarItem(props: SidebarItemProps){
    return(
        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            {props.icon}
            <span className="text-md font-medium">{props.text}</span>
        </div>
    )
}