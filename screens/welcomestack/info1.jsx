import { View, StatusBar, Text } from 'react-native';

import styles from './../../constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.StatusBar}>
            <StatusBar translucent barStyle="light-content" />
        </View>
          <View style={styles.blockHeader}>
            <Ionicons name="home" style={styles.headerIkon}></Ionicons>
            <Text style={styles.blockHeaderText}>Welcome:</Text>
          </View> 
            <Text style={styles.header}>User info form 1</Text>
          <View style={styles.copyContainer}>
            <View>
              <Text style={styles.copyText}>I hope everything works :) </Text>
              <Text style={{color: "#5050a5",fontWeight:'700'}}>Sometimes it does</Text>

              <View style={styles.divider}></View>
              <Text style={styles.copyText}>Chat functionality and core features will hopefully be ready for the exam, but i got alot of stuff on my hands.{"\n"}
              {"\n"}Kind Regards, Andreas </Text>
            </View>
          </View>

        </View>
        
      );
}

export default HomeScreen;