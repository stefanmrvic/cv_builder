export default function Interests({data}) {
    return (
        <p><b>Interests: </b>{data.join('; ')}</p>
    )
}