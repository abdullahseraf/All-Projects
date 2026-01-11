import { ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

const AbdullahInput = () => {
  // declare the variables
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [message, onChangeMessage] = useState("");
  const [password, onChangePassword] = useState("");

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={onChangeFirstName}
        placeholder="First Name"
        clearButtonMode="always"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={onChangeLastName}
        placeholder="Last Name"
        clearButtonMode="always"
      />
      <TextInput
        style={styles.messageInput}
        value={message}
        onChangeText={onChangeMessage}
        placeholder="Message"
        clearButtonMode="always"
        multiline={true}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={onChangePassword}
        placeholder="password"
        keyboardType="default"
        clearButtonMode="always"
        secureTextEntry={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "#3f3f3fff",
    backgroundColor: "#2e2e2eff",
    borderRadius: 5,
  },
  messageInput: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#2e2e2eff",
    borderRadius: 5,
    borderColor: "#3f3f3fff",
    textAlignVertical: "top",
  },
});

export default AbdullahInput;
