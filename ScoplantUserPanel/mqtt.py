import time
import json
import paho.mqtt.client as mqtt
from random import randint
from ScoplantLogInfo.models import LogInfo
from datetime import datetime

# Whatever you need here.

broker = "mqtt.eclipseprojects.io"
def subscriber():
    def on_message(client, userdata, message):
        data = message.payload.decode("utf-8")
        loaded = json.loads(data)
        Battery = loaded.get("A","0")
        Lux = loaded.get("B","0")
        Humidity = loaded.get("C","0")
        Temprature = loaded.get("D","0")
        SoilMoisture = loaded.get("E","0")
        Soil_temprature = loaded.get("F","0")
        Ec = loaded.get("G","0")
        Hours = loaded.get("H","0")
        # Date = datetime.strptime(loaded["I"], '%y-%m-%d')
        print(loaded)
        device_id=str(message.topic)
        a=device_id.split("/")
        topic_id=a[-1]
        LogInfo.objects.create(id_device_id=topic_id, id=randint(0, 9999999999), Time_Log=Hours, Battery_Log=Battery, Lux_Log=Lux, Humidity_Log=Humidity,
                            Temperature_Log=Temprature, SoilMoisture_Log=SoilMoisture, SoilTemperature_Log=Soil_temprature, EC_Log=Ec)
    client = mqtt.Client(client_id="scoplantuser",
                        clean_session=False)
    client.connect(broker)
    client.loop_start()

    client.subscribe("scoplant/p/sensor/v1/$")

    client.on_message = on_message



def publisher(sample_rate):
    client = mqtt.Client(client_id="scoplantclient")
    client.connect(broker)

    client.publish("scoplant/s/sensor/v1/1133", sample_rate)
    print("sample Send!")
