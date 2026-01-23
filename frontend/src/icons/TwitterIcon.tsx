import { iconSizeVariants, type IconProps } from "./InterfaceUtils";

export function TwitterIcon(props: IconProps){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 42"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={iconSizeVariants[props.size] || "size-4"}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M38.74 16.55v1C38.74 27.62 31.1 39.16 17.12 39.16c-3.22.03-6.38-.71-9.31-2.11.62.08 1.23.12 1.81.11a15.25 15.25 0 0 0 9.44-3.24 7.56 7.56 0 0 1-7.1-5.29c.47.11.95.17 1.44.15.68-.01 1.35-.1 2-.27A7.57 7.57 0 0 1 7 19.62v-.1a7.42 7.42 0 0 0 3.44.94 7.54 7.54 0 0 1-2.39-9.16 21.58 21.58 0 0 0 15.68 7.94 6.38 6.38 0 0 1-.21-1.74 7.55 7.55 0 0 1 13.17-5.31c1.55-.43 3.12-1 4.83-1.85a7.65 7.65 0 0 1-3.39 4.27 15.87 15.87 0 0 0 4.37-1.26 15.56 15.56 0 0 1-3.76 4Z"
            />
        </svg>
    );
}