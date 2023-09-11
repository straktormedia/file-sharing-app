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

To run the app, you will need to download and install <b>XAMPP</b>. It provides a local Apache server with mySQL and phpMyAdmin. After installing it and starting Apache and mySQL, follow these 2 simple steps:

1. Open your browser and navigate to "localhost/phpmyadmin". Import the database "file-sharing-app.sql" provided in the repo.
2. To view and use the application, go to "localhost/file-sharing-app".

## Additional Information

Keeping notes here along the way.
I was adding columns to the database tables, while building the app.
I used some of my common SCSS practices.
First time building backend, I used GPT, and then studying the answer to understand. Definetely learned a lot on the process.
Struggling with PHP syntax and Database interactions.
No experience at all in security.
GitHub commits to view the progress.

## Bugs

display:none is not the best practice for not showing share,delete buttons
get_username.php and get_user_data.php could be one file.
Existing email/username on registration is not working correctly.
Progress bar is giving an error althought it works.
Some errors come with alert because of no time.
No time to refactor. My code is usually organized.
