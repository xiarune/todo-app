
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, View, Button, Platform } from 'react-native';
import { CheckBox } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy groceries', completed: false },
    { key: '2', description: 'Finish homework', completed: false },
    { key: '3', description: 'Daily Workout', completed: false },
    { key: '4', description: 'Work on painting', completed: false }
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTaskCompletion = (key) => {
    setTasks(tasks.map(task => 
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = { 
        key: Date.now().toString(), 
        description: newTask, 
        completed: false 
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.key)}
        containerStyle={styles.checkBox}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📝 To-Do List</Text>

      <FlatList data={tasks} renderItem={renderItem} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} color="#007AFF" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginRight: 10,
  },
});



