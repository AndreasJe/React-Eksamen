import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Input from "./../components/Input";
import { delete_user, get_UserInfo } from "./../store/actions/UserActions";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import styles from "../constants/styles";

const EditProfileScreen = ({ navigation }) => {
  const username = useSelector((state) => state.user.username);
  const [validUsername, setValidUsername] = useState(username !== "");
  const dispatch = useDispatch();

  async function fetchUserInfo() {
    let tokenFromSecureStore = await SecureStore.getItemAsync("token");
    if (tokenFromSecureStore) {
      console.log("User data has been fetched");

      dispatch(get_UserInfo(tokenFromSecureStore));
    } else {
      console.log("Couldn't load tokenID from the SecureStore");
    }
  }

  useEffect(() => {
    fetchUserInfo(); // uncomment to read from secure store
  }, []);

  const save = () => {
    // ** if the 'form' is valid ** {
    // save data - we need access to text here...
    //} else {
    // display error message
    //}
  };

  return (
    <View>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <Text>I am EditProfileScreen</Text>
      <Input
        style={styles.shadow}
        label="Username"
        inputValue={username}
        error="Username cannot be empty."
        valid={validUsername}
        setValid={setValidUsername}
      />
      <Input label="Hi" inputValue="" error="Cannot be empty" />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => dispatch()}
      >
        <Text style={styles.buttonText}> Save </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
