# Project Name: GamePicker

## Description
**GamePicker** is a mobile application designed to help users choose the next free game to play. The app offers features such as login, registration, profile management, game search and filtering, and personalized game lists.

## Features

### Login, Registration, and Profile
- **Login**: Allows users to log in with their credentials (email and password).
- **Registration**: Ability to create a new account.
- **Email Validation**: Does not allow creating accounts with duplicate emails.
- **Profile Management**: Allows users to update account information and manage profile pictures.
- **Profile Picture**: If no picture is provided, the app displays the first letter of the name with a colored background.
- **Secure Navigation**: Users can only navigate the rest of the app after logging in.

### Game List
- **Initial Display**: Shows the list of games after the user logs in.
- **Search**: Allows searching games by title.
- **Filtering**: Ability to filter games by platform and genre.
- **Sorting**: Option to sort the list alphabetically and by release date.
- **Game Details**: Displays details of the selected game.

### Personalized Lists
- **Four Lists**: Play Later, Currently Playing, Played, Completed.
- **List Management**: Add, remove, and move games between lists.
- **Game Details**: Shows if a game is already in one of the lists and allows managing its inclusion.

### Layout
- **Intuitive Interface**: Dynamic and intuitive layout.
- **Visual Identity**: Suggested a unique visual identity for the app.

### User Feedback
- **Toast Messages**: Using Ionic's Native Toast API for success or error feedback on each action.

## Development Environment Setup

### Prerequisites
- Node.js
- npm (Node.js package manager)
- Ionic CLI
- json-server (to serve the test API)

### Installation
1. Clone this repository:
git clone https://github.com/Luismcs/testeIonic
cd GamePicker

2. Install modules:
npm install

3. Run json-server
npx json-server api.json

4. Start Server
ionic serve



