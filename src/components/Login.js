import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '../styles';

export default function Login() {
  const [username, onUserNameChange] = React.useState('');
  const [password, onPasswordChange] = React.useState('');
  return (
    <SafeAreaView style={Styles.appContainer}>
      <View style={Styles.container}>
        <Text>This is Login page.</Text>
        <TextInput
          style={Styles.inputStyle}
          multiline={false}
          placeholder="Enter Username"
          value={username}
          onChangeText={(text) => onUserNameChange(text)}
        />
        <TextInput
          style={Styles.inputStyle}
          multiline={false}
          placeholder="Enter Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => onPasswordChange(text)}
        />
        <Button title="Submit" />
      </View>
    </SafeAreaView>
  );
}
