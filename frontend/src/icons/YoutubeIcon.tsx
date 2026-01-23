import { iconSizeVariants, type IconProps } from "./InterfaceUtils";

export function YoutubeIcon(props: IconProps){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={iconSizeVariants[props.size] || "size-4"}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.8c0-1.05.8-1.93 1.86-2 4.03-.22 8.8-.22 12.82 0 1.06.07 1.86.95 1.86 2v8.4c0 1.05-.8 1.93-1.86 2-4.02.22-8.79.22-12.82 0-1.06-.07-1.86-.95-1.86-2V7.8Z"
            />
            <path
                fill="currentColor"
                strokeLinejoin="round"
                strokeWidth="0.9"
                d="M10.5 15.1V8.9L15.25 12 10.5 15.1Z"
            />
        </svg>
    );
}