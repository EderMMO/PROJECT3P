import React, { useState, useCallback } from "react";
import {View,Text,FlatList,Image,TouchableOpacity,StyleSheet,ImageBackground,} from "react-native";
import {collection,query,where,getDocs,deleteDoc,doc,addDoc,} from "firebase/firestore";
import { auth, db } from "../../firebase";
import Feather from "react-native-vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "favorites"), where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFavorites(results);
  };

  const toggleFavorite = async (item) => {
    const existing = favorites.find((fav) => fav.objectID === item.objectID);
    if (existing) {
      await deleteDoc(doc(db, "favorites", existing.id));
    } else {
      await addDoc(collection(db, "favorites"), {
        ...item,
        userId: auth.currentUser.uid,
      });
    }
    fetchFavorites();
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.objectID === item.objectID);
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        {item.primaryImageSmall && (
          <Image source={{ uri: item.primaryImageSmall }} style={styles.image} />
        )}
        <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item)}>
          <Feather name="heart" size={24} color={isFavorite ? "red" : "gray"} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../images/Fondo_vangogh.jpg")} 
      style={styles.container}
      resizeMode="cover"
    >
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id || item.objectID?.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes favoritos aún.</Text>
          </View>
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // fondo blanco semi-transparente para mejor legibilidad
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111",
  },
  image: {
    height: 200,
    resizeMode: "contain",
    marginTop: 10,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#444",
    fontStyle: "italic",
  },
});
