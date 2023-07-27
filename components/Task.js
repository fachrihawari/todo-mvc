import Icon from '@expo/vector-icons/Feather';
import { useContext } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInUp, useAnimatedStyle, interpolateColor, useSharedValue, withTiming } from 'react-native-reanimated';

import { TasksContext } from '../context';
import colors from '../styles/colors';

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export default function Task({ task }) {
  const { toggleCompleteTask } = useContext(TasksContext)
  const completed = useSharedValue(task.completed ? 1 : 0)

  const taskNameStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        completed.value,
        [0, 1],
        [colors.black, '#dadce0']
      ),
      textDecorationLine: task.completed ? 'line-through' : 'none'
    }
  })

  const handleToggle = () => {
    completed.value = withTiming(task.completed ? 0 : 1, { duration: 300 })
    toggleCompleteTask(task.id)
  }

  return (
    <Animated.View style={styles.task} entering={FadeInUp.duration(500)}>
      <Pressable onPress={handleToggle}>
        {
          task.completed ?
            <AnimatedIcon color={colors.green} name={'check-circle'} style={styles.taskIcon} /> :
            <AnimatedIcon color={colors.primary} name={'circle'} style={styles.taskIcon} />
        }
      </Pressable>
      <Animated.Text style={[styles.taskName, taskNameStyle]}>{task.name}</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  task: {
    height: 56,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary
  },
  taskName: {
    fontSize: 24,
    fontWeight: '200',
  },
  taskIcon: {
    fontSize: 24,
    marginRight: 16
  }
});
