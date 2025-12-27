import { useSkills } from "../../../../AppContext";

export default function Interests() {
    const { interests } = useSkills();
    const interestsArray = interests.items.map(item => item.name).join('; ');

    return (
        <p><b>Interests: </b>{interestsArray}</p>
    )
}