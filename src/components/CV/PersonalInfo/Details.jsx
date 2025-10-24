export default function Details({className}) {
    return (
        <ul className={className}>
            <li><p>March 14, 1996 </p></li>
            {"❖ "}
            <li><p>example@gmail.com </p></li>
            {"❖ "}
            <li><p>(310) 555-0198 </p></li>
            {"❖ "}
            <li><p>California, US </p></li>
            {"❖ "}
            <li><a href="https://www.linkedin.com/" target='_blank'>LN</a></li>
        </ul>
    )
}