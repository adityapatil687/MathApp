import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  Pressable,
  AppState,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Questions({ navigation, route }) {
  const { mode } = route.params;
  const { operation } = route.params;

  const [digits, setDigits] = useState(parseInt(route.params.digits));
  const [timeGap, setTimeGap] = useState(parseInt(route.params.timeGap)); //ms
  const [operands, setOperands] = useState(parseInt(route.params.operands));
  const [floatLen, setFloatLen] = useState(route.params.floatDigit);

  const [questionCounter, setQuestionCounter] = useState(1);
  const [randNumberArr, setRandNumArr] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answer, setAnswer] = useState(0);
  const [enteredAnswer, setEnteredAnswer] = useState(0);
  const [isBtnPressed, setButtonPressed] = useState(false);
  const [answerTimeout, setAnswerTimeout] = useState(2000); //ms

  //const [operation, setOperation] = useState(JSON.stringify(route.params.operation));

  const textInputRef = useRef(null);

  const handleClear = () => {
    if (textInputRef.current) {
      textInputRef.current.clear();
    }
  };

  // push element in array or load new question
  useEffect(() => {
    let num = [];
    setCurrentIndex(0);
    setAnswer(0);
    setButtonPressed(false);
    if (questionCounter <= 15) {
      if (
        operation == "Cube" ||
        operation == "Square Root" ||
        operation == "Cube Root" ||
        operation == "Square"
      ) {
        if (mode == "Perfect Number") {
          num.push(getInt(digits));
        } else {
          num.push(getFloat(digits,floatLen));
        }
      } else {
        for (let i = 0; i < operands; i++) {
          if (mode == "Perfect Number") {
            num.push(getInt(digits));
          } else {
             num.push(getFloat(digits, floatLen));
          }
        }
      }
      setRandNumArr(num);
    }
  }, [questionCounter]);

  // console print
  useEffect(() => {
    if (randNumberArr.length > 0) {
      console.log("Array Elements => " + randNumberArr);
    }
    console.log("Question Counter => " + questionCounter);
  }, [randNumberArr, questionCounter]);

  // iterate for displaying
  useEffect(() => {
    if (
      operation == "Cube" ||
      operation == "Square Root" ||
      operation == "Cube Root" ||
      operation == "Square"
    ) {
    } else {
      if (currentIndex < randNumberArr.length - 1) {
        const timer = setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, timeGap);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [currentIndex, randNumberArr.length]);

  // read current index
  // useEffect(() => {
  //   console.log(currentIndex);
  // }, [currentIndex]);

  //calculate answer
  function calAns() {
    let res = 0;
    // console.log(typeof(operation));
    switch (route.params.operation) {
      case "Addition": // 1
        if (randNumberArr.length == operands) {
          for (let i = 0; i < randNumberArr.length; i++) {
            res = res + randNumberArr[i];
          }
          setAnswer(res);
          setButtonPressed(true);
          console.log(`${route.params.operation} => ` + res);
        }
        break;

      case "Cube": // 2
        res = Math.pow(randNumberArr[0], 3);
        setAnswer(res);
        setButtonPressed(true);
        console.log(`${route.params.operation} => ` + res);

        break;

      case "Division": // 3
        if (randNumberArr.length == operands) {
          for (let i = 0; i < randNumberArr.length; i++) {
            res = res + randNumberArr[i];
          }
          setAnswer(res);
          setButtonPressed(true);
          console.log(`${route.params.operation} => ` + res);
        }
        break;

      case "Square Root": // 4
        res = Math.sqrt(randNumberArr[0]).toFixed(2);
        setAnswer(res);
        setButtonPressed(true);
        console.log(`${route.params.operation} => ` + res);
        break;

      case "Cube Root": // 5
        res = Math.cbrt(randNumberArr[0]);
        setAnswer(res);
        setButtonPressed(true);
        console.log(`${route.params.operation} => ` + res);
        break;

      case "Square": // 6
        res = Math.pow(randNumberArr[0], 2);
        setAnswer(res);
        setButtonPressed(true);
        console.log(`${route.params.operation} => ` + res);
        break;

      case "Subtraction": // 7
        if (randNumberArr.length == operands) {
          for (let i = 0; i < randNumberArr.length; i++) {
            if (i == 0) {
              res = randNumberArr[i];
            } else {
              res = res - randNumberArr[i];
            }
          }
          setAnswer(res);
          setButtonPressed(true);
          console.log(`${route.params.operation} => ${res}`);
        }
        break;

      case "Multiplication": // 8 (Not implemented) Change Formula
        if (randNumberArr.length == operands) {
          for (let i = 0; i < randNumberArr.length; i++) {
            res = res + randNumberArr[i];
          }
          setAnswer(res);
          setButtonPressed(true);
          console.log(`${route.params.operation} => ` + res);
        }
        break;

      case "Percentage": // 9 (Not implemented) Change Formula
        if (randNumberArr.length == operands) {
          for (let i = 0; i < randNumberArr.length; i++) {
            res = res + randNumberArr[i];
          }
          setAnswer(res);
          setButtonPressed(true);
          console.log(`${route.params.operation} => ` + res);
        }
        break;

      default:
        alert("Something went wrong");
    }

    const isCorrect =
    (currentIndex === operands - 1 && isBtnPressed && enteredAnswer == answer) ||
    (isBtnPressed && enteredAnswer == answer);

  // Set the background color based on the correctness
  // setBgColor(isCorrect ? "green" : "red");

  if (isCorrect) {
    console.log("Answer is correct!");
    // Handle correct answer logic here
  } else {
    console.log("Answer is incorrect!");
    // Handle incorrect answer logic here
  }

    // console.log(randNumberArr.length);
    if (questionCounter < 15) {
      console.log(questionCounter);
      const timer = setTimeout(() => {
        setQuestionCounter(questionCounter + 1);
      }, answerTimeout);
      return () => {
        clearTimeout(timer);
      };
    } else {
      alert("Attempetd 15/15");
    }
  }

  function getInt(len) {
    var min = Math.pow(10, len - 1);
    var max = Math.pow(10, len) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getFloat(digitsBeforeDecimal, digitsAfterDecimal) {
    const minBeforeDecimal = Math.pow(10, digitsBeforeDecimal - 1);
    const maxBeforeDecimal = Math.pow(10, digitsBeforeDecimal) - 1;
  
    const minAfterDecimal = Math.pow(10, digitsAfterDecimal - 1);
    const maxAfterDecimal = Math.pow(10, digitsAfterDecimal) - 1;
  
    const randomNumberBeforeDecimal = Math.floor(
      Math.random() * (maxBeforeDecimal - minBeforeDecimal + 1) + minBeforeDecimal
    );
  
    const randomNumberAfterDecimal = Math.floor(
      Math.random() * (maxAfterDecimal - minAfterDecimal + 1) + minAfterDecimal
    );
  
    const randomDecimalPart =
      digitsAfterDecimal > 0 ? `.${randomNumberAfterDecimal}` : '';
  
    return parseFloat(`${randomNumberBeforeDecimal}${randomDecimalPart}`);
  }

  return (
    <>
    
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.questionLable}>
            Questions {questionCounter}/15
          </Text>
          <Text style={styles.myOperand}>{randNumberArr[currentIndex]}</Text>

          {(currentIndex == operands - 1 &&
            isBtnPressed == true &&
            enteredAnswer == answer) ||
          (isBtnPressed == true && enteredAnswer == answer) ? (
            <Text style={{ textAlign: "center" }}>Correct </Text>
          ) : (
            <></>
          )}
          {(currentIndex == operands - 1 &&
            isBtnPressed == true &&
            enteredAnswer != answer) ||
          (isBtnPressed == true && enteredAnswer != answer) ? (
            <Text style={{ textAlign: "center" }}>
              Correct answer is {answer}{" "}
            </Text>
          ) : (
            <></>
          )}

        </SafeAreaView>
      </TouchableWithoutFeedback>
          {/*  Answer Box */}
      {currentIndex == operands - 1 &&
      (operation != "Cube" ||
        operation != "Square Root" ||
        operation != "Cube Root" ||
        operation != "Square") ? (
        <KeyboardAvoidingView style={styles.myInputContainer}>
          <TextInput
            ref={textInputRef}
            onChangeText={(txt) => {
              setEnteredAnswer(txt);
            }}
            style={styles.myInput}
            placeholder="Enter a answer"
            keyboardType="numeric"
            placeholderTextColor="grey"
          />
          <Button
            color="#007AFF"
            style={styles.btnStyle}
            title="submit"
            onPress={() => {
              calAns();
              handleClear();
            }}
          />
        </KeyboardAvoidingView>
      ) : (
        (operation == "Cube" ||
          operation == "Square Root" ||
          operation == "Cube Root" ||
          operation == "Square") && (
          <KeyboardAvoidingView style={styles.myInputContainer}>
            <TextInput
              ref={textInputRef}
              onChangeText={(txt) => {
                setEnteredAnswer(txt);
              }}
              style={styles.myInput}
              placeholder="Enter a answer"
              keyboardType="numeric"
              placeholderTextColor="grey"
            />
            <Button
              style={styles.btnStyle}
              title="submit"
              onPress={() => {
                calAns();
                handleClear();
              }}
            />
          </KeyboardAvoidingView>
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffffff",
  },
  questionLable: {
    textAlign: "center",
  },
  myOperand: {
    fontSize: 80,
    textAlign: "center",
  },
  myInputContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnStyle: {
    width: "20%",
  },
  myInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    width: "80%",
  },
});
