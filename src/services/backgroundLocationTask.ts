// services/backgroundLocationTask.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const BACKGROUND_LOCATION_TASK = 'background-location-task';
const DRIVER_ID_KEY = '@frost_find_driver_id';

// Define the background task
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const location = locations[0];

    if (location) {
      try {
        // Get the driverId from somewhere - we'll handle this
        const driverId = await AsyncStorage.getItem(DRIVER_ID_KEY);

        if (driverId) {
          await setDoc(
            doc(db, 'drivers', driverId),
            {
              location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              isActive: true,
              timestamp: serverTimestamp(),
            },
            { merge: true }
          );
        }
      } catch (err) {
        console.error('Error updating location in background:', err);
      }
    }
  }
});


export { BACKGROUND_LOCATION_TASK, DRIVER_ID_KEY };

