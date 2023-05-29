# user-account-management-assignment
This project is aimed at improving the user account management features of ZPlatform, an online service provider. The goal is to enhance the onboarding process, ensure high availability and performance, handle large-scale user data, and implement top-notch security features. The features include user registration, login and logout, password reset, and user profile management.

# Installation

To run the project, you need to create a .env.dev or .env.production file in the project root directory and add the following attributes with their respective values:

REACT_APP_BACKEND_URL = [URL for the backend server]  
REACT_APP_FILE_URL = [URL for file storage]  
REACT_APP_FILE_UPLOAD_URL = [URL for file upload]  

**After setting up the environment variables, follow these steps to run the project:**  
1. Install the necessary dependencies by running the following command:  
**npm install**
2. Start the server.  
2.1. development server:  
 **npm run start**  
NB: make sure that you have .env.dev file created and added required attributes required as specified above.  
2.2. production server:  
 **npm run start:production**  
 NB: make sure that you have .env.production file created and added required attributes required as specified above.

# Features
## Account Management
1. Signup: Users can create an account by providing their necessary information.
2. Login and Logout: Users can securely log in and out of their accounts.
3. Password Reset: Users can request a password reset if they have forgotten their password.

## Security Features
1. Password Strength Enforcement and Validation: Passwords are required to meet best practice criteria for strength and are validated accordingly.
2. Multi-Factor Authentication: Support for multi-factor authentication is implemented to enhance account security.
3. Login Link: Users can receive a login link via email to quickly verify their email address inorder to be able to access their accounts.
4. Reset Link: Users can receive a reset link via email to initiate the password reset process.

## Account Verification
To verify users profiles(approve or reject), you will have to login using admin user's credentials.  

# Deployed URL  
Visit [https://user-account-management.netlify.app](https://user-account-management.netlify.app) to check deployed version of this project.

