import { WHEN_UNLOCKED_THIS_DEVICE_ONLY } from "expo-secure-store";
import { StyleSheet } from "react-native";
("use strict");

var React = require("react-native");
const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 40,
  },
  card: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.45)",
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  cardIMG: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  cardGroup: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  cardTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  cardLocation: {
    fontSize: 14,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  cardEnd: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    backgroundColor: "red",
    borderRadius: 10,
    width: 200,
    maxWidth: "100%",
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  flexContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  flexColorContainer: {
    flexDirection: "row",
    backgroundColor: "#5050a5",
    height: 40,
    alignItems: "center",
    alignContent: "center",
  },
  descriptionContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "#fefefe",
    fontSize: 14,
    fontStyle: "italic",
  },
  ikon: {
    height: 16,
    width: 16,
    fontSize: 16,
    marginLeft: 20,
    marginRight: 5,
    color: "white",
  },
  container: {
    paddingTop: 50,
  },
  logo: {
    width: 140,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  scrollView: {
    backgroundColor: "pink",
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
  headerIkon: {
    height: 40,
    width: 40,
    fontSize: 40,
    marginTop: -10,
    marginLeft: 10,
    marginRight: -10,
    color: "white",
  },
  blockHeaderText: {
    fontSize: 26,
    marginLeft: 20,
    color: "white",
  },
  header: {
    marginTop: 15,
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#32305d",
    paddingLeft: 20,
    paddingRight: 20,
  },
  blockHeader: {
    fontWeight: "700",
    backgroundColor: "#32305d",
    padding: 20,
    flexDirection: "row",
  },
  input: {
    alignSelf: "center",
    borderColor: "#00000070",
    borderWidth: 1,
    width: "90%",
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
  onlineStatus: {
    marginLeft: 5,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  chatroomText: {
    width: "80%",
  },
  chatroomButton: {
    width: "20%",
  },
  chatroomItem: {
    flexDirection: "row",
    padding: 5,
  },
  chatroomList: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  eventList: {
    marginTop: 30,
    marginBottom: 30,
    paddingBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "f5f5f5",
  },
  onlineContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  modalContent: {},
  modalContainer: {},
});

export default styles;
