import { SKILL_LIST } from "../../consts";
import "../AttributeList/AttributeList.css";

export default function PlayerSkills({
  modifier,
  playerSkills,
  updateSkills,
  skillPoints
}) {
  return (
    <div className="attribute-wrapper">
      <h1> Skill List </h1>
      <h4> Skill Points Available: {skillPoints} </h4>
      <ul>
        {SKILL_LIST.map(({ name, attributeModifier }) => {
          return (
            <li key={name} className="attribute-list">
              <p>
                {" "}
                {name}: {playerSkills[name]}{" "}
              </p>
              <div className="button-group">
                <button
                  className="attribute-button"
                  onClick={() =>
                    updateSkills(name, playerSkills[name] - 1, false)
                  }
                >
                  -
                </button>
                <button
                  className="attribute-button"
                  onClick={() =>
                    updateSkills(name, playerSkills[name] + 1, true)
                  }
                >
                  +
                </button>
              </div>
              <p>
                {attributeModifier}: {modifier[attributeModifier]}{" "}
              </p>
              <p style={{ fontSize: "1.3rem" }}>
                {" "}
                {playerSkills[name] + modifier[attributeModifier]}{" "}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
