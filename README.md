# File Sharing App :page_facing_up: → :cloud:

A secure file sharing application using HTML, JavaScript, PHP, Mysql and a REST API. This application allows users to upload, share, and manage files securely.

## Overview

When you launch the application, it asks you to Login or Register.

### Register

The "registerLogin.js" file is responsible for data validation. These are: correct email format, password and password confirm match as well as the password to be at least 8 characters and contain a letter and a number. The password is encrypted. PASSWORD_DEFAULT uses bcrypt for hashing. The "register.php" registers the user to the database, and gives error if the username or email already exist.
We have 2 roles. Each user role has a different permissions. After you succesfully register, you are prompted to login, and the register form disappears.

### Login

If you already have an account or just registered, you can login with your username and password. Here, again the "registerLogin.js" file sends the data to the database via "login.php" to authenticate the user. After that you are redirected to "admin-dashboard.html".

### Dashboard & Profile

Here you are being welcomed with your username. There is also a Logout button that uses the "logout.php" file to log the user out. If you click on your username, you can see your profile details at "profile.html". This is done by "profile.js" which fills in the correct data by getting them from the database using the "get_user_data.php" file. There is a button to take the user back to Dashboard. Note that if you log out, and try to navigate to "profile.html" or "admin-dashhboard.html", you will be redirected to "index.html" to register or login. This is made by the "authentication.js" and "authentication.php" files.

### Upload and Manage File

Back to our Dashboard, we have the option to upload files. "upload.php" is responsible for that, after getting the request from "script.js". The files accepted are .pdf, .doc, .jpg, .png. We have a progress bar and the uploaded file is displayed on the right side along with controls with Share, Download and Delete. Below at "All Files" section we can see all files uploaded by all users.

### Permissions

If your account role is "admin" you can Share, Download and Delete any file from any user. If your account role is "user" you can only Download files from other users. (download is random, just to show that the role user can perform less actions).

## Setup Instructions

To run the app, you will need to clone and download this repo as well as install <b>XAMPP</b>. XAMPP provides a local Apache server with mySQL and phpMyAdmin. After installing it, follow these 4 steps:

1. Starting Apache and mySQL from XAMPP Control Panel.
2. Open your browser and navigate to "localhost/phpmyadmin". Create a database called "file-sharing-app" and then import the database "file-sharing-app.sql" provided in the repo.
3. Clone the repo to your XAMPP installation directory, inside the <b>htdocs</b> folder. For example "C:\xampp\htdocs".<br>
   <u>NOTE: </u>If you download the repo as zip, make sure you rename the extracted folder to "file-sharing-app" (it might be named "file-sharing-app-main" because of the Git branch). Our goal is a path like this "C:\xampp\htdocs\file-sharing-app".
4. Go to your browser at "localhost/file-sharing-app" to view and use the application.

## Additional Information

The steps followed to create this application are the following: <br>
Basic Frontend, Database Setup, API, Connections, Refactoring, Polishing Frontend, Refactoring again. Here are some things you might want to know: <br>

1. This is the first time I was building a backend. I am not very familiar with PHP syntax, as I has only used it in WordPress. Database interactions is also something I haven't done much. I also have no experience at all in security.
2. I used GPT (for backend). This would take at least 3 timess more time without it. I think it is fair to mentioned it (although tools are tools). I then studied the code to understand it and change/remove unneccesary code. I definetely learned a lot on the process.
3. To make this README file, I was keeping notes all the time while building the app.
4. You can see the progress of the app (and of this README) from my Github commits.

## Bugs/ Things to fix

1. Progress bar is giving an error although it works.
2. Existing email/username on registration is not working correctly.
3. Some errors come with alert because of no time.
4. No time to refactor properly.
