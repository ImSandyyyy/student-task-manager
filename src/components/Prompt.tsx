import "./Prompt.css";

interface Options {
  type: React.HTMLInputTypeAttribute;
  arg: string;
  className?: string;
  placeholder?: string;
  id?: string;
  required?: boolean;
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
      />
    </div>
  );
};

export default Prompt;
