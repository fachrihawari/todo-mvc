import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated'

export default function Header() {
  return (
    <Animated.Text style={styles.title} entering={FadeIn.duration(1000).delay(200)}>todos</Animated.Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 72,
    fontWeight: '200',
    color: 'red',
    textAlign: 'center'
  }
});
