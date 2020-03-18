import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  Image,
  Alert,
  AsyncStorage,
  Keyboard,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native-gesture-handler";
import * as FileSystem from "expo-file-system";
import { getDocumentAsync } from "expo-document-picker";
import Dialog from "react-native-dialog";
import { ProgressBar, Colors } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import _ from "lodash";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

// ============== images ==================

const Logo = require("../assets/images/icon.png");
const exam1 = require("../assets/images/exam1.jpg");
const exam2 = require("../assets/images/exam2.jpg");
const exam3 = require("../assets/images/bg3.jpg");

// ================ end ===================

export default function HomeScreen({ navigation }) {
  const [start, setStarted] = useState(true);
  const [loading, setloading] = useState(true);
  const [done, setDone] = useState(false);
  const [fileuri, setfileuri] = useState("");
  const [file, setfile] = useState({});
  const [questionCount, setquestionCount] = useState(0);
  const [password, setPassword] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [trailCount, settrailCount] = useState(1);
  const [size, setSize] = useState(0);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");

  const loader = async () => {
    await AsyncStorage.getItem("files", (err, result) => {
      if (result) {
        setFiles(JSON.parse(result));
        setStarted(false);
      }
      if (err) {
        console.log(err);
      }
    });
  };
  useEffect(() => {
    if (start) {
      loader();
    }
  });

  const FileLoader = async (uri, loaded, title) => {
    let fileCurrent = [];
    let questionCountCurrent = 0;
    let titleCurrent = "";
    setDone(true);
    try {
      await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.UTF8
      }).then(async data => {
        let x = JSON.parse(data);
        fileCurrent = x;
        questionCountCurrent = x.questions.length;
        titleCurrent = x.title;
      });
    } catch (error) {
      let xy = files;
      _.remove(xy, file => {
        return file.fileuri === uri;
      });
      await AsyncStorage.setItem("files", JSON.stringify(xy)).then(() => {
        setFiles(xy);
      });
      console.log(error);
    }
    console.log(fileCurrent, questionCountCurrent, titleCurrent);
    if (loaded === true) {
      setfile(fileCurrent);
      setquestionCount(questionCountCurrent);
      setTitle(titleCurrent);
      await navigation.navigate("questionier", {
        file: fileCurrent
      });
    } else {
      let found = files.some(file => {
        return file.title === titleCurrent;
      });
      if (!found) {
        setfile(fileCurrent);
        setquestionCount(questionCountCurrent);
        setTitle(titleCurrent);
        setmodalOpen(true);
      } else {
        Alert.alert("Action", "file already exit", [
          {
            text: "CANCEL",
            onPress: () => {
              setmodalOpen(false);
              setDone(false);
            }
          },
          {
            text: "PLAY",
            onPress: async () => {
              await navigation.navigate("questionier", {
                file: file
              });
            }
          }
        ]);
      }
    }
  };
  const handleFileDownload = async evt => {
    setloading(true);
    await getDocumentAsync("*.vce", false).then(async result => {
      setfileuri(result.uri);
      setSize(result.size);
      if (!result.uri) {
        Alert.alert("Sorry", "no file selected", [
          {
            text: "OK"
          }
        ]);
        setloading(false);
      } else {
        FileLoader(result.uri, false);
      }
    });
  };
  const SaveForLater = async uri => {
    await AsyncStorage.setItem(
      "files",
      JSON.stringify([
        ...files,
        {
          fileuri: uri,
          title: title,
          questionCount: questionCount,
          size: size
        }
      ])
    ).then(() => {
      setFiles([
        ...files,
        {
          fileuri: uri,
          title: title,
          questionCount: questionCount,
          size: size
        }
      ]);
      setmodalOpen(false);
      setDone(false);
    });
  };
  const goToQuestionScreen = async (x, uri) => {
    setDone(true);
    await AsyncStorage.setItem(
      "files",
      JSON.stringify([
        ...files,
        {
          fileuri: uri,
          title: title,
          questionCount: questionCount,
          size: size
        }
      ]),
      async (err, success) => {
        if (err) {
          setmodalOpen(false);
          setDone(false);
        } else {
          setFiles([
            ...files,
            {
              fileuri: uri,
              title: title,
              questionCount: questionCount,
              size: size
            }
          ]);
          await navigation.navigate("questionier", {
            file: x
          });
          setmodalOpen(false);
          setDone(false);
        }
      }
    );
  };
  const confirmPassword = async x => {
    setDone(true);
    if (trailCount <= 3) {
      if (file.password.toLowerCase() === password.toLowerCase()) {
        settrailCount(1);
        Alert.alert(
          "Success",
          "file has been the ecrpyted",
          [
            {
              text: "CANCEL",
              onPress: () => {
                setmodalOpen(false);
                setDone(false);
              }
            },
            {
              text: "SAVE",
              onPress: () => {
                SaveForLater(fileuri);
              }
            },
            {
              text: "START",
              onPress: async () => {
                goToQuestionScreen(x, fileuri);
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "unsuccessful",
          `You have ${3 - trailCount} retrials left`,
          [
            {
              text: "OK",
              onPress: () => {
                setPassword("");
              }
            }
          ]
        );
      }
      settrailCount(trailCount + 1);
    } else {
      FileSystem.deleteAsync(fileuri, { idempotent: true });
    }
  };
  return (
    <SafeAreaView style={styles.containier}>
      <View style={styles.header}>
        <View
          style={
            done
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
        <Image source={Logo} style={styles.logo} />
        <Text
          style={{
            fontSize: 20,
            height: null,
            lineHeight: 40,
            paddingHorizontal: 10,
            fontWeight: "600",
            color: "white",
            marginTop: 10
          }}
        >
          FCE
        </Text>
      </View>
      <Dialog.Container visible={modalOpen}>
        <Dialog.Title>Encryption key</Dialog.Title>
        <Dialog.Description>pass in your encryption key</Dialog.Description>
        <Dialog.Input
          wrapperStyle={{
            width: null,
            height: null
          }}
          style={{
            color: "black",
            borderColor: "#101010",
            borderRadius: 5,
            borderWidth: 1,
            borderStyle: "solid"
          }}
          onChangeText={password => {
            setPassword(password);
          }}
          placeholder="******"
          keyboardType="visible-password"
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setmodalOpen(false);
            Keyboard.dismiss();
          }}
        />
        <Dialog.Button label="confirm" onPress={() => confirmPassword(file)} />
      </Dialog.Container>
      {/* <ScrollView
        contentContainerStyle={{
          flex: 1,
          paddingTop: 130,
          paddingBottom: 100
        }}
      > */}
      {/* <View
        style={{
          height: 1000,
          flex: 1
        }}
      > */}
      <ScrollView
        decelerationRate={0}
        contentContainerStyle={{
          paddingHorizontal: 30,
          paddingTop: 100,
          flex: 1,
          height: "auto"
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Image
            source={exam1}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
          <View
            style={{
              width: "100%",
              height: 50,
              zIndex: 100,
              backgroundColor: "whitesmoke"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                width: null,
                height: "100%",
                fontSize: 20,
                lineHeight: 65,
                color: "#606060",
                alignSelf: "center",
                fontWeight: "bold"
              }}
            >
              Files
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "auto"
            }}
          >
            {files.length >= 1 ? (
              files.map((file, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: "100%",
                      height: 100,
                      backgroundColor: "whitesmoke",
                      shadowColor: "rgba(50,50,50, 0.3)",
                      shadowOffset: {
                        width: 0,
                        height: 0
                      },
                      shadowRadius: 10,
                      shadowOpacity: 0.3,
                      elevation: 3,
                      borderRadius: 10,
                      marginVertical: 20,
                      borderColor: "white",
                      borderWidth: 2,
                      borderStyle: "solid"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        FileLoader(file.fileuri, true);
                      }}
                    >
                      <Text
                        style={{
                          width: null,
                          height: 40,
                          padding: 10,
                          paddingHorizontal: 20,
                          fontSize: 15,
                          fontWeight: "600"
                        }}
                      >
                        File: {file.title || ""}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          paddingHorizontal: 20,
                          color: "#4d749c",
                          fontWeight: "bold"
                        }}
                      >
                        Question: {file.questionCount}
                      </Text>
                      <Text
                        style={{
                          paddingHorizontal: 20,
                          paddingTop: 5
                        }}
                      >
                        Size: {parseFloat((file.size / 1000000).toFixed(3))} MB
                      </Text>
                      <Entypo
                        name="controller-play"
                        color="#1e99fc"
                        size={50}
                        style={{
                          position: "absolute",
                          right: 10,
                          alignSelf: "center",
                          top: 20
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text
                style={{
                  width: "100%",
                  color: "#707070",
                  textAlign: "center",
                  marginTop: 10
                }}
              >
                empty
              </Text>
            )}
          </View>
        </View>
        {/* <View
          style={{
            width: width,
            height: height,
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "column"
          }}
        >
          <View style={styles.block}></View>
          <View style={styles.block}></View>
          <View style={styles.block}></View>
          <View style={styles.block}></View>
          <View style={styles.block}></View>
        </View>*/}
      </ScrollView>
      {/* </View> */}
      <View style={styles.btnCover}>
        <TouchableWithoutFeedback
          style={{
            width: null,
            height: null,
            justifyContent: "center",
            alignContent: "center",
            flex: 1
          }}
          onPress={() => handleFileDownload()}
        >
          <AntDesign
            size={30}
            color="white"
            style={{
              alignSelf: "center"
            }}
            name="addfile"
          />
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    width: width / 2 - 40,
    height: 200,
    flex: 1,
    backgroundColor: "red"
  },
  content: {
    width: width - 60,
    height: height / 2 - 100,
    maxHeight: 300,
    borderRadius: 7,
    marginRight: 60
  },
  btnCover: {
    position: "absolute",
    top: height - 170,
    right: 10,
    zIndex: 15000,
    width: 60,
    height: 60,
    minWidth: 60,
    minHeight: 60,
    maxWidth: 60,
    backgroundColor: "#303030",
    alignSelf: "center",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#434343",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.7,
    elevation: 5,
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid"
  },
  logo: {
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 5,
    marginTop: 10
  },
  header: {
    position: "absolute",
    top: 0,
    paddingTop: 20,
    zIndex: 1000,
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
  containier: {
    position: "absolute",
    height: height,
    width: width,
    flex: 1,
    backgroundColor: "whitesmoke"
  }
});
