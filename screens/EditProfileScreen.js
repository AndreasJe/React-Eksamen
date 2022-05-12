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
import { delete_user } from "./../store/actions/UserActions";
import { useState } from "react";
import styles from "../constants/styles";

const EditProfileScreen = ({ navigation }) => {
  const username = useSelector((state) => state.user.username);
  const [validUsername, setValidUsername] = useState(username !== "");
  const dispatch = useDispatch();

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
