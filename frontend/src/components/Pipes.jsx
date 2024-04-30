import React from "react";
 
const Pipes = ({ pipePosition }) => {
    return (
        <div
            alt="pipe"
            className="pipe"
            style={{
                left: pipePosition.x,
                top: pipePosition.y,
                backgroundColor: "green"
            }}
            draggable={true}
        />
    );
};
 
export default Pipes;