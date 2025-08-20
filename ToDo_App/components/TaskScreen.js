import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import { Check, Trash2 } from "lucide-react-native"; 

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> My Task List</Text>


      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          placeholderTextColor="#aaa"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

   
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
   
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
              <Text
                style={[
                  styles.taskText,
                  item.done && styles.taskTextDone,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>

 
            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <Check size={22} color={item.done ? "#FF7F50" : "#6A0DAD"} />
            </TouchableOpacity>

       
            <TouchableOpacity onPress={() => deleteTask(item.id)} style={{ marginLeft: 12 }}>
              <Trash2 size={22} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9F6FF" },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#6A0DAD",
  },
  inputRow: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#FF7F50",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
  },
  addText: { color: "#fff", fontWeight: "bold" },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#6A0DAD",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: { flex: 1, fontSize: 16, color: "#333" },
  taskTextDone: { textDecorationLine: "line-through", color: "#FF7F50" },
});
