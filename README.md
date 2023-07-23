<div align="center"><a href="#"><img src="assets/images/logo.png" width="400" ></a><br><br>
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" target="_blank" /></div>


The IoT MQTT Django dashboard for ESP32 (TTGO T-Higrow) is a project that provides a web-based dashboard for monitoring and controlling environmental conditions using an ESP32-based sensor device. The project utilizes the MQTT protocol for seamless communication between the sensor device and the dashboard, allowing real-time updates on the status of the environment being monitored.

The TTGO T-Higrow device is equipped with sensors that measure various environmental parameters such as temperature, humidity, and light intensity. These measurements are transmitted to the MQTT broker, which then forwards the data to the Django backend for processing. The Django backend is responsible for storing and processing the data, as well as handling user authentication and authorization.

The web-based dashboard is designed using Django's templating system and is optimized for desktop and mobile devices. The dashboard displays the data in an intuitive and user-friendly manner, allowing users to monitor the environmental conditions at a glance. The dashboard also features controls that allow users to adjust the settings of the sensor device, such as the frequency of data transmission and the threshold values for triggering alerts.

Overall, the IoT MQTT Django dashboard for ESP32 (TTGO T-Higrow) provides a powerful and flexible solution for monitoring and controlling environmental conditions using IoT technology. With its web-based interface, efficient communication protocol, and REST API, this project is sure to be a valuable tool for environmental enthusiasts and researchers.

# TTGO-T-HIGrow

The TTGO-T-HIGrow project is an open-source hardware and software solution for monitoring environmental conditions using an ESP32-based sensor device. The project provides a comprehensive set of resources for users to design and build their own TTGO-T-HIGrow sensor devices, including schematics, PCB layouts, and firmware code.

The project is based on open-source principles, and all resources and designs are freely available to the community. The project encourages collaboration and knowledge sharing, and welcomes contributions from users of all levels of experience.

### Resources
[link]( https://github.com/pesor/TTGO-T-HIGrow)




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
