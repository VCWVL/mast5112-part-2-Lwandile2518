import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  course: string;
  price: number;
  available: boolean;
}

interface HomeScreenProps {
  username: string;
  menuItems: MenuItem[];
  filteredCourses: string[];
  setCurrentScreen: (screen: string) => void;
}

export default function HomeScreen({ username, menuItems, filteredCourses, setCurrentScreen }: HomeScreenProps) {
  const displayedItems = menuItems.filter(item => filteredCourses.includes(item.course));
  const totalItems = displayedItems.length;

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemImage}>
        <Text style={styles.menuItemEmoji}>
          {item.course === 'Burgers' && '🍔'}
          {item.course === 'Pizza' && '🍕'}
          {item.course === 'Dessert' && '🍰'}
          {item.course === 'Beverages' && '🥤'}
        </Text>
      </View>
      <View style={styles.menuItemDetails}>
        <View style={styles.menuItemHeader}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemCourse}>{item.course}</Text>
        </View>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <View style={styles.menuItemFooter}>
          <Text style={styles.menuItemPrice}>R{item.price.toFixed(2)}</Text>
          <Ionicons name="heart-outline" size={24} color="gray" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.homeContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Hello, {username}! 👋</Text>
          <Text style={styles.headerSubtitle}>Total Menu Items: {totalItems}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setCurrentScreen('filter')}
          style={styles.filterButton}
        >
          <MaterialIcons name="filter-list" size={24} color="orange" />
        </TouchableOpacity>
      </View>

      {/* Menu Grid */}
      <FlatList
        data={displayedItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.menuGrid}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No items match your filters</Text>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => setCurrentScreen('home')}
          style={styles.navButton}
        >
          <Ionicons name="home" size={24} color="orange" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentScreen('menu-management')}
          style={styles.navButton}
        >
          <Ionicons name="add-circle-outline" size={24} color="gray" />
          <Text style={styles.navButtonText}>Manage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  menuGrid: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  menuItemEmoji: {
    fontSize: 40,
  },
  menuItemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemCourse: {
    fontSize: 14,
    color: 'orange',
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 18,
    color: 'gray',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 12,
    color: 'gray',
  },
});
