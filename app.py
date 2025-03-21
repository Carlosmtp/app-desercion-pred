from flask import Flask, jsonify, request, render_template
from prediction import predict_one_sample
import joblib
import sklearn

app = Flask(__name__)

# Ruta para la página principal
@app.route('/')
def index():
    return render_template('index.html')

# Endpoint para recibir datos y predecir con model1 y pipeline1 (POST)
@app.route('/api/predict1', methods=['POST'])
def predict1():
    # Obtener todos los datos del cuerpo de la solicitud
    data = request.json

    # Validar que los datos no estén vacíos
    if not data:
        return jsonify(error="No se recibieron datos"), 400

    try:
        # Realizar la predicción con model1 y pipeline1 (por defecto)
        prediction = predict_one_sample(data)
        return jsonify(prediction), 200
    except Exception as e:
        return jsonify(error=f"Error al realizar la predicción: {str(e)}"), 500

# Endpoint para recibir datos y predecir con model2 y pipeline2 (POST)
@app.route('/api/predict2', methods=['POST'])
def predict2():
    # Obtener todos los datos del cuerpo de la solicitud
    data = request.json

    # Validar que los datos no estén vacíos
    if not data:
        return jsonify(error="No se recibieron datos"), 400

    try:
        # Realizar la predicción con model2 y pipeline2
        prediction = predict_one_sample(
            data,
            model_name='model2.pkl',
            pipeline_name='pipeline2.pkl'
        )
        return jsonify(prediction), 200
    except Exception as e:
        return jsonify(error=f"Error al realizar la predicción: {str(e)}"), 500

if __name__ == '__main__':
    app.run(debug=True)