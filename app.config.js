export default {
  "expo": {
    "name": "Frost Find",
    "slug": "frost-find",
    "version": "1.1.0",
    "owner": "gerortiz",
    "orientation": "portrait",
    "icon": "./src/assets/images/popsicle.png",
    "scheme": "frostfind",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      package: "com.gerortiz.frostfind",
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      },
      "adaptiveIcon": {
        backgroundColor: "#E6A5CB",
        foregroundImage: "./src/assets/images/popsicle.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./src/assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./src/assets/images/popsicle.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "extra": {
      "eas": {
        "projectId": "0f15f476-1bbe-485f-bbac-99f2be925a2b"
      }
    }
  }
};