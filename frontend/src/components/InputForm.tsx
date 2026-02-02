interface InputFormProps{
    id: string;
    placeholder: string;
    type?: string;
    additional?: string;
    ref?: React.Ref<HTMLInputElement>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputForm({onChange, id, placeholder, type = "text", additional, ref}: InputFormProps){
    return(<div>
        <input onChange={onChange} ref={ref} type={type||"text"} id={id} placeholder={placeholder} className={`w-full border border-purple-600/50 bg-slate-700/50 text-white placeholder-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${additional}`} />
    </div>)
}