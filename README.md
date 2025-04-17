# Speak Up🗣️: Anonymous Reporting App

A secure, campus-specific mobile application designed for students to anonymously report incidents like drug usage, suspicious activity, abuse cases, and more. The app has two roles (User & Admin) making it easy to use while keeping the data safe.

## How it Works?
1. **Users**
   - Submit detailed reports anonymously under categories like Drug Use, Suspicious Activity, Abuse, or Other
   - View previously submitted reports
   - No personal data is collected, all reports are secure and private

2. **Admins**
   - Secure login for authorized access
   - View all submitted reports in a dashboard
   - Mark reports as Viewed or Resolved

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
