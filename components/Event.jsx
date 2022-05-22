import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "../constants/styles";



const Event = props => {
    return (
        <TouchableOpacity 
        style={[styles.card,styles.shadowProp]}
        onPress={props.redirect}  >
            
        <ImageBackground 
        imageStyle={{ borderRadius: 10}}
        source={{uri: props.imgUrl }} 
        resizeMode="cover" 
        style={styles.cardIMG}>
        <View style={styles.overlay} />
            <Text
        style={styles.cardTitle}>{props.title}</Text>
            <Text
        style={styles.cardGroup}>{props.group}</Text>
            
            <View style={styles.flexContainer}>
            <Ionicons
                            name='time'
                            style={styles.ikon}
                        ></Ionicons>
                        <Text
                        style={styles.cardTime}> {props.dateStart} {props.timeStart} - {props.timeEnd} {props.dateEnd} </Text>
                            

            </View>
            <View style={styles.flexContainer}>
            <Ionicons
                            name='location'
                            style={styles.ikon}
                        ></Ionicons>
                        <Text
                        style={styles.cardLocation}> {props.location}  </Text>
                            

            </View>
            </ImageBackground>
            </TouchableOpacity>
    );
}

export default Event;