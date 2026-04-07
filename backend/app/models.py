import joblib
import os
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import numpy as np

MODEL_PATH = 'model.pkl'

def train_model():
    # Dummy data
    np.random.seed(42)
    n = 1000
    hours = np.random.uniform(0, 10, n)
    attendance = np.random.uniform(0, 100, n)
    score = np.random.uniform(0, 100, n)
    # Pass if score > 50 and attendance > 70 and hours > 5
    y = ((score > 50) & (attendance > 70) & (hours > 5)).astype(int)
    X = np.column_stack([hours, attendance, score])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LogisticRegression()
    model.fit(X_train, y_train)
    joblib.dump(model, MODEL_PATH)
    return model

def load_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    else:
        return train_model()

model = load_model()

def predict_pass_fail(hours, attendance, score):
    pred = model.predict([[hours, attendance, score]])
    return 'Pass' if pred[0] == 1 else 'Fail'