import {
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { RootState } from "./../App";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../constants/styles";
import Input from "../components/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { edit_profile } from "../store/actions/UserActions";
const defaultImage = require("../assets/defaultImage.png");

const EditProfileScreen = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: RootState) => state.user);
  const [validDisplayName, setValidDisplayName] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const ValidForm = validDisplayName;
  const imgUrl = useSelector((state) => state.user.imgUrl);
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState(null);

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
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle="light-content" />
      </View>
      <View style={styles.blockHeader}>
        <Ionicons name="person" style={styles.headerIkon}></Ionicons>
        <Text style={styles.blockHeaderText}>Edit Profile:</Text>
      </View>

      <View style={styles.centerContainer}>
        <View style={styles.center}>
          {newImage == undefined ? (
            <Image style={styles.avatarEdit} source={defaultImage} />
          ) : (
            <Image style={styles.avatarEdit} source={{ uri: newImage }} />
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
            text={displayName}
            setText={setDisplayName}
            error="Username cannot be empty."
            Valid={validDisplayName}
            setValid={setValidDisplayName}
            placeholder="E.g John D"
          />

          <View style={styles.flexContainer}>
            <TouchableOpacity onPress={() => dispatch(edit_profile(displayName, idToken))}
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
