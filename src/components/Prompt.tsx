import "./Prompt.css";

interface Options {
    type: React.HTMLInputTypeAttribute;
    arg: string;
    className?: string;
    placeholder?: string;
    id?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Prompt = (props: Options) => {
    const idLower = (props.id ?? props.arg).toLowerCase();

    return (
        <div className={props.className ?? ""}>
            <label htmlFor={idLower}>{props.arg}</label>
            <input
                type={props.type}
                name={props.arg}
                id={idLower}
                placeholder={props.placeholder}
                required={props.required}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export default Prompt;
