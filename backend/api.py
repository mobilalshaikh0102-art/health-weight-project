from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

app = FastAPI()

# CORS Enable
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = pickle.load(open("model.pkl", "rb"))

@app.get("/")
def home():
    return {"message": "Health Weight Prediction API Running"}

@app.get("/predict")
def predict(
    exercise_minutes: float,
    steps: float,
    food_calories: float,
    sleep_hours: float,
    water_intake_liters: float
):

    data = np.array([[
        exercise_minutes,
        steps,
        food_calories,
        sleep_hours,
        water_intake_liters
    ]])

    prediction = model.predict(data)

    return {
        "predicted_weight": float(prediction[0])
    }