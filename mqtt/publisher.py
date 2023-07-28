import time
import paho.mqtt.client as mqtt
from random import randint
import json
import datetime
mqttBroker = "mqtt.eclipseprojects.io"

client = mqtt.Client(client_id="scoplantadmin")
client.connect(mqttBroker)

str(datetime.date.today())
while True:
    our_data_in_dict = {
        "A": str(randint(1, 100)),
        "B": str(randint(1, 100)),
        "C": str(randint(1, 100)),
        "D": str(randint(1, 100)),
        "E": str(randint(1, 100)),
        "F": str(randint(1, 100)),
        "G": str(randint(1, 100)),
        "H": datetime.datetime.now().time().strftime("%H:%M:%S"),
        # "I": ,  we dont need date in jason here
        "J": str(randint(1, 100)),
        "K": str(randint(1, 100)),
        "L": str(randint(1, 100)),
    }
    
    data_json = json.dumps(our_data_in_dict)
    
    client.publish("scoplant/p/sensor/v1/5414273529", data_json)
    
    print("Message Send!")

    time.sleep(5)
