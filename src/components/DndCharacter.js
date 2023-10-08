import { useEffect, useState } from "react";
import { ATTRIBUTE_LIST, SKILL_LIST } from "../consts"

import ClassList from "./ClassList/ClassList";
import AttributeList from "./AttributeList/AttributeList";
import PlayerSkills from "./PlayerSkills/PlayerSkills";
import "./DndCharacter.css";

const MOD_SKILL = "Intelligence";
const STARTING_ABILITY = 10;

export default function DndCharacter({id, dndData, savePlayerInfo}) {
  const [attributes, setAttributes] = useState(
    dndData.attributes ? dndData.attributes : (ATTRIBUTE_LIST.reduce((initialStats, currAtt) => {
      initialStats[currAtt] = 10;
      return initialStats;
    }, {}))
  );

  const [attributePoints, setAttributesPoints] = useState(
    dndData.attributePoints ? dndData.attributePoints : STARTING_ABILITY * ATTRIBUTE_LIST.length
  );

  //another option is to update attributes value to be array where
  // [attributeScore,modifier] - depending on time will add this
  const [modifier, setModifier] = useState(
    dndData.modifier ? dndData.modifier : ATTRIBUTE_LIST.reduce((initialMod, currAtt) => {
      initialMod[currAtt] = 0;
      return initialMod;
    }, {})
  );

  const [playerSkills, setPlayerSkills] = useState(
    dndData.playerSkills ? dndData.playerSkills : SKILL_LIST.reduce((initialSkills, { name }) => {
      initialSkills[name] = 0;
      return initialSkills;
    }, {})
  );

  const updateAttributes = (att_name, newScore, increase) => {
    if (increase) {
      //check curr points
      if (attributePoints === 70) {
        //exceeding and quit
        alert("Exceeding Total Ability Points!!");
        return;
      } else {
        setAttributesPoints((currPoints) => currPoints + 1);
      }
    } else {
      if (attributes[att_name] === 0 || attributePoints === 0) {
        alert("Going Below 0 - Increase!!");
        return;
      } else {
        setAttributesPoints((currPoints) => currPoints - 1);
      }
    }
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [att_name]: newScore
    }));

    //calculate modifier value
    let modVal = Math.floor((newScore - 10) / 2);

    setModifier((prevMod) => ({
      ...prevMod,
      [att_name]: modVal
    }));
  };

  const [maxSkillPoints, setMaxSkillPoints] = useState(10);

  const updateSkills = (skill_name, newScore, increase) => {
    let currSkillPoints = Object.values(playerSkills).reduce(
      (a, b) => a + b,
      0
    );
    //if increasing check the new limit is <= max otherwise return error
    if (increase) {
      currSkillPoints++;
    } else {
      currSkillPoints--;
    }

    if (currSkillPoints < 0) {
      alert("Cant have negative ability!!");
      return;
    }

    if (currSkillPoints <= maxSkillPoints && currSkillPoints >= 0) {
      setPlayerSkills((prevSkills) => ({
        ...prevSkills,
        [skill_name]: newScore
      }));
    } else {
      alert(
        `You only have ${maxSkillPoints} to spend! Increase Intelligence to have more!`
      );
    }
  };

  useEffect(() => {
    setMaxSkillPoints(10 + 4 * modifier[MOD_SKILL]);
  }, [modifier]);

  const saveCharacter = () => {
    const characterToSave = {
      id,
      attributes,
      attributePoints,
      modifier,
      playerSkills
    }
    savePlayerInfo(characterToSave);
  }

  return (

      <div className="dnd-wrapper">
        <button className="spanning-button" onClick={saveCharacter}> Save </button>
        <AttributeList
          updateAttributes={updateAttributes}
          attributes={attributes}
          modifier={modifier}
        />
        <ClassList attributes={attributes} />
        <PlayerSkills
          modifier={modifier}
          playerSkills={playerSkills}
          updateSkills={updateSkills}
          skillPoints={maxSkillPoints}
        />

      </div>

  );
}
