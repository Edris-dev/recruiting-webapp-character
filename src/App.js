import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import DndCharacter from "./components/DndCharacter";

const POLICY_ME_URL = `https://recruiting.verylongdomaintotestwith.ca/api/{Edris-dev}}/character`



export default function App() {
  const [characters, setCharacters] = useState([]);



  const addCharacter = () => {
    setCharacters((prevCharac) => [...prevCharac, { id: uuidv4() }]);
  };

  const savePlayerInfo = (playerInfo) => {
    const playerIndex = characters.findIndex((char) => char.id === playerInfo.id);

    if(playerIndex === -1){
      //fallback
      setCharacters((prevChar) => [...prevChar,playerInfo]);
    }else{
      const updateChar = [...characters];
      updateChar[playerIndex] = playerInfo;
      setCharacters(updateChar)
    }
  }

  const saveAllPlayers = () => {
    fetch(POLICY_ME_URL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characters),
    })
    .then((resp) => {
      if (!resp.ok){
        throw new Error(`HTTP Error!`)
      }else{
        console.log("Sucesfully Sent!")
      }
    }
    )
    .catch((err) => {
      console.log({err})
    })

  }

  const getCharacterData = async () => {
    try{
      const resp = await fetch(POLICY_ME_URL)
      if(!resp.ok){throw new Error(`Bad request!`)}
      const data = await resp.json();
      console.log({data})
      setCharacters(data.body);
    }catch(err){
      console.log({err})
    }
  }

  useEffect(() => {
    getCharacterData()
  }, [])

  return (
    <div className="App">
      <button className="save-game" onClick={() => saveAllPlayers()} >Save Game </button>
      {characters.map((data,i) => {
        return <DndCharacter key={i} id={data.id} dndData={data} savePlayerInfo={savePlayerInfo}/>;
      })}
      <button className="new-player-button" onClick={addCharacter}>
        {" "}
        Add New Player{" "}
      </button>
    </div>
  );
}
