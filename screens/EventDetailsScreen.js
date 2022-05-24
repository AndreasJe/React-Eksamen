import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../constants/styles";

export default function EventDetails({ navigation, route }) {
  const data = route.params.errors;
  return (
    <View>
      <View style={styles.blockHeader}>
        <Ionicons
          name="information-circle"
          style={styles.headerIkon}
        ></Ionicons>
        <Text style={styles.blockHeaderText}>Event details</Text>
      </View>

      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={{ uri: route.params?.imgUrl }}
        resizeMode="cover"
        style={styles.cardIMG}
      >
        <View style={styles.overlay} />
        <Text style={styles.cardTitle}>{route.params?.title}</Text>
        <Text style={styles.cardGroup}>{route.params?.group}</Text>
      </ImageBackground>

      <View style={styles.flexColorContainer}>
        <Ionicons name="time" style={styles.ikon}></Ionicons>
        <Text style={styles.cardTime}>
          {" "}
          {route.params?.dateStart} {route.params?.timeStart} -{" "}
          {route.params?.timeEnd} {route.params?.dateEnd}{" "}
        </Text>
      </View>
      <View style={styles.flexColorContainer}>
        <Ionicons name="location" style={styles.ikon}></Ionicons>
        <Text style={styles.cardLocation}> {route.params?.location} </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}> {route.params?.description}</Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}> Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
