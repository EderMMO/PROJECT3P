import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// import NavigationStack from './src/navigation/Navigation';
import NavigationStack from './src/navigation/NavigationLogin';
export default function App() {
  return (
    <NavigationContainer>
      <NavigationStack />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
