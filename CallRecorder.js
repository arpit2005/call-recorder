import RNFS from 'react-native-fs';
import {NativeModules, PermissionsAndroid, Platform} from 'react-native';

const CallRecorder = NativeModules.CallRecorder;

export const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    return granted;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const startRecording = async () => {
  try {
    // Android: Save to external storage
    const fileName = `recording_${Date.now()}.aac`;
    const path = `${RNFS.ExternalDirectoryPath}/${fileName}`;

    await CallRecorder.startRecording(path);
    return path;
  } catch (err) {
    console.error('Recording failed:', err);
  }
};

export const stopRecording = () => {
  CallRecorder.stopRecording();
};
