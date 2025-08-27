// App.js (Alternative with more customization)
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from '../screens/Home';
import Projects from '../screens/Projects';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <View style={styles.customButtonContainer}>
    <View style={styles.customButton}>
      {children}
    </View>
  </View>
);

const App = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Projects') {
              iconName = focused ? 'folder' : 'folder-outline';
            }

            return (
              <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
                <Ionicons 
                  name={iconName} 
                  size={focused ? 26 : 22} 
                  color={focused ? '#64ffda' : '#8892b0'} 
                />
              </View>
            );
          },
          tabBarActiveTintColor: '#64ffda',
          tabBarInactiveTintColor: '#8892b0',
          tabBarLabelStyle: { 
            fontSize: 12, 
            fontWeight: '600',
            marginBottom: 4,
          },
          tabBarStyle: { 
            backgroundColor: '#0a192f',
            borderTopWidth: 0,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            position: 'absolute',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerStyle: {
            backgroundColor: '#0a192f',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: '#ccd6f6',
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerTintColor: '#64ffda',
          tabBarShowLabel: true,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: 'My Portfolio',
          }}
        />
        <Tab.Screen 
          name="Projects" 
          component={Projects} 
          options={{
            title: 'Projects',
          }}
        />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  iconContainerFocused: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: 'rgba(100, 255, 218, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  customButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#64ffda',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default App;