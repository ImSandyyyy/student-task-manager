import './Overview.css';

type SummaryType = {
    Name: string;
    Link: string;
    IsAnId: boolean;
}

interface Options {
    pageName: string;
    summaries: SummaryType[];
}

const Overview = (props: Options) => {

    return (
        <aside className="overview scrollable">
            <p>On this page:</p>
            <h2>{props.pageName}</h2>

            <ul>
                {props.summaries.map((Elem, Index) => (
                    <li key={`SummaryItem-${Index}`}>
                        <a
                            href={Elem.IsAnId ? '#' + Elem.Link : Elem.Link}
                            target={Elem.IsAnId ? "" : "_blank"}
                            rel={Elem.IsAnId ? "" : "noopener"}
                        >{Elem.Name}</a>
                    </li>
                ))}
            </ul>
        </aside>
    )
};

export default Overview;