import { useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { InputForm } from "./InputForm";
import axios from "axios";

interface CreateContentModalProps{
    open: boolean;
    onClose: () => void;
}

const backend_url = import.meta.env.VITE_backend_url;

export function CreateContentModal({open, onClose} : CreateContentModalProps){
    const linkRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);

    if (!open) return null;

    function linkfetcher(){
        const linkId = linkRef.current?.value;
        console.log("back here");
        
        if(!linkId) return;
        console.log("here");
        if(linkId.includes("x.com")){
            typeRef.current!.value = "twitter";
        }else if(linkId.includes("youtube.com")){
            typeRef.current!.value = "youtube";
        }
    } 

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const type = typeRef.current!.value;
        console.log(type);
        
        const Authheader = `Bearer ${localStorage.getItem("token")}`;
        console.log(Authheader);
        try{
            const sendData = await axios.post(`${backend_url}/content`,{
                title,
                link,
                type
                },{
                headers: {
                    "Authorization" : Authheader
                }
            });
            alert(sendData.data.msg);
            onClose();

        }catch(err: unknown){
            if(axios.isAxiosError(err)){
                console.log(err);
                alert(`${err.response?.data.msg}`);
            }else{
                alert("An unknown error occurred. "+err);
            }
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div role="dialog" aria-modal="true" aria-labelledby="create-content-title" className="relative bg-slate-800 p-6 rounded-lg shadow-xl border border-purple-700/50 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 id="create-content-title" className="ml-30 text-xl font-semibold text-center text-purple-200">Add New Content</h2>
                    <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={onClose}>
                        <CrossIcon size="md"/>
                    </div>
                </div>

                <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <InputForm ref={titleRef} id="title" placeholder="Content Title" />
                    <InputForm onChange={linkfetcher} ref={linkRef} id="link" placeholder="Content Link" />

                    <input ref={typeRef} id="type" type="hidden" />

                    <div className="flex justify-end mt-1">
                        <Button additional= "px-8" variant="primary" size="md" text="Add" onClick={addContent} />
                    </div>
                </form>
        </div>
    </div>

    )
}