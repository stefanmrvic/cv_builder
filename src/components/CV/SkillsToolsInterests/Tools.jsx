export default function Tools({data}) {
    const toolsArray = data.map(item => item.name).join('; ');

    return (
        <p><b>Tools: </b>{toolsArray}</p>
    )
}