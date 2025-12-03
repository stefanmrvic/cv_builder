export default function Skills({data}) {
    const skillsArray = data.map(item => item.name).join('; ');

    return (
        <p><b>Skills: </b>{skillsArray}</p>
    )
}