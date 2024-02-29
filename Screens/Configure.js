import {
  Text,
  View,
  StyleSheet,
  Pressable,
  StatusBar,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import MyButton from "../components/button";

export default function Configure({ navigation, route }) {
  const { mode, operation } = route.params;
  const [digits, setDigits] = useState(0);
  const [timeGap, setTimeGap] = useState(0); //ms
  const [operands, setOperands] = useState(0);
  const [floatDigit, setFloatDigit] = useState(0);

  function loginInBtnEvent() {
    if (
      operation !== "Cube" &&
      operation !== "Square Root" &&
      operation !== "Cube Root" &&
      operation !== "Square" &&
      operation !== "Division" &&
      operation !== "Percentage"
    ) {
      if (digits > 0 && timeGap > 0 && operands > 0) {
        if (mode === "Perfect Number") {
          if (parseInt(digits) <= 21) {
            navigation.navigate("Questions", {
              digits: digits,
              timeGap: timeGap,
              operands: operands,
              mode: mode,
              operation: operation,
              floatDigit: floatDigit,
            });
          } else {
            alert("Length cannot be more than 21 " + operation);
          }
        } else if (mode === "Float Number") {
          if (
            parseInt(digits) &&
            parseInt(floatDigit) &&
            parseInt(digits) <= 5 &&
            parseInt(floatDigit) <= 5 &&
            parseInt(floatDigit) !== 0 // Check if floatDigit is not 0
          ) {
            navigation.navigate("Questions", {
              digits: digits,
              timeGap: timeGap,
              operands: operands,
              mode: mode,
              operation: operation,
              floatDigit: floatDigit,
            });
          } else {
            alert("Length cannot be more than 5 or fill the data");
          }
        }
      } else {
        alert("Enter Data 1");
      }
    } else {
      if (operation !== "Division" && operation !== "Percentage") {
        if (mode === "Perfect Number") {
          if (digits > 0) {
            if (parseInt(digits) <= 21) {
              navigation.navigate("Questions", {
                digits: digits,
                timeGap: timeGap,
                operands: operands,
                mode: mode,
                operation: operation,
                floatDigit: floatDigit,
              });
            } else {
              alert("Length cannot be more than 21");
            }
          } else {
            alert("Fill data");
          }
        } else {
          if (
            parseInt(digits) > 0 &&
            parseInt(floatDigit) > 0 &&
            parseInt(digits) <= 5 &&
            parseInt(floatDigit) <= 5
          ) {
            navigation.navigate("Questions", {
              digits: digits,
              timeGap: timeGap,
              operands: operands,
              mode: mode,
              operation: operation,
              floatDigit: floatDigit,
            });
          } else {
            alert("Length cannot be more than 5 or fill the data");
          }
        }
      } else {
        if (mode === "Perfect Number") {
          if (digits > 0 && timeGap > 0) {
            navigation.navigate("Questions", {
              digits: digits,
              timeGap: timeGap,
              operands: 2,
              mode: mode,
              operation: operation,
              floatDigit: floatDigit,
            });
          } else {
            alert("Enter data");
          }
        } else if (
          parseInt(digits) > 0 &&
          parseInt(floatDigit) > 0 &&
          parseInt(digits) <= 5 &&
          parseInt(floatDigit) <= 5
        ) {
          navigation.navigate("Questions", {
            digits: digits,
            timeGap: timeGap,
            operands: 2,
            mode: mode,
            operation: operation,
            floatDigit: floatDigit,
          });
        } else {
          alert("Enter Data 4");
        }
      }
    }
  }

  // function printData() {
  //   if (mode != "Float Number") {
  //     console.log({
  //       digits: digits,
  //       timeGap: timeGap,
  //       operands: operands,
  //       mode: mode,
  //       operation: operation,
  //       floatDigit: floatDigit
  //     });
  //   } else {
  //     console.log({
  //       digits: digits,
  //       floatLen: floatDigit,
  //       timeGap: timeGap,
  //       operands: operands,
  //       mode: mode,
  //       operation: operation,
  //     });
  //   }
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.fromTop}>
          <Text style={styles.myLable}>Number of Digits</Text>
          <View style={styles.innerContainer}>
            <TextInput
              keyboardType="numeric"
              onChangeText={(val) => setDigits(val)}
              style={styles.myInput}
              placeholder="enter value"
              placeholderTextColor="grey"
            />
          </View>
          {mode == "Float Number" && (
            <>
              <Text style={styles.myLable}>Precision</Text>
              <View style={styles.innerContainer}>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(val) => setFloatDigit(val)}
                  style={styles.myInput}
                  placeholder="enter value"
                  placeholderTextColor="grey"
                />
              </View>
            </>
          )}
          {operation !== "Cube" &&
            operation !== "Square Root" &&
            operation !== "Cube Root" &&
            operation !== "Square" && (
              <>
                <Text style={styles.myLable}>Time Gap (ms)</Text>
                <View style={styles.innerContainer}>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(val) => setTimeGap(val)}
                    style={styles.myInput}
                    placeholder="enter value"
                    placeholderTextColor="grey"
                  />
                </View>
              </>
            )}

          {/* operation === "Cube" ||
            operation === "Square Root" ||
            operation === "Cube Root" ||
            (operation === "Square"  */}
          {operation !== "Square Root" &&
            operation !== "Cube" &&
            operation !== "Cube Root" &&
            operation !== "Square" &&
            operation !== "Division" &&
            operation !== "Percentage" && (
              <>
                <Text style={styles.myLable}>No. of Operands</Text>
                <View style={styles.innerContainer}>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(val) => setOperands(val)}
                    style={styles.myInput}
                    placeholder="enter value"
                    placeholderTextColor="grey"
                  />
                </View>
              </>
            )}

          <View style={styles.btnContainer}>
            <MyButton
              title="START"
              clickTest={clickTest}
              loginInBtnEvent={loginInBtnEvent}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

function clickTest() {
  alert("test");
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: "#ffffff",
  },
  fromTop: {
    marginTop: "5%",
  },
  innerContainer: {
    //padding: 15,
    alignItems: "center",
  },
  myLable: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: "10%",
  },
  myInput: {
    width: "80%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#757575",
    fontSize: 16,
    padding: "3%",
    marginBottom: "5%",
    borderRadius: 5,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: "12%",
  },
});
