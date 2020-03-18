import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  modalBtnCancelTxt: {
    width: null,
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  modalBtnCancel: {
    width: width - 100,
    height: 50,
    lineHeight: 50,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    backgroundColor: "#101010"
  },
  modalTxt: {
    width: width,
    height: 50,
    marginVertical: 10,
    lineHeight: 50,
    paddingHorizontal: 30,
    fontSize: 18
  },
  modalContain2: {
    width: width,
    height: null
  },
  modalTxtStauts: {
    fontSize: 18,
    textAlign: "center"
  },
  modalTxtResult: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 50
  },
  modalTxtcontainer: {
    width: width / 2 - 50,
    height: null,
    justifyContent: "center",
    alignContent: "center"
  },
  modalMainTxt: {
    width: width - 50,
    height: 60,
    textAlign: "center",
    lineHeight: 60,
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 50
  },
  modalContainer: {
    width: width,
    height: height / 3,
    minHeight: 200,
    backgroundColor: "#ededed",
    paddingTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignContent: "center"
  },
  modal: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: "whitesmoke"
  },
  optionGr: {
    width: 50,
    height: 40,
    flexDirection: "row",
    justifyContent: "center"
  },
  optionTxt: {
    fontWeight: "600",
    fontSize: 16,
    color: "#3b99fc"
  },
  options: {
    position: "absolute",
    left: 0,
    top: height - 170,
    width: width,
    height: 120,
    paddingTop: 20,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    paddingBottom: 50,
    justifyContent: "center"
  },
  optionBtn: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    color: "black",
    borderColor: "#3b99fc",
    borderWidth: 2
  },
  modalBtn: {
    width: width - 70,
    height: 50,
    position: "absolute",
    bottom: 10,
    zIndex: 2000,
    backgroundColor: "green",
    alignSelf: "center"
  },
  modalText: {
    color: "black"
  },
  container: {
    position: "absolute",
    top: 10,
    paddingTop: 100,
    flex: 1,
    width: width,
    height: height,
    alignContent: "center"
  },
  topBar: {
    position: "absolute",
    top: 10,
    zIndex: 1000,
    width: width,
    height: 80,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "whitesmoke",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    shadowColor: "#81a2ff",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.4,
    flexDirection: "row"
  },
  title: {
    width: null,
    height: null,
    color: "#0b2ca5",
    lineHeight: 50,
    paddingHorizontal: 20,
    fontSize: 17,
    fontWeight: "bold"
  },
  titleT: {
    width: null,
    height: null,
    color: "#3b3b3b",
    lineHeight: 50,
    fontSize: 15,
    fontWeight: "bold"
  },
  sideBtn: {
    position: "absolute",
    right: 0,
    width: null,
    height: 50,
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end"
  },
  btnHold: {
    width: null,
    height: 50
  },
  btnS: {
    width: 70,
    height: 50,
    textAlign: "center",
    lineHeight: 30,
    color: "#0b2ca5",
    textTransform: "uppercase"
  },
  center: {
    width: null,
    height: null,
    alignSelf: "center",
    paddingBottom: 60,
    paddingTop: 5
  },
  questionView: {
    width: width - 50,
    height: "auto",
    backgroundColor: "white",
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 5,
    padding: 30
  },
  questionTextView: {
    width: null,
    maxWidth: width - 50,
    height: null,
    fontSize: 16
  },
  optionView: {
    width: null,
    height: null,
    marginHorizontal: 30,
    marginVertical: 10
  },
  option: {
    width: width - 60,
    height: null,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    marginVertical: 5
  },
  optionTrue: {
    backgroundColor: "#333",
    color: "white"
  },
  optionFalse: {
    backgroundColor: "white",
    color: "#333"
  },
  optionText: {
    width: null,
    height: null,
    color: "white",
    marginHorizontal: 10
  },
  optionTrueText: {
    color: "white"
  },
  optionFalseText: {
    color: "#333"
  },
  optionShape: {
    position: "absolute",
    top: 17,
    left: 4,
    width: 15,
    height: 15,
    borderRadius: 1,
    backgroundColor: "white",
    zIndex: 100,
    borderWidth: 1,
    borderColor: "#e3e3e4",
    borderStyle: "solid"
  },
  optionTrueShape: {
    backgroundColor: "#0327a2"
  },
  optionFalseShape: {
    backgroundColor: "transparent"
  },
  buttons: {
    width: width,
    height: 50,
    flexDirection: "row",
    position: "absolute",
    top: height - 110,
    left: 0,
    zIndex: 1000,
    justifyContent: "space-between"
  },
  btn: {
    width: width / 2 - 40,
    height: null,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  prev: {
    backgroundColor: "#3b99fc"
  },
  next: {
    backgroundColor: "#fff"
  },
  btnText: {
    width: null,
    height: null,
    textAlign: "center",
    lineHeight: 50,
    fontWeight: "600",
    fontSize: 17,
    textTransform: "capitalize"
  },
  prevText: {
    color: "white"
  },
  nextText: {
    color: "#3b99fc"
  }
});

export default styles;
