import axios from "axios";
import { ArticleIcon } from "../icons/ArticleIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

export interface CardProps{
    title: string;
    link : string;
    type: "twitter" | "youtube" | "article";
    _id: string;
}
const backend_url = import.meta.env.VITE_backend_url;

export function Card({title,link,type,_id}: CardProps){
    const delId = `${backend_url}/content/${_id}`;

    async function deleteFn(_id: string){
        console.log(_id);
        await axios.delete(delId,{
            params: {
                contentId:_id
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).catch((err) => {
            if(axios.isAxiosError(err)){
                console.log(err);
                alert(`${err.response?.data.msg}`);
            }else{
                alert("An unknown error occurred. "+err);
            }
        })
        alert("Content Deleted");
        window.location.reload();
    }

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
                    <div className="text-gray-500 cursor-pointer hover:opacity-70" onClick={() => deleteFn(_id)}>
                        <TrashIcon size="md" />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type == "youtube" && <iframe className="w-full h-64 rounded-md pt-8" src={link.replace("watch?v=","embed/")} title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type == "twitter" && (
                <iframe 
                    className="w-full rounded-md" 
                    style={{ height: '500px', border: 'none' }}
                    src={`https://platform.twitter.com/embed/Tweet.html?id=${link.match(/status\/(\d+)/)?.[1]}`}
                    scrolling="no"
                    frameBorder="0"
                    allowTransparency={true}
                />
                )}

                {type == "article" && (
                <a 
                    href={link} 
                    target="_blank" 
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group"
                >
                    <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-1">{new URL(link).hostname}</div>
                    <div className="text-blue-600 group-hover:underline font-medium wrap-break-words">
                        Read Article →
                    </div>
                    <div className="text-xs text-gray-600 mt-1 break-all">{link}</div>
                    </div>
                </a>
                )}
            </div>
        </div>
        </>
    )
}