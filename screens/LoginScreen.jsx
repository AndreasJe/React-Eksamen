import { View, TouchableOpacity, StyleSheet, Image, Text, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, login } from './../store/actions/UserActions'
import * as SecureStore from 'expo-secure-store';
import styles from '../constants/styles'

const LoginScreen = ({ navigation }) => {
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
            <Text style={styles.header}>Login</Text>
            <TextInput style={styles.input} 
                placeholder='Email' 
                label='Email'
                onChangeText={setEmail}
                value={email} />

            <TextInput style={styles.input} 
                placeholder='Password'
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password} />

    <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => dispatch(login(email, password))}>
        <Text style={styles.buttonText}> Log in</Text>
    </TouchableOpacity>
            
    <TouchableOpacity style={styles.copy} 
        onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.copyText}>Don't have a user? </Text>
        <Text style={styles.copyLink}> Sign up </Text>
    </TouchableOpacity> 
    </View>
    );
}

export default LoginScreen;