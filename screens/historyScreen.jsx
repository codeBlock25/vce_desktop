import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
  ImageBackground,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import Layout from "../constants/Layout";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView
} from "react-native-gesture-handler";

const width = Layout.window.width;
const height = Layout.window.height;
const BG = require("../assets/images/bg.jpg");

export default class HistorScreen extends Component {
  state = {
    file: [],
    failed: 0,
    passed: 0,
    timeTaken: 0,
    attempted: 0,
    done: false,
    bookMark: [],
    progress: 0,
    date: "",
    file2: []
  };
  async componentDidMount() {
    await AsyncStorage.getItem("history", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result) {
          let fil = JSON.parse(result);
          this.setState({
            file: fil.file,
            failed: fil.failed,
            passed: fil.passed,
            timeTaken: fil.timeTaken,
            attempted: fil.attempted
          });
        }
      }
    });
    await AsyncStorage.getItem("bookMark")
      .then(result => {
        if (result) {
          let x = JSON.parse(result);
          this.setState({
            bookMark: x[0],
            progress: x[1],
            date: x[2],
            file: x[3]
          });
        } else {
          let x = JSON.parse(result);
          this.setState({ bookMark: [], progress: 0 });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#909090" }}>
        <View style={styles.container}>
          <View
            style={
              this.state.done
                ? {
                    width: width,
                    height: height,
                    position: "absolute",
                    backgroundColor: "rgba(10,10,10,0.5)",
                    zIndex: 45678,
                    alignContent: "center",
                    justifyContent: "center"
                  }
                : { display: "none" }
            }
          >
            <ActivityIndicator size={50} color="#ededed" />
          </View>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 20,
                height: null,
                lineHeight: 60,
                paddingHorizontal: 10,
                fontWeight: "600",
                color: "white"
              }}
            >
              History
            </Text>
          </View>
          <ImageBackground
            source={BG}
            style={{
              width: width,
              height: height,
              alignContent: "center",
              top: 0,
              left: 0
            }}
            resizeMode="cover"
          >
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                paddingTop: 130
              }}
            >
              <Text
                style={{
                  margin: 10,
                  marginTop: 0,
                  alignSelf: "center",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#a7a3a3"
                }}
              >
                last played
              </Text>
              <View
                style={[
                  styles.title,
                  {
                    paddingVertical: 10,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    zIndex: 8888
                  }
                ]}
              >
                <View
                  style={{
                    width: "50%",
                    height: "50%",
                    left: -30
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      lineHeight: 150,
                      height: 100,
                      fontSize: 40,
                      fontWeight: "bold"
                    }}
                  >
                    {this.state.failed}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      textTransform: "capitalize",
                      color: "#f56c6c"
                    }}
                  >
                    failed
                  </Text>
                </View>
                <View
                  style={{
                    width: "50%",
                    height: "50%",
                    left: -20
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      lineHeight: 150,
                      height: 100,
                      fontSize: 40,
                      fontWeight: "bold"
                    }}
                  >
                    {this.state.passed}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      textTransform: "capitalize",
                      color: "#10c13e"
                    }}
                  >
                    passed
                  </Text>
                </View>
                <Text
                  style={{
                    width: "100%",
                    height: 30,
                    fontSize: 18
                  }}
                >
                  Time taken: {this.state.timeTaken}
                </Text>
                <Text
                  style={{
                    width: "100%",
                    height: 30,
                    fontSize: 18
                  }}
                >
                  Attempted: {this.state.attempted}
                </Text>
                <View
                  style={
                    Platform.OS === "ios"
                      ? {
                          width: "90%",
                          height: 50,
                          backgroundColor: "#1a6fec",
                          position: "absolute",
                          bottom: 10,
                          borderRadius: 60,
                          padding: 10,
                          zIndex: 99999
                        }
                      : {
                          width: "80%",
                          height: 50,
                          alignSelf: "flex-start",
                          borderRadius: 60,
                          zIndex: 99999
                        }
                  }
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                    onPress={() => {
                      let x = this.state.file;
                      this.setState({ done: false });
                      if (x) {
                        this.props.navigation.navigate("questionier", {
                          file: x
                        });

                        this.setState({ done: false });
                      } else {
                        this.setState({ done: false });
                        Alert.alert(
                          "Opps",
                          "No file selected",
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            {
                              text: "OK",
                              onPress: () => console.log("OK Pressed")
                            }
                          ],
                          { cancelable: false }
                        );
                      }
                    }}
                  >
                    <Text
                      style={{
                        width: null,
                        height: null,
                        textAlign: "center",
                        lineHeight: 30,
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                        textTransform: "uppercase"
                      }}
                    >
                      play again
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  margin: 10,
                  marginTop: 30,
                  alignSelf: "center",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#a7a3a3"
                }}
              >
                bookMark
              </Text>
              {this.state.bookMark.length >= 1 ? (
                <>
                  <View
                    style={{
                      width: width - 50,
                      height: 120,
                      backgroundColor: "#202020",
                      alignSelf: "center",
                      marginVertical: 20,
                      borderRadius: 5,
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: "#fff"
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          width: null,
                          height: null,
                          color: "#fff",
                          fontSize: 20,
                          padding: 5,
                          fontWeight: "600",
                          textAlign: "center"
                        }}
                      >
                        Date: {this.state.date}
                      </Text>
                      <Text
                        style={{
                          width: null,
                          height: null,
                          color:
                            this.state.progress < 30
                              ? "#f94949"
                              : this.state.progress < 60
                              ? "yellow"
                              : "#7cdc40",
                          fontSize: 16,
                          padding: 4,
                          textAlign: "center"
                        }}
                      >
                        Progress:{" "}
                        {this.state.progress === 0
                          ? 0
                          : this.state.progress * 100}
                        %
                      </Text>
                      <View
                        style={{
                          width: "60%",
                          height: 50,
                          backgroundColor: "#0369d4",
                          borderRadius: 60,
                          alignSelf: "center"
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent"
                          }}
                          onPress={() => {
                            this.props.navigation.navigate(
                              "questionier",
                              this.state.file2
                            );
                          }}
                        >
                          <Text
                            style={{
                              width: null,
                              height: null,
                              alignSelf: "center",
                              lineHeight: 50,
                              fontSize: 16,
                              fontWeight: "bold",
                              color: "white"
                            }}
                          >
                            RESUME
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <Text></Text>
              )}
            </ScrollView>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    paddingTop: 20,
    zIndex: 10000,
    width: width,
    height: 80,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#0b3ae6",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    marginBottom: 20,
    shadowColor: "#81a2ff",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.4,
    elevation: 10,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#0b2ca5",
    borderStyle: "solid"
  },
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "white"
  },
  titleHead: {
    position: "absolute",
    width: width,
    height: 70,
    paddingLeft: 50,
    backgroundColor: "#eee",
    alignContent: "center",
    alignSelf: "center",
    zIndex: 100
  },
  titleTxt: {
    width: width,
    height: 70,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 16,
    lineHeight: 70,
    color: "#888"
  },
  title: {
    zIndex: 9999,
    width: width - 50,
    height: height / 2.5,
    minHeight: 300,
    paddingLeft: 50,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10
  },
  Txt: {
    width: width,
    height: 70,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 16,
    lineHeight: 70,
    color: "#222"
  }
});
