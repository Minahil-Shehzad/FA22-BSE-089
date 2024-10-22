import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useFetchProducts } from '../hooks/useFetchProducts'; // Adjust the path as necessary
import Icon from '@/assets/icons'; // Adjust the path as necessary

const FoodApp = () => {
  const { products, loading, error } = useFetchProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Categories array now contains both name and icon for each category
  const categories = [
    { name: 'Fruits', icon: 'grape' },
    { name: 'Vegetables', icon: 'vegetable' },
    { name: 'Bakery', icon: 'burger' },
    { name: 'Milk', icon: 'milk' }
  ];

  // Render each category with icon, rectangle border, and label
  const renderCategory = (category) => (
    <TouchableOpacity
      key={category.name} // Add a key for FlatList to handle unique items
      style={styles.categoryButton}
      onPress={() => setSelectedCategory(category.name)}
    >
      {/* Icon inside a rectangle */}
      <View
        style={[
          styles.iconContainer,
          selectedCategory === category.name && styles.selectedIconContainer, // Apply green background only to iconContainer
        ]}
      >
        <Icon name={category.icon} size={30} />
      </View>
      {/* Category label */}
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error fetching data</Text>;

  return (
    <View style={styles.container}>
      {/* Header with burger button and heart icon */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.burgerButton}>
          <Icon name="burButton" size={23} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartIcon}>
          <Icon name="vegetable" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lock}>
          <Icon name="vegetable" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search for products" />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={20} color="#000" />
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Row */}
      <View style={styles.categoriesContainer}>
        {categories.map(category => renderCategory(category))}
      </View>

      {/* FlatList for Products */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: 'https://media.istockphoto.com/id/1143290013/photo/coffee-cup-isolated.jpg?s=612x612&w=0&k=20&c=fEsmHH_kDh-vPxukZuaMs54D0kg2BTEDgS8lnWu8bBs=' }} style={styles.productImage} />
            <Text style={{fontWeight:'bold',fontSize:23}}>{item.category}</Text>
            <Text style={{padding:10}}>{item.name}</Text>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  heartIcon: {
    marginLeft: 'auto',
    marginHorizontal: 10,
  },
  lock: {
    marginHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 35,
    padding: 5,
    marginRight: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent', // Default background color
  },
  selectedIconContainer: {
    backgroundColor: 'green', // Background color when selected
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333', // Category text color remains unchanged
  },
  productItem: {
    flex: 1,
    margin: 4,
    height: 180,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10, // Add a border radius for a softer look
    shadowColor: '#000', // Color of the shadow
    shadowOffset: {
      width: 0, // Horizontal offset
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.2, // Opacity of the shadow
    shadowRadius: 4, // How far the shadow spreads
    elevation: 5, // Android shadow effect
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default FoodApp;
