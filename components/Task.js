import Icon from '@expo/vector-icons/Feather';
import { useContext } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeInUp,
  FlipInEasyY,
  FadeIn,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { TasksContext } from '../context';
import colors from '../styles/colors';

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export default function Task({ task }) {
  const { toggleCompleteTask } = useContext(TasksContext)
  const completed = useSharedValue(task.completed ? 1 : 0)

  const [color, icon] = task.completed ? [colors.green, 'check-circle'] : [colors.primary, 'circle']

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
        <AnimatedIcon
          key={task.id + task.completed} // key is necessary, so react know its a different component
          color={color}
          name={icon}
          exiting={task.completed ? FadeOut : undefined}
          entering={task.completed ? FlipInEasyY : FadeIn}
          style={styles.taskIcon}
        />
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
