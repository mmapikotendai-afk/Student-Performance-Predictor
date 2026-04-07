from fastapi import APIRouter, HTTPException
from .schemas import PredictionInput, PredictionOutput
from .models import predict_pass_fail
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()
supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))

router = APIRouter()

@router.post('/predict', response_model=PredictionOutput)
async def predict(input: PredictionInput):
    try:
        result = predict_pass_fail(input.hours, input.attendance, input.score)
        # Save to supabase
        data = {
            'hours': input.hours,
            'attendance': input.attendance,
            'score': input.score,
            'result': result
        }
        supabase.table('predictions').insert(data).execute()
        return PredictionOutput(result=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))