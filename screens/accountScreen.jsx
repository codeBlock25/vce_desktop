import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Layout from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";

const width = Layout.window.width;
const height = Layout.window.height;

const logo = require("../assets/images/icon.png");

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.img} />
          <Text style={styles.mainTxt}>FCE</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.contentText}>Company:</Text>
            <Text style={styles.contentTxt}>Femsam Edu</Text>
          </View>
          <View style={[styles.content, styles.contentEven]}>
            <Text style={styles.contentText}>Version:</Text>
            <Text style={styles.contentTxt}>1.1.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height
  },
  imageContainer: {
    flex: 1,
    width: width,
    height: height / 2 - 100,
    minHeight: 320,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#0b3ae6"
  },
  img: {
    width: width > 600 ? 370 : 200,
    height: width > 600 ? 370 : 200,
    borderRadius: 10,
    shadowColor: "#101010",
    shadowOpacity: 7,
    shadowRadius: 20
  },
  mainTxt: {
    width: width,
    height: 30,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    textTransform: "uppercase",
    color: "#EDEDED"
  },
  contentContainer: {
    width: width,
    height: 200,
    flex: 1
  },
  content: {
    width: width,
    height: 50,
    flexDirection: "row"
  },
  contentEven: {
    backgroundColor: "#0000000d"
  },
  contentText: {
    width: null,
    height: 50,
    lineHeight: 50,
    fontWeight: "600",
    fontSize: 19,
    color: "#0b3ae6",
    paddingLeft: 30
  },
  contentTxt: {
    width: null,
    height: 50,
    lineHeight: 50,
    fontSize: 17,
    paddingLeft: 20,
    color: "#404040"
  }
});
