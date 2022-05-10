import { View, TouchableOpacity, StyleSheet, Image, Text, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, signup } from './../store/actions/UserActions'
import * as SecureStore from 'expo-secure-store';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()


    async function load() {
        let emailFromSecureStore = await SecureStore.getItemAsync('email');
        let tokenFromSecureStore = await SecureStore.getItemAsync('token');
        if (emailFromSecureStore && tokenFromSecureStore) {
            console.log("success", emailFromSecureStore);

            dispatch(restoreUser(emailFromSecureStore, tokenFromSecureStore));

        } else {
            console.log("Couldn't load from the SecureStore");
        }
    }

     useEffect(() => {
         load(); // uncomment to read from secure store
     }, [])


    return (
    <View>
        <Image
        style={styles.logo}
        source={require('../assets/icon.png')}
        />
        <Text style={styles.header}>Sign up to get access</Text>
        <TextInput style={styles.input} placeholder='Email'
        label='Email'
                onChangeText={setEmail}
                value={email} />

        <TextInput style={styles.input} placeholder='Password'
        label='Password'
        keyboardType="default"
        secureTextEntry={true}
                onChangeText={setPassword}
                value={password} />

    <TouchableOpacity style={styles.buttonContainer} onPress={() => dispatch(signup(email, password))}>
        <Text style={styles.buttonText}> Get Access</Text>
    </TouchableOpacity>
            
    <TouchableOpacity style={styles.copy} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.copyText}>Already have a user? </Text>
        <Text style={styles.copyLink}> Log in </Text>
    </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: {
      width: 100,
      height: 180,
      alignSelf: 'center',
      marginTop:30,
      marginBottom:10,
    },
    buttonText: {
    color: 'white',
    fontSize:16,
    fontWeight:"700",
    },
    buttonContainer: {
    backgroundColor: '#5050a5',
    justifyContent: "center",
    padding: 16,
    margin:30,
    borderRadius:10,
    height:60,
    },
    copy: {
    flexDirection: 'row',
    alignSelf:'center',
    },
    copyText: {
    color: '#5050a5',
    fontSize:16,
    },
    copyLink: {
    color: '#5050a5',
    fontSize:16,
    fontWeight:"700",
    marginLeft: -4,
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