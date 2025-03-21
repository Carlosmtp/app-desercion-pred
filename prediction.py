import joblib
import pandas as pd

# Ruta base donde se almacenan los modelos y pipelines
BASE_MODEL_PATH = 'static/models/'

def load_model_and_pipeline(model_name, pipeline_name):
    """Carga el modelo y el pipeline desde archivos .pkl."""
    model = joblib.load(BASE_MODEL_PATH + model_name)
    pipeline = joblib.load(BASE_MODEL_PATH + pipeline_name)
    print(f"Modelo '{model_name}' y pipeline '{pipeline_name}' cargados correctamente.")
    return model, pipeline

def predict_one_sample(sample, model_name='model1.pkl', pipeline_name='pipeline1.pkl'):
    """Realiza una predicción para un solo dato."""
    model, pipeline = load_model_and_pipeline(model_name, pipeline_name)
    sample_df = pd.DataFrame([sample])  # Convierte el diccionario en DataFrame
    sample_transformed = pipeline.transform(sample_df)
    prediction = model.predict(sample_transformed)
    return {"prediction": "DESERTOR" if prediction[0] == 1 else "NO DESERTOR",
            "probability": model.predict_proba(sample_transformed).max(),
            "model": model_name,
            "pipeline": pipeline_name}

def predict(data, model_name='model1.pkl', pipeline_name='pipeline1.pkl'):
    """Realiza una predicción para varios datos."""
    model, pipeline = load_model_and_pipeline(model_name, pipeline_name)
    data_df = pd.DataFrame(data)  # Convierte la lista de diccionarios en DataFrame
    data_transformed = pipeline.transform(data_df)
    predictions = model.predict(data_transformed)
    return [{"prediction": "DESERTOR" if pred == 1 else "NO DESERTOR"} for pred in predictions]