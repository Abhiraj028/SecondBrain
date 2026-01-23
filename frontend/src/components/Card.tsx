import { ArticleIcon } from "../icons/ArticleIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps{
    title: string;
    link : string;
    type: "twitter" | "youtube" | "article";
}

export function Card({title,link,type}: CardProps){
    return(
        <>
        <div className="p-6 rounded-lg border shadow-md border-gray-200 bg-white max-w-96 max-h-96 overflow-auto min-w-96 ">
            <div className="flex justify-between items-center">
                <div className="flex items-center text-xl font-medium">
                    <div className="text-gray-500  pr-4">
                        {type == "youtube" && <YoutubeIcon size="lg"/>}
                        {type == "twitter" && <TwitterIcon size="lg"/>}
                        {type == "article" && <ArticleIcon size="lg"/>}
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="text-gray-500 pr-2  hover:opacity-70">
                        <a href={link} target="_blank" className="cursor-pointer">
                            <ShareIcon size="md" />
                        </a>
                    </div>
                    <div className="text-gray-500 ">
                        <TrashIcon size="md" />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type == "youtube" && <iframe className="w-full h-64 rounded-md pt-8" src={link.replace("watch?v=","embed/")} title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type == "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com","twitter.com")}></a>
                </blockquote>}
            </div>
        </div>
        </>
    )
}