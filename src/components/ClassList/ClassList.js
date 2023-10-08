import { CLASS_LIST } from "../../consts";
import { useEffect, useState } from "react";
import "./ClassList.css";
export default function ClassList({ attributes }) {
  //whenever attributes change check if it meets min req,
  // if so

  const [classes, setClasses] = useState(
    Object.keys(CLASS_LIST).reduce((classTitle, currClass) => {
      classTitle[currClass] = false;
      return classTitle;
    }, {})
  );

  const [showClass, setShowClass] = useState(false);
  const [classReqs, setClassReqs] = useState(null);
  const [clickedClass, setClickedClass] = useState(null);

  useEffect(() => {
    const updatedClasses = { ...classes };
    //check current attributes to class attributes if match set state to true
    for (const [classTitle, classAttributes] of Object.entries(CLASS_LIST)) {
      let satifies = true;

      for (const ability of Object.keys(classAttributes)) {
        if (classAttributes[ability] > attributes[ability]) {
          satifies = false;
          break;
        }
      }

      updatedClasses[classTitle] = satifies;
    }

    setClasses(updatedClasses);
  }, [attributes]);

  const showClassInfo = (classTitle) => {
    setClickedClass(classTitle);
    setClassReqs(CLASS_LIST[classTitle]);
    setShowClass(true);
  };

  const hideClassInfo = () => {
    setShowClass(false);
  };

  return (
    <div className="class-wrapper">
      <h1> Class List </h1>
      <ul>
        {Object.entries(classes).map(([name, isCapable]) => {
          return (
            <li
              onClick={() => showClassInfo(name)}
              className={`class-list ${isCapable ? "active" : "inactive"}`}
            >
              {name}
            </li>
          );
        })}
      </ul>
      {showClass && classReqs ? (
        <div className="requirements-wrapper">
          <h4> {`${clickedClass} - Minimum Requirements:`}</h4>
          <ul>
            {Object.entries(classReqs).map(([att_name, score]) => {
              return (
                <li className="requirement-list">
                  {att_name} : {score}
                </li>
              );
            })}
          </ul>
          <button onClick={() => hideClassInfo()}> Close </button>
        </div>
      ) : null}
    </div>
  );
}
