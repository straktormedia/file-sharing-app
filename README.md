# File Sharing App :page_facing_up: → :cloud:

A secure file sharing application using HTML, JavaScript, PHP, Mysql and a REST API. This application allows users to upload, share, and manage files securely.

## Overview

The steps followed to create this application are the following: <br>
Basic Frontend, Database Setup, API, Connections, Refactoring, Polishing Frontend.
Keeping notes here along the way.
For now the files accepted are .pdf, .doc, .jpg, .png.
I was adding columns to the database tables, while building the app.
I used some of my common SCSS practices.
First time building backend, I used GPT, and then studying the answer to understand. Definetely learned a lot on the process.
Struggling with PHP syntax and Database interactions.
Things to do better: One dashboard with limited stuff for users.
No experience at all in security.
get_username.php and get_user_data.php could be one file.

Register has data validation and checks if the username or the email exists in the database.
The user logs in with the username and the password.
The password is encrypted.
Each user role has a different dashboard and permissions.
Existing email/username on registration is not working correctly.
Progress bar is giving an error althought it works.
Some errors come with alert because of no time.
Profile is at Welcome on the top left side.

## Setup Instructions

### XAMPP

Creates a local Apache server with mySQL and phpMyAdmin. After installing and starting Apache and mySQL, open your browser and navigate to "localhost/file-sharing-app".

### NPM (NodeJS)

Installs external packages easily. We are using Sass. At the root of the project, run "npm i" on your terminal.

## TO-DO

1. Permissions to specific users
2. Understand & Refactor
