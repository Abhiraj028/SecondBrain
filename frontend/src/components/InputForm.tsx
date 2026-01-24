interface InputFormProps{
    id: string;
    placeholder: string;
    type?: string;
    additional?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export function InputForm({id, placeholder, type = "text", additional, ref}: InputFormProps){
    return(<div>
        <input ref={ref} type={type||"text"} id={id} placeholder={placeholder} className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${additional}`} />
    </div>)
}