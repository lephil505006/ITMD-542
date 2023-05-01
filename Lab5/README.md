Philip Le
ple2@hawk.iit.edu
ITMD 542 02
Repo Link: https://github.com/lephil505006/ITMD-542/tree/main/Lab5
***NOTE UPDATING IS CURRENTLY BUGGED AND WILL CRASH THE APP, SPECIFICALLY TRYING TO UPDATE THE RECIPE INSTRUCTIONS
Description: This project is a CRUD app that allows users to sign in with Google, and allows the user to access a database of recipes. The user is able to add their and also delete/edit them.

Development Environment: Windows 10, Node JS v18.14.0, Visual Studio Code

Installation Instructions: 
1. Download the ITMD-542 file from GitHub
2. Make sure to have node js updated as well.
3. Using to terminal in Visual Studio, make sure you are in "ITMD-542\lab5"
4. Independencies you will need " npm i, nodemon, mongodb, dotenv, passport-google-oidc, passport, passport-local, express-session, mongoose, bcryptsjs
5. You will want to use the code "npm run dev"
6. Once it runs successfully, you will go on your web browser and type in "localhost:3000" in the url.
7. If all checks out, the app should run successfully!

Some challenges faced were that I had a hard time initially setting up the passport due to mismanagement but it worked out. Also there's a bit of an issue with .trim() on my textarea that I hope to fix in the near future.