import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { InputForm } from "./InputForm";

interface CreateContentModalProps{
    open: boolean;
    onClose: () => void;
}


export function CreateContentModal({open, onClose} : CreateContentModalProps){
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

            <div role="dialog" aria-modal="true" aria-labelledby="create-content-title" className="relative bg-white p-6 rounded-lg shadow-xl border border-gray-200 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 id="create-content-title" className="ml-30 text-xl font-semibold text-center">Add New Content</h2>
                    <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={onClose}>
                        <CrossIcon size="md"/>
                    </div>
                </div>

                <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <InputForm id="title" placeholder="Content Title" />
                    <InputForm id="link" placeholder="Content Link" />

                    <select id="type" defaultValue="" className="border border-gray-300 rounded-md p-2 focus:outline-none">
                        <option value="" disabled>Choose type</option>
                        <option value="twitter">Twitter</option>
                        <option value="youtube">YouTube</option>
                        <option value="article">Article</option>
                    </select>

                    <div className="flex justify-end mt-1">
                        <Button additional= "px-8" variant="primary" size="md" text="Add" onClick={() => {}} />
                    </div>
                </form>
        </div>
    </div>

    )
}