import { useSkills } from "../../../../AppContext";

export default function Skills() {
    const { skills } = useSkills();
    const skillsArray = skills.items.map(item => item.name).join('; ');

    return (
        <p><b>Skills: </b>{skillsArray}</p>
    )
}