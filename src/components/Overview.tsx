import './Overview.css';

interface Options { 
    pageName : string,
}


const Overview = (props: Options) => {
    return (
        <aside>
            <p>On this page:</p>
            <h2>{props.pageName}</h2>
            <ul></ul>
        </aside>
    )
}

export default Overview;
