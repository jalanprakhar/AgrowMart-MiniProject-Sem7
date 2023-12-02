from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import pickle
import config

# Usefull Utils imports 
from utils.disease import disease_dic
from utils.fertilizer import fertilizer_dic
from utils.disease import disease_classes
from utils.model import ResNet9

# Importing deps for image prediction
from PIL import Image
import pandas as pd
import io
import torch
from torchvision import transforms
import numpy as np


# Loading the ML model
disease_model_path = 'models/plant_disease_model.pth'
disease_model = ResNet9(3, len(disease_classes))
disease_model.load_state_dict(torch.load(disease_model_path, map_location=torch.device('cpu')))
disease_model.eval()


app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app, resources={r"/*": {"origins": "*"}})

# Enable CORS for all routes
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

@app.route("/")
def home():
    return {"message": "Hello from backend"}

# Loading crop recommendation model
crop_recommendation_model_path = 'models/RandomForest.pkl'
crop_recommendation_model = pickle.load(open(crop_recommendation_model_path, 'rb'))

# To fetch the weather of a particular city
def weather_fetch(city_name):
    """
    Fetch and returns the temperature and humidity of a city
    :params: city_name
    :return: temperature, humidity
    """
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]

        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None

# Doing the actual crop prediction
@app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    print("Content-Type:", request.headers.get('Content-Type'))
    print("Data:", request.data)  # or request.get_json()
    data = request.get_json()
    N = int(data['nitrogen'])
    P = int(data['phosphorous'])
    K = int(data['pottasium'])
    ph = float(data['ph'])
    rainfall = float(data['rainfall'])
    city = data['city']
    temperature, humidity = weather_fetch(city) if weather_fetch(city) else (None, None)
    if temperature is not None and humidity is not None:
        model_input = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        prediction = crop_recommendation_model.predict(model_input)
        final_prediction = prediction[0]
        return jsonify({'prediction': final_prediction})
    else:
        return jsonify({'error': 'Weather data not available or invalid city name'}), 404

# Assuming 'disease_model' is loaded and 'disease_classes' is defined
def predict_image(img, model=disease_model):
    """
    Transforms image to tensor and predicts disease label.
    :param img: Image in bytes.
    :return: Prediction (string).
    """
    print('3')
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    if image.mode != 'RGB':
        image = image.convert('RGB')

    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)

    # Get predictions from model
    yb = model(img_u)
    # Pick index with highest probability
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    return prediction

# Disease Prediction
@app.route('/disease-predict', methods=['POST'])
def disease_prediction():
    print('1')
    print("Content-Type:", request.headers.get('Content-Type'))
    print("Data:", request.data)  # or request.get_json()

    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    print('2')
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        img = file.read()
        prediction = predict_image(img)
        prediction = str(disease_dic[prediction])
        return jsonify({'prediction': prediction})

# Fertilizer Prediction
@app.route('/fertilizer-predict', methods=['POST'])
def fert_recommend():
    data = request.get_json()
    crop_name = data['cropname']
    N = int(data['nitrogen'])
    P = int(data['phosphorous'])
    K = int(data['pottasium'])

    # Assuming you have a function or logic to calculate fertilizer recommendation
    df = pd.read_csv('Data/fertilizer.csv')
    nr = df[df['Crop'] == crop_name]['N'].iloc[0]
    pr = df[df['Crop'] == crop_name]['P'].iloc[0]
    kr = df[df['Crop'] == crop_name]['K'].iloc[0]

    # Calculate differences
    n = nr - N
    p = pr - P
    k = kr - K

    # Determine the fertilizer recommendation
    temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
    max_value = temp[max(temp.keys())]

    if max_value == "N":
        key = 'NHigh' if n < 0 else "Nlow"
    elif max_value == "P":
        key = 'PHigh' if p < 0 else "Plow"
    else:
        key = 'KHigh' if k < 0 else "Klow"

    response = str(fertilizer_dic[key])

    return jsonify({'recommendation': response})

if __name__ == '__main__':
    app.run(debug=True)