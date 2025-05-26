import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

//ArtistDetailScreen
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ArtistDetailScreen({ route }) {
  const { artist } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{ uri: artist.image }} style={styles.portrait} />
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.bio}>{artist.bio}</Text>
        {artist.artwork && (
          <>
            <Text style={styles.section}>Obra destacada</Text>
            <Image source={{ uri: artist.artwork }} style={styles.artwork} />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    minHeight: screenHeight - 80,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  portrait: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    borderRadius: (screenWidth * 0.6) / 2,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify',
    lineHeight: 24,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  artwork: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 12,
  },
});
