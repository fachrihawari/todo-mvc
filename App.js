import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import Header from './components/Header';
import NewTask from './components/NewTask';
import TaskList from './components/TaskList';
import colors from './styles/colors';
import { TasksProvider } from './context'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TasksProvider>
          <Header />
          <NewTask />
          <TaskList />
        </TasksProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  }
});
