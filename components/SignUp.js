import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = (user, pass) => {
    auth()
      .createUserWithEmailAndPassword(user, pass)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

    setUsername('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign up</Text>
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
        onPress={() => registerUser(username, password)}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Sign Up"
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.link}>Already a user? Sign in</Text>
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

export default SignUp;
