import React, { useState } from "react";
export default function Temp() {
    const[score, setScore] = useState(0);
    const updateScore = () => {
            setScore(score + 1);
    }
    return (
        <div>
            {score}
            <p>
                <button onClick={() => updateScore()}>Update Score</button>
            </p>
        </div>
    )
}