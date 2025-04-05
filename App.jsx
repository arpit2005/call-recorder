import React, {useEffect, useState} from 'react';
import {Button, View, Alert, Text} from 'react-native';
import {
  requestPermissions,
  startRecording,
  stopRecording,
} from './CallRecorder';

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [path, setPath] = useState(null);
  useEffect(() => {
    requestPermissions();
  }, []);

  const handleStart = async () => {
    Alert.alert(
      'Consent',
      'This app will record audio. Confirm compliance with local laws.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start',
          onPress: async () => {
            const path = await startRecording();
            if (path) {
              setPath(path);
              setIsRecording(true);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <Text>Call Recorder</Text>
      <Text>{path}</Text>
      <Button
        title={isRecording ? 'Recording...' : 'Start Recording'}
        onPress={handleStart}
        disabled={isRecording}
      />
      <Button
        title="Stop Recording"
        onPress={() => {
          stopRecording();
          setIsRecording(false);
        }}
        disabled={!isRecording}
      />
    </View>
  );
};

export default App;
