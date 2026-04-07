from pydantic import BaseModel

class PredictionInput(BaseModel):
    hours: float
    attendance: float
    score: float

class PredictionOutput(BaseModel):
    result: str