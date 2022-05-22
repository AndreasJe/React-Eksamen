import { View, TouchableOpacity, StyleSheet, Image, Text, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, signup } from './../store/actions/UserActions'
import * as SecureStore from 'expo-secure-store';
import styles from '../components/styles'

const SignupScreen = ({ navigation }) => {
    const [displayName, setdisplayName] = useState('')
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
        <TextInput style={styles.input} placeholder='Full Name'
        label='Full name'
                onChangeText={setdisplayName}
                value={displayName} />
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


    <TouchableOpacity style={styles.buttonContainer} onPress={() => dispatch(signup(email, password, displayName))}>
        <Text style={styles.buttonText}> Get Access</Text>
    </TouchableOpacity>
            
    <TouchableOpacity style={styles.copy} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.copyText}>Already have a user? </Text>
        <Text style={styles.copyLink}> Log in </Text>
    </TouchableOpacity>
    </View>
    );
}

export default SignupScreen;