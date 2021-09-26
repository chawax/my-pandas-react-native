import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation, {
  GeoError,
  GeoPosition,
} from 'react-native-geolocation-service';
import appConfig from '../../app.json';

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Géolocation non autorisée.');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Activez les services de gélolocalisation pourr autoriser "${appConfig.displayName}" à déterminer votre position.`,
      '',
      [
        {text: 'Aller dans les paramètres', onPress: openSetting},
        {text: 'Ne pas utiliser la géolocalisation', onPress: () => {}},
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      "Permission de géolocalisation refusée par l'utilisateur.",
      ToastAndroid.LONG,
    );
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      "Permission de géolocalisation révoquée par l'utilisateur.",
      ToastAndroid.LONG,
    );
  }

  return false;
};

const getLocation = (): Promise<GeoPosition> => {
  return new Promise((resolve, reject) => {
    hasLocationPermission().then((hasPermission: boolean) => {
      if (!hasPermission) {
        reject();
      }

      Geolocation.getCurrentPosition(
        (position: GeoPosition) => {
          resolve(position);
        },
        (error: GeoError) => {
          console.log(error);
          reject();
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: true,
          forceLocationManager: false,
          showLocationDialog: true,
        },
      );
    });
  });
};

export default getLocation;
