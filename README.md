https://chatgpt.com/c/6783b95a-4680-800a-936b-68003f31803b


# Project Setup Instructions

## 1. Clone the Repository
```git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```
## 2. Install Required Dependencies
```
npm install
```
## 3. Start XAMPP
### Open XAMPP and start Apache (if using PHPMyAdmin) and ensure SQLite is enabled.
make sure your project is also in the htdcos directory of XAMPP

## 4. Set Up the Database
###Create an Empty SQLite Database File
```
touch database.sqlite  # Mac/Linux
echo. > database.sqlite  # Windows Command Prompt
```
### Run the Setup Script to Create Tables
```
node setupDatabase.js
```
## 5. Start the Server
```
npm start
```
## If everything is set up correctly, you should see:
### "Server is running on http://localhost:3000"

## 6. Test the API
### Open a browser or use Postman to access:
```
http://localhost:3000/
```
# The project is now set up and running!
