import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  course: string;
  price: number;
  available: boolean;
}

interface MenuManagementScreenProps {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  courses: string[];
  setCurrentScreen: (screen: string) => void;
}

export default function MenuManagementScreen({ menuItems, setMenuItems, courses, setCurrentScreen }: MenuManagementScreenProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', course: 'Burgers', price: '' });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ name: '', description: '', course: 'Burgers', price: '' });
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      course: item.course,
      price: item.price.toString()
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => setMenuItems(menuItems.filter(item => item.id !== id)) },
      ]
    );
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.price) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Please enter a valid price');
      return;
    }

    if (editingItem) {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, price }
          : item
      ));
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        price,
        available: true
      };
      setMenuItems([...menuItems, newItem]);
    }

    setShowModal(false);
  };

  const renderManagementItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.managementItem}>
      <View style={styles.managementItemDetails}>
        <Text style={styles.managementItemName}>{item.name}</Text>
        <Text style={styles.managementItemCourse}>{item.course}</Text>
        <Text style={styles.managementItemDescription}>{item.description}</Text>
        <Text style={styles.managementItemPrice}>R{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.managementItemActions}>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <MaterialIcons name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.managementContainer}>
      <View style={styles.managementHeader}>
        <Text style={styles.managementTitle}>Menu Management</Text>
        <TouchableOpacity onPress={openAddModal} style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderManagementItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No menu items yet. Add your first item!</Text>
          </View>
        )}
      />

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</Text>

            <TextInput
              placeholder="Dish Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Description"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              style={styles.modalInput}
              multiline
            />
            <TextInput
              placeholder="Price (R)"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              style={styles.modalInput}
              keyboardType="numeric"
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={[styles.modalButton, styles.saveButton]}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => setCurrentScreen('home')}
          style={styles.navButton}
        >
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentScreen('menu-management')}
          style={styles.navButton}
        >
          <Ionicons name="add-circle" size={24} color="orange" />
          <Text style={styles.navButtonText}>Manage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  managementContainer: {
    flex: 1,
  },
  managementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  managementTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  managementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  managementItemDetails: {
    flex: 1,
  },
  managementItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  managementItemCourse: {
    fontSize: 14,
    color: 'gray',
  },
  managementItemDescription: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  managementItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
  },
  managementItemActions: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'orange',
  },
  saveButtonText: {
    color: 'white',
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
