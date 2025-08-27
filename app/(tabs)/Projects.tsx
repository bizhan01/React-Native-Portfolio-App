import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
	Animated,
	Dimensions,
	Easing,
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic)
    }).start();
  }, []);

  const handleProjectPress = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
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
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }
            ]
          }
        ]}
      >
        <LinearGradient
          colors={['#112240', '#0a192f']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Project Image */}
          {/* <Image source={{ uri: item.image }} style={styles.projectImage} /> */}
          
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

          {/* Project Description - Always visible */}
          <Text style={styles.projectDescription} numberOfLines={3}>
            {item.description}
          </Text>

          {/* Technologies - Always visible */}
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

          {/* Action Buttons - Always visible but compact */}
          <View style={styles.actionButtons}>
            {item.githubUrl && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => openLink(item.githubUrl)}
              >
                <Ionicons name="logo-github" size={16} color="#fff" />
                <Text style={styles.actionButtonText}>Code</Text>
              </TouchableOpacity>
            )}
            
            {item.liveUrl && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.liveButton]}
                onPress={() => openLink(item.liveUrl)}
              >
                <Ionicons name="globe" size={16} color="#fff" />
                <Text style={styles.actionButtonText}>Live</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Expandable Details */}
          {isExpanded && (
            <Animated.View style={styles.expandedContent}>
              <Text style={styles.fullDescription}>{item.description}</Text>
              
              {/* Additional project details can go here */}
              <View style={styles.projectDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="time" size={16} color="#64ffda" />
                  <Text style={styles.detailText}>3 months development</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="people" size={16} color="#64ffda" />
                  <Text style={styles.detailText}>Solo project</Text>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Expand/Collapse Button */}
          <TouchableOpacity 
            style={styles.expandButton}
            onPress={() => handleProjectPress(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.expandButtonText}>
              {isExpanded ? 'Show Less' : 'Read More'}
            </Text>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#64ffda" 
            />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#0a192f', '#112240']}
        style={styles.headerContainer}
      >
        <Text style={styles.header}>My Projects</Text>
        <Text style={styles.subHeader}>A collection of my recent work and accomplishments</Text>
      </LinearGradient>

      {/* Projects List */}
      <FlatList
        data={projectsData}
        keyExtractor={(item) => item.id}
        renderItem={renderProjectItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.projectsCount}>
            {projectsData.length} Projects
          </Text>
        }
      />

      {/* Stats Footer */}
      <LinearGradient
        colors={['#112240', '#0a192f']}
        style={styles.statsFooter}
      >
        <View style={styles.statItem}>
          <Ionicons name="rocket" size={24} color="#64ffda" />
          <Text style={styles.statNumber}>{projectsData.length}</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="trophy" size={24} color="#64ffda" />
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>Success</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="heart" size={24} color="#64ffda" />
          <Text style={styles.statNumber}>∞</Text>
          <Text style={styles.statLabel}>Passion</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f',
  },
  headerContainer: {
    padding: 25,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ccd6f6',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#8892b0',
    lineHeight: 22,
  },
  projectsCount: {
    fontSize: 18,
    color: '#64ffda',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  projectCard: {
    borderRadius: 20,
    marginBottom: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  gradient: {
    padding: 20,
  },
  projectImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ccd6f6',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
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
    padding: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  ratingText: {
    color: '#ffd700',
    marginLeft: 4,
    fontWeight: '600',
    fontSize: 12,
  },
  projectDescription: {
    fontSize: 14,
    color: '#a8b2d1',
    lineHeight: 20,
    marginBottom: 15,
  },
  fullDescription: {
    fontSize: 14,
    color: '#a8b2d1',
    lineHeight: 22,
    marginBottom: 15,
  },
  technologiesContainer: {
    marginBottom: 15,
  },
  techBox: {
    backgroundColor: 'rgba(100, 255, 218, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#64ffda20',
  },
  techText: {
    color: '#64ffda',
    fontSize: 11,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 20,
    paddingHorizontal: 15,
    gap: 6,
  },
  liveButton: {
    backgroundColor: '#64ffda',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(100, 255, 218, 0.1)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#64ffda30',
  },
  expandButtonText: {
    color: '#64ffda',
    fontWeight: '600',
    marginRight: 8,
    fontSize: 12,
  },
  expandedContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#64ffda20',
  },
  projectDetails: {
    marginTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    color: '#8892b0',
    fontSize: 12,
    marginLeft: 8,
  },
  statsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64ffda',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#8892b0',
    fontWeight: '600',
  },
});

export default Projects;