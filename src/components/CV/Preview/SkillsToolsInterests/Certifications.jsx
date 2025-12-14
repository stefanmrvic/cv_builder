export default function Certifications({ data }) {
    const certificationsArray = data.map(item => item.name).join('; ');

    return (
        <p><b>Certifications: </b>{certificationsArray}</p>
    )
}