import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterScreenProps {
  courses: string[];
  filteredCourses: string[];
  setFilteredCourses: (courses: string[]) => void;
  setCurrentScreen: (screen: string) => void;
}

export default function FilterScreen({ courses, filteredCourses, setFilteredCourses, setCurrentScreen }: FilterScreenProps) {
  const [tempFilters, setTempFilters] = useState([...filteredCourses]);

  const toggleFilter = (course: string) => {
    if (tempFilters.includes(course)) {
      setTempFilters(tempFilters.filter(c => c !== course));
    } else {
      setTempFilters([...tempFilters, course]);
    }
  };

  const clearFilters = () => {
    setTempFilters([...courses]);
  };

  const applyFilters = () => {
    setFilteredCourses(tempFilters);
    setCurrentScreen('home');
  };

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.filterTitle}>Filter Menu</Text>
        <TouchableOpacity onPress={clearFilters}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {courses.map(course => (
          <TouchableOpacity
            key={course}
            onPress={() => toggleFilter(course)}
            style={[
              styles.filterOption,
              tempFilters.includes(course) && styles.filterOptionSelected,
            ]}
          >
            <Text style={styles.filterOptionText}>{course}</Text>
            {tempFilters.includes(course) && (
              <Ionicons name="checkmark-circle" size={24} color="white" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={applyFilters}
        style={styles.applyFiltersButton}
      >
        <Text style={styles.applyFiltersButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    padding: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButton: {
    fontSize: 16,
    color: 'orange',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  filterOptionSelected: {
    backgroundColor: 'orange',
  },
  filterOptionText: {
    fontSize: 18,
  },
  applyFiltersButton: {
    padding: 15,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyFiltersButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
