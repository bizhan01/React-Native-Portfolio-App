import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';

// Import screens
import Home from '../app/(tabs)/index';
import Projects from '../app/(tabs)/Projects';


const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#142748ff', },
        tabBarActiveTintColor:'white',
        tabBarInactiveTintColor: '#9fa5b2ff',
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'home';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Projects':
              iconName = 'rocket';
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Projects" component={Projects} />
    </Tab.Navigator>
  );
}
