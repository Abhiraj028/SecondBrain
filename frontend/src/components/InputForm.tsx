interface InputFormProps{
    id: string;
    placeholder: string;
    type?: string;
}

export function InputForm({id, placeholder, type = "text"}: InputFormProps){
    return(<div>
        <input type={type||"text"} id={id} placeholder={placeholder} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
    </div>)
}