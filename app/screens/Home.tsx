import { Ionicons } from '@expo/vector-icons'; // Make sure to install: expo install @expo/vector-icons
import React, { useEffect, useState } from 'react';
import {
	Animated,
	Dimensions,
	Easing,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

const { width } = Dimensions.get('window');

const technologies = [
  { name: 'React Native', icon: 'logo-react', color: '#61dafb' },
  { name: 'JavaScript', icon: 'logo-javascript', color: '#f7df1e' },
  { name: 'Node.js', icon: 'logo-nodejs', color: '#339933' },
  { name: 'Express', icon: 'server', color: '#000000' },
  { name: 'MongoDB', icon: 'leaf', color: '#47a248' },
  { name: 'TypeScript', icon: 'document-text', color: '#007acc' },
  { name: 'Python', icon: 'logo-python', color: '#3776ab' },
  { name: 'Firebase', icon: 'flame', color: '#ffca28' }
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: 'logo-github', color: '#333' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'logo-linkedin', color: '#0077b5' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'logo-twitter', color: '#1da1f2' },
  { name: 'Portfolio', url: 'https://yourportfolio.com', icon: 'globe', color: '#007acc' }
];

const projects = [
  {
    name: 'E-Commerce App',
    description: 'A full-stack mobile shopping application',
    tech: ['React Native', 'Node.js', 'MongoDB']
  },
  {
    name: 'Weather App',
    description: 'Real-time weather forecasting application',
    tech: ['React Native', 'OpenWeather API']
  },
  {
    name: 'Task Manager',
    description: 'Productivity app with cloud sync',
    tech: ['React Native', 'Firebase']
  }
];

const Home = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [currentTechIndex, setCurrentTechIndex] = useState(0);

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      })
    ]).start();

    // Auto-rotate featured technology
    const techInterval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % technologies.length);
    }, 3000);

    return () => clearInterval(techInterval);
  }, []);

  const handleSocialPress = (url) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const renderTechBoxes = () => {
    return (
      <View style={styles.techContainer}>
        {technologies.map((tech, index) => (
          <Animated.View 
            key={index}
            style={[
              styles.techBox,
              { 
                backgroundColor: tech.color,
                transform: [{ scale: currentTechIndex === index ? 1.1 : 1 }]
              }
            ]}
          >
            <Ionicons name={tech.icon} size={20} color="#fff" style={styles.techIcon} />
            <Text style={styles.techText}>{tech.name}</Text>
          </Animated.View>
        ))}
      </View>
    );
  };

  const renderProjects = () => {
    return projects.map((project, index) => (
      <View key={index} style={styles.projectCard}>
        <Text style={styles.projectTitle}>{project.name}</Text>
        <Text style={styles.projectDescription}>{project.description}</Text>
        <View style={styles.projectTechContainer}>
          {project.tech.map((tech, techIndex) => (
            <View key={techIndex} style={styles.projectTech}>
              <Text style={styles.projectTechText}>{tech}</Text>
            </View>
          ))}
        </View>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20231103122512/p.png' }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.header}>Bizhan</Text>
            <Text style={styles.subheader}>React Native Developer</Text>
            <Text style={styles.tagline}>Building beautiful mobile experiences</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.description}>
            Passionate React Native developer with 3+ years of experience in creating 
            high-performance mobile applications. I specialize in building cross-platform 
            solutions that deliver exceptional user experiences.
          </Text>
        </View>

        {/* Technologies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technologies & Skills</Text>
          {renderTechBoxes()}
        </View>

        {/* Featured Project */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Projects</Text>
          {renderProjects()}
        </View>

        {/* Social Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Let's Connect</Text>
          <View style={styles.socialContainer}>
            {socialLinks.map((social, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialButton, { backgroundColor: social.color }]}
                onPress={() => handleSocialPress(social.url)}
              >
                <Ionicons name={social.icon} size={24} color="#fff" />
                <Text style={styles.socialText}>{social.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3+</Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>Happy Clients</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f', // Dark blue background
  },
  content: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#64ffda',
    marginBottom: 15,
  },
  profileTextContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ccd6f6',
    marginBottom: 5,
  },
  subheader: {
    fontSize: 18,
    color: '#64ffda',
    marginBottom: 5,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 16,
    color: '#8892b0',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ccd6f6',
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#64ffda',
    paddingLeft: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#8892b0',
    textAlign: 'left',
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  techBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 12,
    margin: 5,
    minWidth: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  techIcon: {
    marginRight: 8,
  },
  techText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  projectCard: {
    backgroundColor: '#112240',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#64ffda',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ccd6f6',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: '#8892b0',
    marginBottom: 12,
    lineHeight: 20,
  },
  projectTechContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectTech: {
    backgroundColor: '#64ffda',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  projectTechText: {
    color: '#0a192f',
    fontSize: 12,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    padding: 12,
    paddingHorizontal: 20,
    minWidth: 120,
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#112240',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
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

export default Home;