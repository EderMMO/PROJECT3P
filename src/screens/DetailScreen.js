import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  const { artwork } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{artwork.title}</Text>
        {artwork.primaryImage ? (
          <Image source={{ uri: artwork.primaryImage }} style={styles.image} />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>Imagen no disponible</Text>
          </View>
        )}

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Artista:</Text>
          <Text style={styles.infoText}>{artwork.artistDisplayName || 'Desconocido'}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.infoText}>{artwork.objectDate || 'No especificada'}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Ubicación:</Text>
          <Text style={styles.infoText}>{artwork.repository || 'No especificada'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6fa',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1e1e2f',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  noImage: {
    height: 320,
    borderRadius: 12,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  noImageText: {
    color: '#6b7280',
    fontSize: 16,
    fontStyle: 'italic',
  },
  infoGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },
});
