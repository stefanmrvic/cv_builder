export default function SubPoint({ subPoint, className }) {
    return <li key={subPoint.id} className={className}>{subPoint.subPoint}</li>
}