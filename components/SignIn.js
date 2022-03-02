import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signInUser = (user, pass) => {
    auth()
      .signInWithEmailAndPassword(user, pass)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        console.log(error.code);
        console.error(error);
      });

    setUsername('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign in</Text>
      <TextInput
        style={styles.input}
        name="username"
        placeholder="Username"
        onChangeText={value => setUsername(value)}
        value={username}
      />
      <TextInput
        style={styles.input}
        name="password"
        placeholder="Password"
        onChangeText={value => setPassword(value)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => signInUser(username, password)}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Not a user? Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  header: {
    fontSize: 50,
    margin: 50,
  },
  input: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    width: '60%',
    height: 40,
    padding: 10,
    margin: 10,
  },
  btn: {
    width: '45%',
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'deepskyblue',
  },
  link: {
    fontSize: 12,
    margin: 30,
  },
});

export default SignIn;
