# MyFoodApp

A React Native Expo app for managing a restaurant menu, allowing chefs to add, edit, and remove menu items, and guests to filter by course.

## Features

- **Welcome Screen**: Initial login screen.
- **Home Screen**: Displays the complete menu with average prices per course, total items count, and filtering options.
- **Menu Management Screen**: Separate screen for chefs to add, edit, and delete menu items.
- **Filter Screen**: Allows guests to filter menu items by course (e.g., only show starters).

## Learning Outcomes

This app demonstrates the use of:
- **For loops** in TypeScript for calculating averages.
- **While loops** in TypeScript for filtering items.
- **For-in loops** in TypeScript for iterating over object properties.
- **Functions** to organize code and improve readability.
- **Global variables** (state management with React hooks).
- **Multiple files** for better code organization (types, utils, screens).

## Code Improvements (Changelog)

### Refactoring Changes
- **Extracted shared types**: Created `types.ts` to define `MenuItem` and `AveragePrice` interfaces, removing duplicates across files.
- **Added utility functions**: Created `utils.ts` with `calculateAveragePricePerCourse` (using for and for-in loops) and `filterMenuItems` (using while loop) to separate calculation logic from components.
- **Improved code organization**: Used functions like `renderMenuItem` in components for better readability.
- **Enhanced state management**: Centralized menu items in App.tsx state, passed down as props.
- **Added average price display**: Home screen now shows average prices per course below the total items count.
- **Confirmed separate screens**: Menu management is already on a separate screen from home, as required.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run web` to start the development server.
4. Open http://localhost:8081 in your browser.

## Usage

- Start at the welcome screen, enter a username to log in.
- View the home screen with menu items and averages.
- Use the filter button to select courses.
- Navigate to Menu Management to add/edit/remove items.
- All changes are reflected in real-time.

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation (implicit via state)
