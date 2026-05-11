import { useState } from "react";

function App() {

  const [exercise, setExercise] = useState("");
  const [steps, setSteps] = useState("");
  const [calories, setCalories] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");

  const [result, setResult] = useState("");

  const predict = async () => {

    const response = await fetch(
      `http://localhost:10000/predict?exercise_minutes=${exercise}&steps=${steps}&food_calories=${calories}&sleep_hours=${sleep}&water_intake_liters=${water}`
    );

    const data = await response.json();

    setResult(data.predicted_weight);
  };

  return (
    <div style={{padding:"40px"}}>

      <h1>Health Weight Prediction</h1>

      <input placeholder="Exercise Minutes"
      onChange={(e)=>setExercise(e.target.value)} />

      <br /><br />

      <input placeholder="Steps"
      onChange={(e)=>setSteps(e.target.value)} />

      <br /><br />

      <input placeholder="Food Calories"
      onChange={(e)=>setCalories(e.target.value)} />

      <br /><br />

      <input placeholder="Sleep Hours"
      onChange={(e)=>setSleep(e.target.value)} />

      <br /><br />

      <input placeholder="Water Intake"
      onChange={(e)=>setWater(e.target.value)} />

      <br /><br />

      <button onClick={predict}>Predict Weight</button>

      <h2>Predicted Weight: {result}</h2>

    </div>
  );
}

export default App;