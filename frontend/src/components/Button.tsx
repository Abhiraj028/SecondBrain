type VariantType = "primary" | "secondary";
type SizeType = "sm"|"md"|"lg"|"xl";

const variantStyles : Record<VariantType, string> = {
    "primary": "bg-[#5046e4] text-white",
    "secondary":"bg-[#e0e7fe] text-[#5046e4]"
}

interface ButtonProps{
    variant: VariantType;
    size: SizeType;
    text: string;
    startIcon?: any;
    endIcon?: any;
    additional?: string;
    onClick?(): void;
}



const defaultStyles = "rounded-md hover:opacity-90 transition-all flex items-center transition-border-color 0.25s  font-[500]"

const sizeStyles : Record<SizeType, string> = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-3 px-6",
    "xl": "py-4 px-8"
}

export const Button = (props: ButtonProps) => {
    return (<button className={` ${props.additional} ${defaultStyles} cursor-pointer ${sizeStyles[props.size]} ${variantStyles[props.variant]}`} onClick={props.onClick}>
        {props.startIcon?<div className="pr-2">{props.startIcon}</div>:null}
        {props.text}
        {props.endIcon?<div className="pl-2">{props.endIcon}</div>:null}
        </button>)
}