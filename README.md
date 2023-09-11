# File Sharing App :page_facing_up: → :cloud:

A secure file sharing application using HTML, JavaScript, PHP, Mysql and a REST API. This application allows users to upload, share, and manage files securely.

## Overview

The steps followed to create this application are the following: <br>
Basic Frontend, Database Setup, API, Connections, Refactoring, Polishing Frontend.
For now the files accepted are .pdf, .doc, .jpg, .png.
Register has data validation and checks if the username or the email exists in the database.
The user logs in with the username and the password.
The password is encrypted. PASSWORD_DEFAULT uses bcrypt for hashing.
We have 2 roles. Each user role has a different permissions. One can Download, Share and Delete and the other can just view the files.
Profile is at Welcome on the top left side.

## Setup Instructions

To run the app, you will need to clone and download this repo as well as install <b>XAMPP</b>. XAMPP provides a local Apache server with mySQL and phpMyAdmin. After installing it and starting Apache and mySQL, follow these 3 simple steps:

1. Open your browser and navigate to "localhost/phpmyadmin". Create a database called "file-sharing-app" and then import the database "file-sharing-app.sql" provided in the repo.
2. Clone the repo to your XAMPP installation directory, inside the <b>htdocs</b> folder. For example "C:\xampp\htdocs".<br>
   <u>NOTE: </u>If you download the repo as zip, make sure you rename the extracted folder to "file-sharing-app" (it might be named "file-sharing-app-main" because of the Git branch). Our goal is a path like this "C:\xampp\htdocs\file-sharing-app".
3. View and use the application, by navigating to "localhost/file-sharing-app".

## Additional Information

Keeping notes here along the way.
I was adding columns to the database tables, while building the app.
I used some of my common SCSS practices.
First time building backend, I used GPT, and then studying the answer to understand. Definetely learned a lot on the process.
Struggling with PHP syntax and Database interactions.
No experience at all in security.
GitHub commits to view the progress.

## Bugs

Existing email/username on registration is not working correctly.
Progress bar is giving an error although it works.
Some errors come with alert because of no time.
No time to refactor. My code is usually organized.
