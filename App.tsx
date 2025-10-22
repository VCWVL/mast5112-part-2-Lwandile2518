import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import FilterScreen from './FilterScreen';
import MenuManagementScreen from './MenuManagementScreen';

// Define types for the context
interface MenuItem {
  id: number;
  name: string;
  description: string;
  course: string;
  price: number;
  available: boolean;
}

// Main App Component
export default function ChefMenuApp() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [username, setUsername] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: 'Classic Burger', description: 'Juicy beef patty with fresh toppings', course: 'Burgers', price: 89.99, available: true },
    { id: 2, name: 'Margherita Pizza', description: 'Fresh mozzarella and basil', course: 'Pizza', price: 109.99, available: true },
    { id: 3, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', course: 'Dessert', price: 65.00, available: true },
    { id: 4, name: 'Coca Cola', description: 'Refreshing cold beverage', course: 'Beverages', price: 25.00, available: true },
  ]);
  const [filteredCourses, setFilteredCourses] = useState(['Burgers', 'Pizza', 'Dessert', 'Beverages']);

  const courses = ['Burgers', 'Pizza', 'Dessert', 'Beverages'];

  return (
    <View style={styles.container}>
      {currentScreen === 'welcome' && <WelcomeScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'login' && <LoginScreen setUsername={setUsername} setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'home' && (
        <HomeScreen
          username={username}
          menuItems={menuItems}
          filteredCourses={filteredCourses}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === 'filter' && (
        <FilterScreen
          courses={courses}
          filteredCourses={filteredCourses}
          setFilteredCourses={setFilteredCourses}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === 'menu-management' && (
        <MenuManagementScreen
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          courses={courses}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
