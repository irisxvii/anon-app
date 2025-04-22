# Speak Up🗣️: Anonymous Reporting App
A secure, campus-specific mobile application designed for students to anonymously report incidents like drug usage, suspicious activity, abuse cases, and more. The app has two roles (User & Admin) making it easy to use while keeping the data safe.

## <img src="https://github.com/user-attachments/assets/2402c258-eff4-4f63-8f22-6ec3bbf73f23" alt="kinda sus" width="50"/> How it Works? 
1. **Users**
   - Submit detailed reports anonymously under categories like Drug Use, Suspicious Activity, Abuse, or Other
   - View previously submitted reports
   - No personal data is collected, all reports are secure and private

2. **Admins**
   - Secure login for authorized access
   - View all submitted reports in a dashboard
   - Mark reports as Viewed or Resolved
## Wireframes
![user flow (2)](https://github.com/user-attachments/assets/bd4de9ef-0eb6-4d11-bb09-3284aba5768b)
   *user interface*
## Tech Stack
- **Frontend**: React Native with Expo
- **Backend:** Firebase (Firestore + Auth)
- **Language:** TypeScript

## Current Status
### Completed
- Core UI
- Firebase integration (Auth + Firestore)
- Anonymous reporting system
- Admin dashboard with real-time updates
- Role-based login
- Report status tracking
- Basic device testing

### In Progress
- Testing and final deployment setup

### Next Up
- Notify admins in real-time when a new report is submitted

## How to configure

1. **Environment Setup**
   - Install Node.js
   - Install Expo CLI
     
     ```
     npm install -g expo-cli
     ```

2. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Add Firebase configuration to the app
   - Set up security rules

3. **Clone & Run the App**
      ```
      git clone https://github.com/irisxvii/anon-app.git
      npm i
      npx expo start --go
     ```
