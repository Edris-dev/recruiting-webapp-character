import { ATTRIBUTE_LIST } from "../../consts";

import "./AttributeList.css";
export default function AttributeList({
  updateAttributes,
  attributes,
  modifier
}) {
  return (
    <div className="attribute-wrapper">
      <h1>Attribute Scores</h1>
      <ul>
        {ATTRIBUTE_LIST.map((att_name) => (
          <li className="attribute-list" key={att_name}>
            <span style={{ display: "flex" }}>
              <p>
                {att_name}: {attributes[att_name]}{" "}
              </p>
              <p className="modifier-list">Modifier: {modifier[att_name]}</p>
            </span>
            <div className="button-group">
              <button
                className="attribute-button"
                onClick={() =>
                  updateAttributes(att_name, attributes[att_name] - 1, false)
                }
              >
                -
              </button>
              <button
                className="attribute-button"
                onClick={() =>
                  updateAttributes(att_name, attributes[att_name] + 1, true)
                }
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
