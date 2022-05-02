import { View,StyleSheet, Image, Text, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, signup } from './../store/actions/UserActions'
import * as SecureStore from 'expo-secure-store';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    // const token = useSelector(state => state.user.idToken)
    // const emailTest = useSelector(state => state.user.email)
    // console.log(token);
    // console.log(emailTest);

    async function load() {
        let emailFromSecureStore = await SecureStore.getItemAsync('email');
        let tokenFromSecureStore = await SecureStore.getItemAsync('token');
        if (emailFromSecureStore && tokenFromSecureStore) {
            console.log("success", emailFromSecureStore);

            dispatch(restoreUser(emailFromSecureStore, tokenFromSecureStore));

        } else {
            console.log("failure");
        }
    }

    // useEffect(() => {
    //     load(); // uncomment to read from secure store
    // }, [])


    return (
        <View>
        <Image
        style={styles.logo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        />
            <Text style={styles.header}>Sign up to get access</Text>
            <TextInput style={styles.input} placeholder='Email' label='Email'
                onChangeText={setEmail}
                value={email} />

            <TextInput style={styles.input} placeholder='Password'
                onChangeText={setPassword}
                value={password} />

            <Button title="Signup" onPress={() => dispatch(signup(email, password))} />
            <Button title="Login Instead" onPress={() => navigation.navigate("Login")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: {
      width: 80,
      height: 100,
      alignSelf: 'center',
      marginTop:20,
      marginBottom:10,
    },
    header: {
    fontSize:26,
    fontWeight:"700",
    marginBottom:20,
    color: '#32305d',
    padding:20,
    },
    input: {
    borderColor: '#00000070',
    borderWidth:1,
    marginLeft:40,
    marginRight:40,
    margin: 0,
    height:60,
    borderRadius:4,
    padding: 10,
    },
    shadow: {
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.90,
    shadowRadius: 4.65,
    elevation: 8,
    }
  });
export default SignupScreen;