import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../constants/styles";
import Input from "../components/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const defaultImage = require("../assets/defaultImage.png");

const EditProfileScreen = ({ navigation }) => {
  const username = useSelector((state) => state.user.username);
  const [validUsername, setValidUsername] = useState(username !== "");
  const imgUrl = useSelector((state) => state.user.imgUrl);
  const [validIMGurl, setValidIMGurl] = useState(username !== "");
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle="light-content" />
      </View>
      <View style={styles.blockHeader}>
        <Ionicons name="calendar" style={styles.headerIkon}></Ionicons>
        <Text style={styles.blockHeaderText}>Upcoming events:</Text>
      </View>

      <Button
        title="Go back to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Text style={styles.header}>Edit profile</Text>
      <View style={styles.flexContainer}>
        <View style={styles.center}>
          {image == undefined ? (
            <Image source={defaultImage} />
          ) : (
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={{ uri: image }}
            />
          )}
          <Button
            title="Change photo"
            onPress={pickImage}
            style={styles.shadow}
          />
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.center}>
          <Input
            label="Username"
            inputValue={username}
            error="Username cannot be empty."
            valid={validUsername}
            setValid={setValidUsername}
            placeholder="E.g John D"
          />

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}> Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;
