import { FlatList, StyleSheet } from 'react-native';

import Task from './Task';
import { useContext } from 'react';
import { TasksContext } from '../context';

export default function TaskList() {
  const { tasks } = useContext(TasksContext)
  return (
    <FlatList
      data={tasks}
      keyExtractor={(_, i) => `task-${i}`}
      renderItem={({ item }) => <Task task={item} />}
    />
  );
}

const styles = StyleSheet.create({});
