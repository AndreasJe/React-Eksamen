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

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  logo: {
    width: 100,
    height: 180,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonContainer: {
    backgroundColor: "#5050a5",
    justifyContent: "center",
    padding: 16,
    margin: 30,
    borderRadius: 10,
    height: 60,
  },
  copy: {
    flexDirection: "row",
    alignSelf: "center",
  },
  copyText: {
    color: "#5050a5",
    fontSize: 16,
  },
  copyLink: {
    color: "#5050a5",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: -4,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#32305d",
    padding: 20,
  },
  input: {
    borderColor: "#00000070",
    borderWidth: 1,
    marginLeft: 40,
    marginRight: 40,
    margin: 0,
    height: 60,
    borderRadius: 4,
    padding: 10,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default EditProfileScreen;
