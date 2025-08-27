import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Projects from '../screens/Projects';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#61dafb',
          tabBarInactiveTintColor: '#999',
          tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#90EE90' },
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Projects" component={Projects} />
      </Tab.Navigator>   
  );
};

export default App;
