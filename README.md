# user-account-management-assignment
This project is aimed at improving the user account management features of ZPlatform, an online service provider. The goal is to enhance the onboarding process, ensure high availability and performance, handle large-scale user data, and implement top-notch security features. The features include user registration, login and logout, password reset, and user profile management.

# Installation

To run the project, you need to create a .env file in the project root directory and add the following attributes with their respective values:

MONGO_URI = [connection URL for mongo DB]
TOKEN_EXPIRATION = [JWT token expiration time, ex: 2h]
TOKEN_KEY = [string for JWT token encryption]
SMTP_EMAIL = [email that will be sending notifications to users]
SMTP_PASSWORD = [password for the SMTP_EMAIL]
SMTP_HOST = [host for the SMTP. ex: mail.example.rw]
SMTP_PORT = 465
FRONTEND_URL = [URL for the frontend. this will be used to redirect users to some pages of the UI]
BACKEND_URL = [URL for this backend server] 

**After setting up the environment variables, follow these steps to run the project:**  
1. Install the necessary dependencies by running the following command:  
**npm install**
2. Start the server:  
 **npm run start**  

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

# Creating admin user account  
NB: This process is done manually.  
Every user created in the database will be having an attribute called role. the default value is "user".  
so, to create an admin user you will have to use signup api to create new user and then go to the database and then update the role field for that user created as "**admin**" without the quotations.

