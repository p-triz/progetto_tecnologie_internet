import React from "react";
 
const Bird = ({ birdPosition }) => {
 
    return (
        <div
            alt="bird"
            className="bird"
            style={{
                left: birdPosition.x,
                top: birdPosition.y,
                backgroundColor: "yellow"
            }}
            draggable={true}
        />
    );
};
 
export default Bird;