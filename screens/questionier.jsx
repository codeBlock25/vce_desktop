import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Modal,
  View,
  Dimensions,
  Text,
  Alert,
  SafeAreaView,
  AsyncStorage,
  Button,
  Platform,
  Image
} from "react-native";
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity
} from "react-native-gesture-handler";
import CountDown from "react-native-countdown-component";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import CheckBox from "react-native-check-box";
import Toast, { DURATION } from "react-native-easy-toast";
import _ from "lodash";
import moment from "moment";
import styles from "../styles/quest.style";
import { AnswerAction, questionPageAction } from "../redux/action/quest.action";
import { connect } from "react-redux";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function Questionier(props) {
  const [loading, setloading] = useState(true);
  const [questions, setquestions] = useState([]);
  const [file, setFile] = useState({});
  const [failed, setfailed] = useState(0);
  const [passed, setpassed] = useState(0);
  const [time, setTime] = useState(0);
  const [finishedIn, setfinishedIn] = useState(0);
  const [done, setdone] = useState(false);
  const [cc, setcc] = useState(false);
  const [stops, setStops] = useState([]);
  const scrollRef = useRef(null);
  const ToastRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const { answerBlockRedux, setanswerBlockRedux } = props;
  const { questionPageRedux, setquestionPageRedux } = props;
  const loader = async () => {
    setFile(props.route.params.file);
    setloading(false);
    setquestionPageRedux(0);
    setquestions(props.route.params.file.questions);
    setTime(parseInt(props.route.params.file.time, 10) * 60);
    await AsyncStorage.getItem("bookMark").then(async result => {
      if (result) {
        let x = JSON.parse(result);
        setStops(x);
        await AsyncStorage.setItem("bookMark", "");
      } else {
        setStops([]);
      }
    });
  };
  const alertDen = () => {
    Alert.alert(
      "Quit",
      "Are you sure you want to quit",
      [
        {
          text: "Quit",
          onPress: () => {
            mark();
            setdone(true);
          }
        },
        {
          text: "Cancel"
        }
      ],
      { cancelable: false }
    );
  };
  const mark = () => {
    var answeredCorrectly = answerBlockRedux.filter(block => {
      return block.answer === true;
    });
    let failed = file.questions.length - answeredCorrectly.length;
    var passed = answeredCorrectly.length;
    setpassed(passed);
    setfailed(failed);
    AsyncStorage.setItem(
      "history",
      JSON.stringify({
        file: file,
        failed: failed,
        passed: passed,
        timeTaken: Math.ceil((time - finishedIn) / 60),
        attempted: answerBlockRedux.length
      }),
      (err, sucess) => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
  };
  const marker = async (indexmain, values, question) => {
    let answeredBefore = false;
    let promise = new Promise((resolve, reject) => {
      let t = false;
      try {
        t = answerBlockRedux.some(block => {
          return block.questionNum === indexmain;
        });
        resolve(t);
      } catch (error) {
        reject(errorr);
      }
    });
    await promise.then(result => {
      answeredBefore = result;
    });
    let correctAnswer = values.correctA
      ? "opA"
      : values.correctB
      ? "opB"
      : values.correctC
      ? "opC"
      : values.correctD
      ? "opD"
      : null;
    let ownAnswer =
      values.opA === true
        ? "opA"
        : values.opB === true
        ? "opB"
        : values.opC === true
        ? "opC"
        : values.opD === true
        ? "opD"
        : null;
    let isCorrect = ownAnswer === correctAnswer ? true : false;
    if (!values.opA && !values.opB && !values.opC && !values.opD) {
      Alert.alert(
        "Alert!",
        "Please provide an answer or swipe to skip question",
        [
          {
            text: "UNDERSTOOD"
          }
        ]
      );
    } else if (answeredBefore === true) {
      let whole = answerBlockRedux;
      _.remove(whole, block => {
        return block.questionNum === indexmain;
      });
      if (correctAnswer === null) {
        setanswerBlockRedux([
          ...whole,
          {
            questionNum: indexmain,
            question: question.question.question,
            mark: question.question.mark ? question.question.mark : 1,
            answer: true,
            correctAnswer: correctAnswer,
            choosenAnswer: ownAnswer
          }
        ]);
      } else {
        setanswerBlockRedux([
          ...whole,
          {
            questionNum: indexmain,
            question: question.question.question,
            mark: question.question.mark ? question.question.mark : 1,
            answer: isCorrect,
            correctAnswer: correctAnswer,
            choosenAnswer: ownAnswer
          }
        ]);
      }
      scrollLoc("forward");
    } else if (correctAnswer === null) {
      Alert.alert(
        "Sorry!",
        "a correct answer was not given to this question so it will be skipped",
        [
          {
            text: "UNDERSTOOD"
          }
        ]
      );
      setanswerBlockRedux([
        ...answerBlockRedux,
        {
          questionNum: indexmain,
          question: question.question.question,
          mark: question.question.mark ? question.question.mark : 1,
          answer: true,
          correctAnswer: correctAnswer,
          choosenAnswer: ownAnswer
        }
      ]);
      scrollLoc("forward");
    } else {
      setanswerBlockRedux([
        ...answerBlockRedux,
        {
          questionNum: indexmain,
          question: question.question.question,
          mark: question.question.mark ? question.question.mark : 1,
          answer: isCorrect,
          correctAnswer: correctAnswer,
          choosenAnswer: ownAnswer
        }
      ]);
      scrollLoc("forward");
    }
  };
  useEffect(() => {
    if (loading) {
      loader();
    }
  });
  const scrollLoc = (position, stopPos) => {
    if (position === "back") {
      if (questionPageRedux <= 1) {
        scrollRef.current.scrollTo({
          x: questionPageRedux,
          y: 0
        });
      } else {
        scrollRef.current.scrollTo({
          x: questionPageRedux - width,
          y: 0
        });
      }
    } else if (position === "forward") {
      scrollRef.current.scrollTo({
        x: questionPageRedux + width,
        y: 0
      });
    } else {
      scrollRef.current.scrollTo({
        x: questionPageRedux,
        y: 0
      });
    }
  };
  const saveForLater = async () => {
    let historyStop = [];
    let progress = answerBlockRedux.length / questions.length;
    let date = moment().format("MMM Do YY");
    answerBlockRedux.map(block => {
      historyStop.push({
        questionNum: block.questionNum,
        choosenAnswer: block.choosenAnswer
      });
    });
    Alert.alert("Action", "Do you want to book mark your current progress", [
      {
        text: "CONTINUE"
      },
      {
        text: "SAVE FOR LATER",
        onPress: async () => {
          await AsyncStorage.setItem(
            "bookMark",
            JSON.stringify([historyStop, progress, date, file])
          )
            .then(() => {
              props.navigation.navigate("Home");
            })
            .catch(err => {
              Alert.alert("Error!", "question book mark could not be created", [
                {
                  text: "OK",
                  onPress: () => {
                    props.navigation.navigate("Home");
                    console.log(err);
                  }
                }
              ]);
            });
        }
      }
    ]);
  };
  const arrayConvert = bufferedStuff => {
    if (bufferedStuff === "") {
      return "";
    } else {
      // let binary = "";
      // let bytes = new Uint8Array(bufferedStuff);
      // let len = bytes.byteLength;
      // for (let i = 0; i < len; i++) {
      //   binary += String.fromCharCode(bytes[i]);
      // }
      // var base64String = btoa(
      //   String.fromCharCode.apply(null, new Uint8Array(bufferedStuff))
      // );
      // let base64String = btoa(
      //   String.fromCharCode(...new Uint8Array(bufferedStuff))
      // );
      // console.log(btoa(base64String, "jhgfd", bufferedStuff));
      var base64 = btoa(
        new Uint8Array(bufferedStuff).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      console.log(
        btoa(String.fromCharCode.apply(null, ...new Uint8Array(bufferedStuff)))
      );
      return base64;
      // return btoa(base64String);
      // console.log(binary);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#808080" }}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            color="#333"
            size={30}
            style={{ alignSelf: "center", justifyContent: "center" }}
          />
        ) : (
          <React.Fragment>
            <View style={styles.topBar}>
              <Text style={styles.title}>Answered</Text>
              <Text style={styles.titleT}>
                {answerBlockRedux.length} of {questions.length}
              </Text>
              <View style={styles.sideBtn}>
                <TouchableWithoutFeedback
                  style={styles.btnHold}
                  onPress={() => alertDen()}
                >
                  <MaterialCommunityIcons
                    name="exit-run"
                    size={25}
                    color="#0b2ca5"
                    style={{
                      width: 60,
                      height: 50
                    }}
                  />
                  {/* <Text style={styles.btnS}>quit</Text> */}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    saveForLater();
                  }}
                  style={styles.btnHold}
                >
                  <AntDesign
                    name="save"
                    size={25}
                    color="#0b2ca5"
                    style={{
                      width: 60,
                      height: 50
                    }}
                  />
                  {/* <Text style={styles.btnS}></Text> */}
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View
              style={{
                width: 100,
                height: 40,
                position: "absolute",
                right: 10,
                top: 100,
                zIndex: 100
              }}
            >
              <CountDown
                until={time}
                onFinish={() => {
                  setdone(true);
                  mark();
                }}
                size={14}
                digitStyle={{
                  backgroundColor: "#0b2ca5",
                  borderColor: "white",
                  borderWidth: 2,
                  borderStyle: "solid"
                }}
                digitTxtStyle={{ color: "#fff" }}
                timeToShow={["M", "S"]}
                timeLabels={{ m: "mins", s: "sec" }}
                onChange={time => {
                  if (done && !cc) {
                    setfinishedIn(time);
                    setcc(true);
                  }
                }}
              />
            </View>
          </React.Fragment>
        )}
        <ScrollView
          style={{
            height: height - 50,
            overflow: "scroll",
            paddingTop: 50
          }}
        >
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center"
            }}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={width}
            snapToAlignment={"center"}
            style={styles.center}
            ref={scrollRef}
            onMomentumScrollEnd={evt => {
              setquestionPageRedux(evt.nativeEvent.contentOffset.x);
            }}
          >
            {questions.map((question, indexmain) => {
              return (
                <View key={indexmain}>
                  {question.image !== "" ? (
                    <View
                      style={{
                        width: width - 100,
                        height: width - 100,
                        backgroundColor: "red",
                        alignSelf: "center",
                        marginBottom: 20
                      }}
                    >
                      <Image
                        style={{
                          width: null,
                          height: null,
                          flex: 1
                        }}
                        source={{
                          uri: `data:image/png;base64,${arrayConvert(
                            question.image
                          )}`
                        }}
                      />
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* // <Image  style={{
                //   width: width - 100,
                //   height: width - 100,
                //   backgroundColor:
                // }}/> */}
                  <View style={styles.questionView}>
                    <Text style={styles.questionTextView}>
                      {question.question.question}
                    </Text>
                  </View>
                  <View style={styles.optionView}>
                    <Formik
                      initialValues={{
                        loaded: false,
                        opA: false,
                        opB: false,
                        opC: false,
                        opD: false,
                        correctA: question.options[0]
                          ? question.options[0].correct
                          : false,
                        correctB: question.options[1]
                          ? question.options[1].correct
                          : false,
                        correctC: question.options[2]
                          ? question.options[2].correct
                          : false,
                        correctD: question.options[3]
                          ? question.options[3].correct
                          : false
                      }}
                    >
                      {({
                        handleChange,
                        handleSubmit,
                        values,
                        setFieldValue,
                        setValues
                      }) => {
                        if (!checked) {
                          try {
                            if (stops[0][indexmain]) {
                              switch (stops[0][indexmain].choosenAnswer) {
                                case "opA":
                                  setFieldValue("opA", true);
                                  break;
                                case "opB":
                                  setFieldValue("opB", true);
                                  break;
                                case "opC":
                                  setFieldValue("opC", true);
                                  break;
                                case "opD":
                                  setFieldValue("opD", true);
                                  break;
                                default:
                                  setFieldValue("opA", false);
                                  setFieldValue("opB", false);
                                  setFieldValue("opC", false);
                                  setFieldValue("opD", false);
                              }
                            }
                          } catch (error) {}

                          setChecked(true);
                        }
                        return (
                          <React.Fragment>
                            <TouchableWithoutFeedback
                              key={indexmain + Math.random(55 * 100)}
                              style={[styles.option, styles.optionFalse]}
                              onPress={() => {
                                setFieldValue("opA", true);
                                setFieldValue("opB", false);
                                setFieldValue("opC", false);
                                setFieldValue("opD", false);
                              }}
                            >
                              <View
                                style={[
                                  styles.optionShape,
                                  !values.opA
                                    ? styles.optionFalseShape
                                    : styles.optionTrueShape
                                ]}
                              ></View>
                              <Text
                                style={[
                                  styles.optionText,
                                  styles.optionFalseText
                                ]}
                              >
                                {question.options[0]
                                  ? question.options[0].op
                                  : ""}
                              </Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                              key={indexmain + Math.random(55 * 100)}
                              style={[styles.option, styles.optionFalse]}
                              onPress={() => {
                                setFieldValue("opB", true);
                                setFieldValue("opA", false);
                                setFieldValue("opC", false);
                                setFieldValue("opD", false);
                              }}
                            >
                              <View
                                style={[
                                  styles.optionShape,
                                  !values.opB
                                    ? styles.optionFalseShape
                                    : styles.optionTrueShape
                                ]}
                              ></View>
                              <Text
                                style={[
                                  styles.optionText,
                                  styles.optionFalseText
                                ]}
                              >
                                {question.options[1]
                                  ? question.options[1].op
                                  : ""}
                              </Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                              key={indexmain + Math.random(55 * 100)}
                              style={[styles.option, styles.optionFalse]}
                              onPress={() => {
                                setFieldValue("opC", true);
                                setFieldValue("opB", false);
                                setFieldValue("opA", false);
                                setFieldValue("opD", false);
                              }}
                            >
                              <View
                                style={[
                                  styles.optionShape,
                                  !values.opC
                                    ? styles.optionFalseShape
                                    : styles.optionTrueShape
                                ]}
                              ></View>
                              <Text
                                style={[
                                  styles.optionText,
                                  styles.optionFalseText
                                ]}
                              >
                                {question.options[2]
                                  ? question.options[2].op
                                  : ""}
                              </Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                              key={indexmain + Math.random(55 * 100)}
                              style={[styles.option, styles.optionFalse]}
                              onPress={() => {
                                setFieldValue("opD", true);
                                setFieldValue("opB", false);
                                setFieldValue("opC", false);
                                setFieldValue("opA", false);
                              }}
                            >
                              <View
                                style={[
                                  styles.optionShape,
                                  !values.opD
                                    ? styles.optionFalseShape
                                    : styles.optionTrueShape
                                ]}
                              ></View>
                              <Text
                                style={[
                                  styles.optionText,
                                  styles.optionFalseText
                                ]}
                              >
                                {question.options[3]
                                  ? question.options[3].op
                                  : ""}
                              </Text>
                            </TouchableWithoutFeedback>
                            <View
                              style={{
                                width: width - 100,
                                height: 50,
                                alignSelf: "center",
                                justifyContent: "center",
                                backgroundColor: "whitesmoke",
                                marginVertical: 30,
                                borderRadius: 60,
                                borderWidth: 2,
                                borderStyle: "solid",
                                borderColor: "white"
                              }}
                            >
                              <TouchableOpacity
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  zIndex: 6
                                }}
                                onPress={() => {
                                  marker(indexmain, values, question);
                                }}
                              >
                                <Text
                                  style={{
                                    width: null,
                                    height: null,
                                    lineHeight: 50,
                                    textAlign: "center",
                                    fontWeight: "600",
                                    fontSize: 18,
                                    textTransform: "capitalize",
                                    color: "#0b2da5"
                                  }}
                                >
                                  {indexmain + 1 === questions.length
                                    ? "submit"
                                    : "next"}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </React.Fragment>
                        );
                      }}
                    </Formik>
                  </View>
                  <Toast ref={ToastRef} />
                </View>
              );
            })}
          </ScrollView>
        </ScrollView>
        {/* <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              scrollLoc("back");
            }}
            style={[styles.btn, styles.prev]}
          >
            <Text style={[styles.btnText, styles.prevText]}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, styles.next]}
            onPress={marker}
          >
            <Text style={[styles.btnText, styles.nextText]}>next</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <Modal
        visible={done}
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setloading(true);
          setdone(false);
          props.navigation.navigate("Home");
        }}
        onDismiss={() => {
          Alert.alert("Modal has been closed.");
          setloading(true);
          setdone(false);
          props.navigation.navigate("Home");
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 30,
            height: 30,
            borderRadius: 30,
            zIndex: 1000
          }}
        >
          <TouchableWithoutFeedback
            style={{ width: 30, height: 30 }}
            onPress={() => {
              setdone(false);
              setloading(true);
              setdone(false);
              props.navigation.navigate("Home");
            }}
          >
            <AntDesign
              style={styles.icon}
              size={30}
              color="grey"
              name="circledown"
            />
          </TouchableWithoutFeedback>
        </View>

        <ScrollView>
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalMainTxt}>Result</Text>
              <View style={styles.modalTxtcontainer}>
                <Text style={[styles.modalTxtResult, { color: "red" }]}>
                  {failed}
                </Text>
                <Text style={styles.modalTxtStauts}>Failed</Text>
              </View>
              <View style={styles.modalTxtcontainer}>
                <Text style={[styles.modalTxtResult, { color: "green" }]}>
                  {passed}
                </Text>
                <Text style={styles.modalTxtStauts}>passed</Text>
              </View>
            </View>
            <View style={styles.modalContain2}>
              <Text style={styles.modalTxt}>
                Total time given: {time / 60} mins
              </Text>
              <Text style={styles.modalTxt}>
                Finished in: {Math.ceil((time - finishedIn) / 60)} mins
              </Text>
              <Text style={styles.modalTxt}>
                Average time per question:{" "}
                {answerBlockRedux.length <= 0
                  ? 0
                  : Math.ceil(finishedIn / answerBlockRedux.length)}
                sec
              </Text>
              <Text style={styles.modalTxt}>
                Instruction: {file.instruction}
              </Text>
              <Text style={styles.modalTxt}>
                Description: {file.distription}
              </Text>
              <View
                style={{
                  width: width - 100,
                  height: 60,
                  backgroundColor:
                    Platform.OS === "ios" ? "#303030" : "transparent",
                  padding: 10,
                  alignSelf: "center",
                  borderRadius: 70
                }}
              >
                <Button
                  title="QUIT"
                  style={{ height: 60 }}
                  color={Platform.OS === "ios" ? "white" : "#303030"}
                  onPress={() => {
                    setloading(true);
                    setquestions([]);
                    setquestionPageRedux(0);
                    setFile({});
                    setfailed(0);
                    setpassed(0);
                    setTime(0);
                    setfinishedIn(0);
                    setdone(false);
                    setcc(false);
                    setanswerBlockRedux([]);
                    setStops([]);
                    setloading(true);
                    setdone(false);
                    props.navigation.navigate("Home");
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    answerBlockRedux: state.quest.answerBlock,
    questionPageRedux: state.quest.questionPage
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setanswerBlockRedux: payload => {
      dispatch(AnswerAction(payload));
    },
    setquestionPageRedux: payload => {
      dispatch(questionPageAction(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionier);
