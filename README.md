<div align="center"><a href="#"><img src="assets/images/logo.png" width="400" ></a><br><br>
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" target="_blank" /></div>


The IOT MQTT Dashboard for ESP32 Plant Sensor is a project that aims to provide a user-friendly interface for monitoring and managing plant growth using an ESP32-based sensor device. This project utilizes the MQTT protocol for efficient communication between the sensor device and the dashboard, allowing real-time updates on the status of the plants being monitored.

The ESP32 Plant Sensor device is equipped with sensors that measure various parameters such as temperature, humidity, soil moisture, and light intensity. These measurements are transmitted to the MQTT broker, which then forwards the data to the dashboard for visualization. The dashboard is designed to display the data in a user-friendly manner, allowing users to monitor the growth conditions of their plants at a glance.

The dashboard also features various controls that allow users to adjust the settings of the sensor device, such as the frequency of data transmission and the threshold values for triggering alerts. These controls are implemented using MQTT topics, making it easy to modify the settings remotely.

Overall, the IOT MQTT Dashboard for ESP32 Plant Sensor provides a powerful yet easy-to-use solution for monitoring and managing plant growth using IoT technology. With its intuitive interface and efficient communication protocol, this project is sure to be a valuable tool for plant enthusiasts and researchers alike.


### How to run project
1. Copy all folders in one directory
2. Before running project make sure <code>Python3</code> is installed in your PC
3. Run <code>CMD</code>
4. Go to that directory with command for example ‘ f: ’ and press enter to go to drive F write your driver instead of ‘ f ’
5. Install <code>Django</code> and other libs in <code>requirements.txt</code> using <code>pip install -r requirements.txt</code>
6. Download and install <code>MongoDB</code> from <a href="https://www.mongodb.com/try/download/community?tck=docs_server">here</a>
7. In the ptoject folder Run the project using <code>python manage.py runserver</code>
8. If you got an error before running server run command : <code>python manage.py makemigrations</code> and <code>python manage.py migrate</code>
9. If you had another version of python write python<version> instead of python
  10. Try step 7 again
  11. if project runs successfully it will return such following message:
  <pre>
    Watching for file changes with StatReloader
    Performing system checks...
    System check identified no issues (0 silenced).
    migrations for app(s): admin, auth, contenttypes, sessions.
    Run 'python manage.py migrate' to apply them.
    August 12, 2021 - 16:50:28
    
    Django version 3.2.6, using settings 'projectname.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CTRL-BREAK.
  </pre>
  12. Go to http://localhost:8000 and see the website

## Help
If you are using other versions of django make sure to install last version on a vertualenv
