import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../components/styles";
import Input from "../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const defaultImage = require("../assets/defaultImage.png");

const EditProfileScreen = ({ navigation }) => {
  const username = useSelector((state) => state.user.username);
  const [validUsername, setValidUsername] = useState(username !== "");
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
