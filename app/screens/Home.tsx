// Home.js
import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	View
} from 'react-native';

const technologies =
	[
		'React Native',
		'JavaScript',
		'Node.js',
		'Express',
		'MongoDB'
	];

const Home = () => {
	const renderTechBoxes = () => {
		return (
			<View style={styles.techContainer}>
				{technologies
					.map((tech, index) => (
						<View key={index}
							style={styles.techBox}>
							<Text style={styles.techText}>
								{tech}
							</Text>
						</View>
					))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Image source=
				{
					{
						uri:
'https://media.geeksforgeeks.org/wp-content/uploads/20231103122512/p.png'
					}
				} style={styles.profileImage} />
			<Text style={styles.header}>
				Bizhan
			</Text>
			<Text style={styles.subheader}>
				React Native Developer
			</Text>
			<Text style={styles.description}>
				Welcome to my portfolio app! I am a
				passionate developer with expertise
				in building cross-platform mobile applications
				using React Native.
			</Text>
			<Text style={styles.subheader}>
				Technologies Known
			</Text>
			{renderTechBoxes()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginBottom: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white'
	},
	subheader: {
		fontSize: 18,
		color: '#666',
		marginBottom: 20,
	},
	description: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 20,
		color: 'white'
	},
	techContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	techBox: {
		backgroundColor: '#61dafb',
		borderRadius: 5,
		padding: 5,
		margin: 5,
	},
	techText: {
		color: '#fff',
	},
});

export default Home;