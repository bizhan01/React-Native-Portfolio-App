import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Install: expo install expo-linear-gradient
import React, { useState } from 'react';
import {
	Animated,
	Dimensions,
	FlatList,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

const { width } = Dimensions.get('window');

const projectsData = [
  {
    id: '1',
    title: 'Ticket Booking App',
    description: `A React Native ticket booking app allows users to browse, select, and book tickets for various events, movies, or transportation services with an intuitive mobile interface.`,
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400',
    githubUrl: 'https://github.com/yourusername/ticket-app',
    liveUrl: 'https://yourapp.com',
    status: 'Completed',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Food Recipe App',
    description: `A React Native food recipe app offers a simple and interactive platform for users to discover, explore, and cook a variety of recipes, enhancing their culinary experience on mobile devices.`,
    technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    githubUrl: 'https://github.com/yourusername/recipe-app',
    liveUrl: 'https://recipeapp.com',
    status: 'In Progress',
    rating: 4.5
  },
  {
    id: '3',
    title: 'Spotify Clone',
    description: `A React Native Spotify clone replicates the popular music streaming service, providing users with a familiar interface to discover, play, and create playlists, bringing the Spotify experience to mobile devices.`,
    technologies: ['React Native', 'Firebase', 'Redux', 'Spotify API'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    githubUrl: 'https://github.com/yourusername/spotify-clone',
    liveUrl: 'https://spotifyclone.com',
    status: 'Completed',
    rating: 4.9
  },
  {
    id: '4',
    title: 'E-Commerce Mobile App',
    description: `A complete shopping experience with product listings, cart functionality, payment integration, and order tracking.`,
    technologies: ['React Native', 'Stripe', 'Firebase', 'Redux Toolkit'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    githubUrl: 'https://github.com/yourusername/ecommerce-app',
    status: 'Completed',
    rating: 4.7
  },
];

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [scaleAnim] = useState(new Animated.Value(0.9));

  const handleProjectPress = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const renderProjectItem = ({ item, index }) => {
    const isExpanded = expandedProject === item.id;
    
    return (
      <Animated.View 
        style={[
          styles.projectCard,
          {
            transform: [{ scale: isExpanded ? 1.02 : 1 }],
            height: isExpanded ? 'auto' : 200,
          }
        ]}
      >
        <TouchableOpacity onPress={() => handleProjectPress(item.id)} activeOpacity={0.9}>
          <LinearGradient
            colors={['#112240', '#0a192f']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Project Image */}
            <Image source={{ uri: item.image }} style={styles.projectImage} />
            
            {/* Project Header */}
            <View style={styles.projectHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.projectTitle}>{item.title}</Text>
                <View style={[styles.statusBadge, 
                  { backgroundColor: item.status === 'Completed' ? '#64ffda' : '#ffd700' }]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#ffd700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>

            {/* Project Description */}
            <Text 
              style={styles.projectDescription} 
              numberOfLines={isExpanded ? undefined : 2}
            >
              {item.description}
            </Text>

            {/* Technologies */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.technologiesContainer}
            >
              {item.technologies.map((tech, techIndex) => (
                <View key={techIndex} style={styles.techBox}>
                  <Text style={styles.techText}>{tech}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Action Buttons - Only show when expanded */}
            {isExpanded && (
              <View style={styles.actionButtons}>
                {item.githubUrl && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => openLink(item.githubUrl)}
                  >
                    <Ionicons name="logo-github" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>GitHub</Text>
                  </TouchableOpacity>
                )}
                
                {item.liveUrl && (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.liveButton]}
                    onPress={() => openLink(item.liveUrl)}
                  >
                    <Ionicons name="globe" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Live Demo</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Expand Indicator */}
            <View style={styles.expandIndicator}>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#64ffda" 
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Projects</Text>
        <Text style={styles.subHeader}>A collection of my recent work</Text>
      </View>

      {/* Projects List */}
      <FlatList
        data={projectsData}
        keyExtractor={(item) => item.id}
        renderItem={renderProjectItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Stats Footer */}
      <View style={styles.statsFooter}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{projectsData.length}+</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>∞</Text>
          <Text style={styles.statLabel}>Passion</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#0a192f',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ccd6f6',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#8892b0',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  projectCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#64ffda',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  gradient: {
    padding: 20,
  },
  projectImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ccd6f6',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#0a192f',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    padding: 5,
    borderRadius: 8,
  },
  ratingText: {
    color: '#ffd700',
    marginLeft: 4,
    fontWeight: '600',
  },
  projectDescription: {
    fontSize: 14,
    color: '#8892b0',
    lineHeight: 20,
    marginBottom: 15,
  },
  technologiesContainer: {
    marginBottom: 15,
  },
  techBox: {
    backgroundColor: 'rgba(100, 255, 218, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#64ffda',
  },
  techText: {
    color: '#64ffda',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 25,
    paddingHorizontal: 20,
    gap: 8,
  },
  liveButton: {
    backgroundColor: '#64ffda',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  expandIndicator: {
    alignItems: 'center',
    marginTop: 5,
  },
  statsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#112240',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#64ffda',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#8892b0',
    fontWeight: '600',
  },
});

export default Projects;