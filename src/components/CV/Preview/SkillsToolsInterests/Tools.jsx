import { useSkills } from "../../../../AppContext";

export default function Tools() {
    const { tools } = useSkills();
    const toolsArray = tools.items.map(item => item.name).join('; ');

    return (
        <p><b>Tools: </b>{toolsArray}</p>
    )
}