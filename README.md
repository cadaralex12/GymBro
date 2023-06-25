# GymBro
Requirements:

-Windows Machine

-Git Windows installed

-React Native installed using Chocolatey for Node and JDK (installation steps: https://reactnative.dev/docs/environment-setup)

-Android Studio installed with Emulator, recommended Google Pixel 5 API 30 with running Android 11.0 (installation steps: https://developer.android.com/studio)

-Django version 4.1.5 installed (installation steps: https://www.djangoproject.com/download/)

-Python installed (installation steps: https://www.python.org/downloads/)

-Django REST Framework installed (installation steps: https://www.django-rest-framework.org/#installation)

-Any source code editor application (recommended VSCode: https://code.visualstudio.com/download)


How to run the Application:

Step 1: Clone the GitHub repository

Step 2: Open the settings.py ("...\GitHub\GymBroLicense\GymBro\GymBro\settings.py") sorce code file using the text editor of your choice

Step 3: At line 28, inside the ALLOWED_HOSTS array include your IPv4 address.

Step 4: Open the HttpUrl.js (...\GitHub\GymBroLicense\GymBro\frontend\constants\HttpUrl.js) sorce code file using the text editor of your choice

Step 5: At line 3, replace the httpsUrl constant with 'http://<Your IPv4 address>:80/api'

Step 6: Open a Windows Powershell window in the "...\GitHub\GymBroLicense\GymBro" directory

Step 7: Run the localhost server by using the command: "python manage.py runserver <Your IPv4 address>:80"

Step 8: Open another Windows Powershell window in the "...\GitHub\GymBroLicense\GymBro\frontend" directory

Step 9: Run the application by using the command: "npx react-native run-android"
