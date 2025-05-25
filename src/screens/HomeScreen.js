import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { db, auth } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Feather from "react-native-vector-icons/Feather";

export default function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  const famousArtists = ["van gogh", "picasso", "Goya", "rembrandt", "gustav klimt"];

  useEffect(() => {
    loadRandomArtworks();
  }, []);

  const loadRandomArtworks = async () => {
    setLoading(true);
    try {
      const allResults = [];

      for (const artist of famousArtists) {
        const res = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=${artist}`
        );
        const data = await res.json();
        if (!data.objectIDs) continue;

        const randomIDs = data.objectIDs.slice(0, 5);
        const details = await Promise.all(
          randomIDs.map((id) =>
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then((r) =>
              r.json()
            )
          )
        );

        const withImages = details.filter((d) => d.primaryImageSmall);
        allResults.push(...withImages);
      }

      setArtworks(allResults);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo cargar el arte.");
    } finally {
      setLoading(false);
    }
  };

  const saveToFavorites = async (artwork) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid),
        where("objectID", "==", artwork.objectID)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        Alert.alert("Aviso", "Ya está en tus favoritos");
        return;
      }

      await addDoc(collection(db, "favorites"), {
        ...artwork,
        userId: user.uid,
      });
      Alert.alert("Éxito", "Agregado a favoritos");
    } catch (err) {
      console.error("Error guardando favorito", err);
      Alert.alert("Error", "No se pudo agregar a favoritos");
    }
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch(() => {
        Alert.alert("Error", "No se pudo cerrar sesión");
      });
  };

  const renderArtworkCard = (artwork) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { artwork })}
        activeOpacity={0.8}
      >
        <Text style={styles.title} numberOfLines={2}>
          {artwork.title}
        </Text>
        <Image source={{ uri: artwork.primaryImageSmall }} style={styles.image} />
        <Text style={styles.artist}>{artwork.artistDisplayName || "Artista desconocido"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.heartIcon} onPress={() => saveToFavorites(artwork)}>
        <Feather name="heart" size={24} color="#e0245e" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header minimalista y limpio */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Galería de Arte</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton} activeOpacity={0.6}>
          <Feather name="log-out" size={22} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Buscador */}
      <TextInput
        style={styles.input}
        placeholder="Buscar artista..."
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={loadRandomArtworks}
        returnKeyType="search"
      />

      {/* Lista o loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={artworks.filter((a) =>
            a.artistDisplayName
              ? a.artistDisplayName.toLowerCase().includes(searchTerm.toLowerCase())
              : false
          )}
          keyExtractor={(item) => item.objectID.toString()}
          renderItem={({ item }) => renderArtworkCard(item)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron obras para la búsqueda.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 20,
    position: "relative",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 8,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 18,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 5,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  artist: {
    fontStyle: "italic",
    color: "#6b7280",
    marginTop: 6,
  },
  image: {
    height: 180,
    marginTop: 12,
    borderRadius: 12,
    resizeMode: "cover",
  },
  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 22,
    elevation: 5,
  },
  emptyText: {
    marginTop: 50,
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 16,
  },
});
