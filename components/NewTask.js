import { useContext, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../styles/colors'
import { TasksContext } from '../context';

export default function NewTask() {
  const [task, setTask] = useState('')
  const { addTask } = useContext(TasksContext)

  const handleSubmit = () => {
    addTask(task)
    setTask('')
  }

  return (
    <TextInput
      style={styles.input}
      placeholder='What needs to be done?'
      onChangeText={setTask}
      value={task}
      onSubmitEditing={handleSubmit}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 64,
    paddingLeft: 24,
    fontStyle: 'italic',
    fontSize: 24,
    fontWeight: '200',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary
  }
});
