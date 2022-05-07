import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Image } from 'react-native-svg';

const Event = props => {
    return (
        <View style={styles.shadow}>
        <Image
          style={styles.tinyLogo}
          source={props.imgURL}
        />
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
            
        </View>
    );
}

export default Event;