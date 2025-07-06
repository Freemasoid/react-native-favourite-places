# 📍 Favourite Places

This is a course app **[React Native - The Practical Guide [2025]](https://www.udemy.com/course/react-native-the-practical-guide/)**, that initially was provided in JS format. I've rebuilt it in TS with slight changes (added couple of hooks and version upgrades - e.g. course uses earlier expo sql setup).

> **Note**: This project uses React Navigation v6 instead of v7 due to breaking changes in the Native Stack Navigator. React Navigation v7 removed reliable parameter merging support (`merge: true`) in Native Stack, which would require implementing state management (Context, Zustand, Redux) instead of the prop drilling approach used in this course. Since the course focuses on demonstrating React Navigation's Native Stack capabilities with parameter passing, I've downgraded to maintain the intended learning experience.

A React Native mobile application that allows users to save and manage their favorite places with photos, location data, and interactive maps.

|                                  |
| -------------------------------- |
| ![preview](./assets/preview.gif) |

## 🚀 Features

- **📸 Photo Capture**: Take photos of your favorite places using the device camera
- **🗺️ Interactive Maps**: View saved places on Google Maps with custom markers
- **📍 Location Services**: Automatic location detection and address lookup
- **💾 Local Storage**: SQLite database for offline data persistence
- **🧭 Navigation**: Smooth navigation between screens with React Navigation
- **🎨 Modern UI**: Clean and intuitive user interface

## 📱 Screenshots

_Add your app screenshots here_

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Database**: SQLite (expo-sqlite)
- **Maps**: Google Maps API & React Native Maps
- **Navigation**: React Navigation v7
- **Camera**: Expo Image Picker
- **Location**: Expo Location Services
- **Package Manager**: pnpm

## 🏗️ Project Structure

```
src/
├── screens/           # Screen components
│   ├── AllPlaces.tsx     # Main places list
│   ├── AddPlace.tsx      # Add new place form
│   ├── Map.tsx           # Interactive map view
│   └── PlaceDetails.tsx  # Place detail view
├── components/        # Reusable UI components
│   ├── ui/              # Generic UI components
│   └── places/          # Place-specific components
├── utils/             # Utility functions
│   ├── database.ts      # SQLite database operations
│   └── location.ts      # Location and map utilities
├── types/             # TypeScript type definitions
│   ├── types.ts         # Core data types
│   └── navigation.ts    # Navigation types
└── constants/         # App constants and configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Running on Different Platforms

- **iOS Simulator**: `pnpm ios`
- **Android Emulator**: `pnpm android`
- **Web Browser**: `pnpm web`

## 🔧 Configuration

### Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Maps Static API
4. Create credentials (API Key)
5. Add the API key to your `.env` file

## 📋 Available Scripts

- `pnpm start` - Start Expo development server
- `pnpm android` - Run on Android emulator/device
- `pnpm ios` - Run on iOS simulator/device
- `pnpm web` - Run on web browser

## 🔐 Permissions

The app requires the following permissions:

- **Camera**: To take photos of places
- **Location**: To get current location and save place coordinates
- **Storage**: To save photos and database

## 🎯 Core Functionality

### Adding a Place

1. Navigate to "Add Place" screen
2. Take a photo using the camera
3. Allow location access or pick location on map
4. Enter a title for the place
5. Save the place

### Viewing Places

- Browse all saved places in the main screen
- Tap on a place to view details
- View place location on an interactive map

### Database Operations

- **Insert**: Add new places with photo and location data
- **Fetch**: Retrieve all places or specific place details
- **Storage**: All data stored locally using SQLite
