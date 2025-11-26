export default function Interests({data}) {
    const interestsArray = data.map(item => item.name).join('; ');

    return (
        <p><b>Interests: </b>{interestsArray}</p>
    )
}