import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SortFilterProps {
  setSortBy: (sortBy: string) => void;
  setFilterBy: (filterBy: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ setSortBy, setFilterBy }) => {
  return (
    <View style={styles.sortFilterContainer}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setSortBy('taskTitle')}>
        <Text style={styles.filterButtonText}>▼ Sort by Task Title</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterBy('all')}>
        <Text style={styles.filterButtonText}>▼ Show All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterBy('completed')}>
        <Text style={styles.filterButtonText}>▼ Show Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterBy('pending')}>
        <Text style={styles.filterButtonText}>▼ Show Pending</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sortFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: '#00bbff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filterButtonText: {
    fontSize: 10,
    color: '#fff',
  },
});

export default SortFilter;
