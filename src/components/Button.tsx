interface Options {
    icon: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Button = (props: Options) => {
    return (
        <button type="button" onClick={props.onClick} className={props.className}>
            <span className="material-symbols-outlined">{props.icon}</span>
            {props.children}
        </button>
    )
}

export default Button;