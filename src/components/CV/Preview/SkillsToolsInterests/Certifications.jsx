import { useSkills } from "../../../../AppContext";

export default function Certifications() {
    const { certifications } = useSkills();
    const certificationsArray = certifications.items.map(item => item.name).join('; ');

    return (
        <p><b>Certifications: </b>{certificationsArray}</p>
    )
}