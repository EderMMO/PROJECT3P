import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UploadArtScreen() {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [userArt, setUserArt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso requerido", "Necesitas dar acceso a la galería.");
      }
    })();
    fetchMyArt();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        if (selectedAsset.uri) {
          setImageUri(selectedAsset.uri);
        } else {
          Alert.alert("Error", "No se pudo obtener la imagen.");
        }
      }
    } catch (error) {
      Alert.alert("Error al seleccionar imagen", error.message);
    }
  };

  const fetchMyArt = async () => {
    setLoading(true);
    const q = query(collection(db, "userArt"), where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setUserArt(results);
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!title || !imageUri) {
      Alert.alert("Completa los campos", "Debes agregar título e imagen.");
      return;
    }

    try {
      await addDoc(collection(db, "userArt"), {
        userId: auth.currentUser.uid,
        title,
        imageUrl: imageUri,
      });

      setTitle("");
      setImageUri(null);
      fetchMyArt();
    } catch (err) {
      Alert.alert("Error al subir", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "userArt", id));
      fetchMyArt();
    } catch (err) {
      Alert.alert("Error al eliminar", err.message);
    }
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditingTitle(item.title);
  };

  const handleConfirmEdit = async () => {
    if (!editingTitle.trim()) {
      Alert.alert("Error", "El título no puede estar vacío.");
      return;
    }

    try {
      await updateDoc(doc(db, "userArt", editingId), {
        title: editingTitle,
      });
      setEditingId(null);
      setEditingTitle("");
      fetchMyArt();
    } catch (err) {
      Alert.alert("Error al actualizar", err.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.artCard}>
      {editingId === item.id ? (
        <>
          <TextInput
            value={editingTitle}
            onChangeText={setEditingTitle}
            style={styles.input}
            placeholder="Nuevo título"
          />
          <TouchableOpacity onPress={handleConfirmEdit} style={styles.confirmButton}>
            <Icon name="check" size={20} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={{ uri: item.imageUrl }} style={styles.artImage} />
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => handleStartEdit(item)} style={styles.iconButton}>
              <Icon name="pencil" size={22} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
              <Icon name="delete" size={22} color="#dc3545" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sube tu obra desde la galería</Text>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Icon name="image-multiple" size={20} color="#fff" />
        <Text style={styles.imagePickerText}> Seleccionar imagen</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
      )}

      <TouchableOpacity onPress={handleUpload} style={styles.button}>
        <Icon name="upload" size={20} color="#fff" />
        <Text style={styles.buttonText}> Subir</Text>
      </TouchableOpacity>

      <FlatList
        data={userArt}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          !loading && <Text style={{ textAlign: "center", marginTop: 30 }}>No hay obras aún.</Text>
        }
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#007bff" />}
      />
    </SafeAreaView>
  );
}

// ... Tu código JS/TS permanece igual hasta el final, aquí solo se actualizan los estilos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#1e3a8a",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    marginBottom: 12,
  },
  imagePickerButton: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
    borderColor: "#cbd5e1",
    borderWidth: 1,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  artCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 10,
  },
  artImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 6,
  },
  iconButton: {
    marginLeft: 14,
  },
  confirmButton: {
    backgroundColor: "#10b981",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginTop: 10,
  },
});
