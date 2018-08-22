# Nilinet

[nilinet](http://www.nilinet.com) is an open-source IoT dashboard for device management, smart system, visualization, and energy management system. [nilinet](http://www.nilinet.com) enables device connectivity via standard protocol, for example WebSocket. [nilinet](http://www.nilinet.com) use [MongoDB](https://www.mongodb.com/), that’s open-source, scalable and flexible database. MongoDB stores data in JSON-like documents that can vary in structure. 

[![Weather](https://raw.githubusercontent.com/alialaei110/nilinet/master/aliii111.PNG)](http://www.nilinet.com)

#### [![Weather](https://raw.githubusercontent.com/alialaei110/nilinet/master/video_2018-08-1_23-37-04.gif)](http://www.nilinet.com)

### Getting Started

1. Once you have downloaded and installed Node.js on your computer. The official Node.js website has installation instructions for Node.js: https://nodejs.org. 
The easiest way to test that node is installed is to run the 'version' command in your terminal/command prompt and check that a version string is returned:
```node -v``` and Nodejs package manager NPM should also have been installed, can be tested in the same way:
```npm -v```

2. The next step you have downloaded and installed MongoDB, following this [guide](https://nodepressjs.com/install-mongodb). (tested on 'mongodb-win32-i386-2.6.8')

4. To load dependencies you have to run a command in nilinet directory:
```npm install```
This command is finding a json file named as 'package.js' to install all dependencies defined in the file.

5. After that, you need to defined hostname and port number, here we use localhost i.e 127.0.0.1 and port number 8076. port number configured in file: 'nilinet/bin/www' (it can vary based on your preferences)

5. Now run web server using ```npm start```, you can visit http://localhost:8076 in your browser.


### Nilinet Hardware
open source real-time dashboard builder for IOT

#### Prerequisites

1.  Arduino 1.8.4, get it from [Arduino website](https://www.arduino.cc/en/Main/OldSoftwareReleases#previous)

2.  Internet connection

#### Instructions

1.  Start Arduino and open Preferences window.

2.  Enter
   ``http://arduino.esp8266.com/stable/package_esp8266com_index.json``
   into *Additional Board Manager URLs* field. You can add multiple
   URLs, separating them with commas.
   
3.  Open Boards Manager from Tools > Board menu and find *esp8266*
   platform.
   
4.  Select the version you need from a drop-down box.

5.  Click *install* button.

6.  Don't forget to select your ESP8266 board from Tools > Board menu
   after installation.
   
### File Structure

files and directories:

```
material-dashboard/
├── assets/
|   ├── css/
|   |   ├── bootstrap.min.css
|   |   ├── material-dashboard.css
|   |   ├── material-dashboard-rtl.css
|   |   └── demo.css
|   ├── js/
|   |   ├── bootstrap-notify.js
|   |   ├── bootstrap.min.js
|   |   ├── chartist.min.js
|   |   ├── demo.js
|   |   ├── jquery-3.1.0.min.js
|   |   ├── material-dashboard.js
|   |   └── material.min.js
|   ├── sass/
|   |    ├── md
|   |    └── material-dashboard.scss
|   └── img/
|
├── documentation/
├── examples/

```

### Resources
- Demo: http://nilinet.com
- Documentation: https://github.com/alialaei110/nilinet
- License Agreement: https://www.creative-tim.com/license

### License
- Copyright 2018 Creative Tim (https://www.creative-tim.com)
- Licensed under MIT (https://github.com/creativetimofficial/material-dashboard/blob/master/LICENSE.md)
