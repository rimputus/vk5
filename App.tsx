import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  ScrollView, 
  StyleSheet 
} from "react-native";

import { TaskItem } from "./components/Tasks";
import useTodos from "./hooks/useTodos";

export default function App() {
  const [taskText, setTaskText] = useState("");

  const { tasks, addTask, toggleTask } = useTodos();

  const handleAdd = () => {
    addTask(taskText);
    setTaskText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo list</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Enter task"
          style={styles.input}
        />
        <Pressable onPress={handleAdd}>
          <Text style={styles.save}>Save</Text>
        </Pressable>
      </View>

      <ScrollView>
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            text={t.text}
            done={t.done}
            onToggle={() => toggleTask(t.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginRight: 12,
  },
  save: {
    fontSize: 18,
    color: "blue",
  },
});
