import {
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Button,
  Platform,
  Alert,
} from "react-native";
import { RootState } from "./../App";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch,  } from "react-redux";
import styles from "../constants/styles";
import Input from "../components/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { edit_name } from "../store/actions/UserActions";
const defaultImage = require("../assets/defaultImage.png");
import firestore from '@react-native-firebase/firestore';


const EditProfileScreen = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: RootState) => state.user);
  const [username, setUsername] = "";
  const [validUsername, setValidUsername] = useState(username !== "");
  const dispatch = useDispatch()

  useEffect(() => { 
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);


  async function save() {
  try {
    dispatch(edit_name(username))
  } catch {
    Alert.alert(
      "Something went wrong!",
      "Contact the system administrator",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    ) 
  } finally {
    navigation.navigate('Profile');
  }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle="light-content" />
      </View>
      <View style={styles.blockHeader}>
        <Ionicons name="person" style={styles.headerIkon}></Ionicons>
        <Text style={styles.blockHeaderText}>Edit Profile:</Text>
      </View>

      <View style={styles.centerContainer}>
        <View style={styles.centerContainer}>
            <Image style={styles.avatarEdit} source={defaultImage} />
          <Button
            title="Change photo"
            onPress={pickImage}
          />
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.centerContainer}>
          <Input
            label="Username"
            inputValue={username}
            error="Username cannot be empty."
            valid={validUsername}
            setValid={setValidUsername}
            placeholder="E.g John D"
            text={username}
            setText={setUsername}
          />

          <View style={styles.flexContainer}>
            <TouchableOpacity onPress={() => save()}
              style={styles.valid}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.doubleButtonContainer}
            >
              <Text style={styles.buttonText}>Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;

function getState() {
  throw new Error("Function not implemented.");
}

