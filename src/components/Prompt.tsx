interface Options {
    type: React.HTMLInputTypeAttribute;
    arg: string;
    placeholder?: string;
    id?: string;
}

const Prompt = (props: Options) => {
    const idLower = (props.id ?? props.arg).toLowerCase();

  return (
    <div>
      <label htmlFor={idLower}>{props.arg}</label>
      <input type={props.type} name={props.arg} id={idLower} placeholder={props.placeholder} />
    </div>
  );
};

export default Prompt;