import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Questions({ navigation, route }) {
  // State variables
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
  const textInputRef = useRef(null);

  // Helper functions
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
      Math.random() * (maxBeforeDecimal - minBeforeDecimal + 1) +
        minBeforeDecimal
    );
    const randomNumberAfterDecimal = Math.floor(
      Math.random() * (maxAfterDecimal - minAfterDecimal + 1) + minAfterDecimal
    );
    const randomDecimalPart =
      digitsAfterDecimal > 0 ? `.${randomNumberAfterDecimal}` : "";
    return parseFloat(`${randomNumberBeforeDecimal}${randomDecimalPart}`);
  }

  function handleClear() {
    if (textInputRef.current) {
      textInputRef.current.clear();
    }
  }

  useEffect(() => {
    console.log("////////////////////////////////////////////");
    console.log("");
    console.log("Number of digits => ", digits);
    console.log("Operation => ", operation);
    console.log("Mode => ", mode);
    console.log("opearands => ", operands);
    console.log("Time gap => ", timeGap);
    console.log("Float length => ", floatLen);
    console.log("");
    console.log("////////////////////////////////////////////");
  });

  // useEffect(() => {
  //   if (operation === "Division") {
  //     setOperands(2);
  //   }
  // }, []);

  // useEffect hooks
  useEffect(() => {
    let num = [];
    setCurrentIndex(0);
    setAnswer(0);
    setButtonPressed(false);
    if (questionCounter <= 15) {
      if (
        operation === "Cube" ||
        operation === "Square Root" ||
        operation === "Cube Root" ||
        operation === "Square"
      ) {
        if (mode === "Perfect Number") {
          num.push(getInt(digits));
        } else {
          num.push(getFloat(digits, floatLen));
        }
      } else if (operation === "Division") {
        if (mode === "Perfect Number") {
          const operand1 = getInt(digits);
          let operand2;
          do {
            operand2 = getInt(digits);
          } while (operand2 === 0); // Ensure operand2 is not zero
          num.push(operand1, operand2);
        } else {
          const operand1 = getFloat(digits, floatLen);
          let operand2;
          do {
            operand2 = getFloat(digits, floatLen);
          } while (operand2 === 0); // Ensure operand2 is not zero
          num.push(operand1, operand2);
        }
      } else {
        for (let i = 0; i < operands; i++) {
          if (mode === "Perfect Number") {
            num.push(getInt(digits));
          } else {
            num.push(getFloat(digits, floatLen));
          }
        }
      }
      setRandNumArr(num);
    }
  }, [questionCounter]);

  useEffect(() => {
    console.log("Array Elements => " + randNumberArr);
    console.log("Question Counter => " + questionCounter);
  }, [randNumberArr, questionCounter]);

  useEffect(() => {
    if (
      operation !== "Cube" &&
      operation !== "Square Root" &&
      operation !== "Cube Root" &&
      operation !== "Square"
    ) {
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

  useEffect(() => {
    console.log("Current Index => ", currentIndex);
  }, [currentIndex]);

  // Function to calculate answer
  function calAns() {
    let res = 0;
    switch (route.params.operation) {
      case "Addition":
        if (randNumberArr.length === operands) {
          for (let i = 0; i < randNumberArr.length; i++) {
            res = res + randNumberArr[i];
          }
          setAnswer(res);
          setButtonPressed(true);
          console.log(`${route.params.operation} => ` + res);
        }
        break;

      case "Cube":
        res = Math.pow(randNumberArr[0], 3);
        res = parseFloat(res.toFixed(2)); // Round to 4 decimal places
        setAnswer(res);
        setButtonPressed(true);
        console.log(`${route.params.operation} => ` + res);
        break;

      case "Division":
        if (randNumberArr.length === operands) {
          const quotient = randNumberArr[0] / randNumberArr[1];
          const roundedQuotient = parseFloat(quotient.toFixed(2)); // Round to 4 decimal places
          setAnswer(roundedQuotient);
          setButtonPressed(true);
          console.log(`${route.params.operation} => ` + roundedQuotient);
        }

        break;

      case "Square Root":
        res = Math.sqrt(randNumberArr[0]).toFixed(2);
        setAnswer(res);
        setButtonPressed(true);
        console.log(`${route.params.operation} => ` + res);
        break;

      case "Cube Root":
        res = Math.cbrt(randNumberArr[0]).toFixed(2);
        setAnswer(res);
        setButtonPressed(true);
        console.log(`${route.params.operation} => ` + res);
        break;

      case "Square":
        res = Math.pow(randNumberArr[0], 2);
        setAnswer(res);
        setButtonPressed(true);
        console.log(`${route.params.operation} => ` + res);
        break;

      case "Subtraction":
        if (randNumberArr.length === operands) {
          for (let i = 0; i < randNumberArr.length; i++) {
            if (i === 0) {
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

      case "Multiplication":
        if (randNumberArr.length === operands) {
          res = 1; // Initialize result to 1 for multiplication
          for (let i = 0; i < randNumberArr.length; i++) {
            res = res * randNumberArr[i]; // Multiply each operand
          }
          setAnswer(res);
          setButtonPressed(true);
          console.log(`${route.params.operation} => ` + res);
        }
        break;

      case "Percentage":
        if (randNumberArr.length === operands) {
          const part = randNumberArr[0]; // Get the first operand as the part
          const whole = randNumberArr[1]; // Get the second operand as the whole
          const percentage = (part / whole) * 100; // Calculate the percentage
          setAnswer(percentage.toFixed(2));
          setButtonPressed(true);
          console.log(`${route.params.operation} => ` + percentage);
        }
        break;

      default:
        alert("Something went wrong");
    }

    const isCorrect =
      (currentIndex === operands - 1 &&
        isBtnPressed &&
        enteredAnswer == answer) ||
      (isBtnPressed && enteredAnswer == answer);

    if (!isCorrect) {
      console.log("Answer is correct!");
      // Handle correct answer logic here
    } else {
      console.log("Answer is incorrect!");
      // Handle incorrect answer logic here
    }

    if (questionCounter < 15) {
      console.log(questionCounter);
      const timer = setTimeout(() => {
        setQuestionCounter(questionCounter + 1);
      }, answerTimeout);
      return () => {
        clearTimeout(timer);
      };
    } else {
      alert("Attempted 15/15");
    }
  }

  // JSX
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.questionLable}>
            Questions {questionCounter}/15
          </Text>
          <Text style={styles.myOperand}>{randNumberArr[currentIndex]}</Text>
          {(currentIndex === operands - 1 &&
            isBtnPressed === true &&
            enteredAnswer == answer) ||
          (isBtnPressed === true && enteredAnswer == answer) ? (
            <Text style={{ textAlign: "center" }}>Correct </Text>
          ) : (
            <></>
          )}
          {(currentIndex === operands - 1 &&
            isBtnPressed === true &&
            enteredAnswer != answer) ||
          (isBtnPressed === true && enteredAnswer != answer) ? (
            <Text style={{ textAlign: "center" }}>
              Your answer is incorrect. Correct answer is {answer}{" "}
            </Text>
          ) : (
            <></>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
      {currentIndex === operands - 1 && (
        <KeyboardAvoidingView style={styles.myInputContainer}>
          <TextInput
            ref={textInputRef}
            onChangeText={(txt) => {
              setEnteredAnswer(txt);
            }}
            style={styles.myInput}
            placeholder="Enter an answer"
            keyboardType="numeric"
            placeholderTextColor="grey"
          />
          <Button
            color="#007AFF"
            style={styles.btnStyle}
            title="Submit"
            onPress={() => {
              calAns();
              handleClear();
            }}
          />
        </KeyboardAvoidingView>
      )}
      {(operation === "Cube" ||
        operation === "Square Root" ||
        operation === "Cube Root" ||
        operation === "Square") && (
        <KeyboardAvoidingView style={styles.myInputContainer}>
          <TextInput
            ref={textInputRef}
            onChangeText={(txt) => {
              setEnteredAnswer(txt);
            }}
            style={styles.myInput}
            placeholder="Enter an answer"
            keyboardType="numeric"
            placeholderTextColor="grey"
          />
          <Button
            color="#007AFF"
            style={styles.btnStyle}
            title="Submit"
            onPress={() => {
              calAns();
              handleClear();
            }}
          />
        </KeyboardAvoidingView>
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
