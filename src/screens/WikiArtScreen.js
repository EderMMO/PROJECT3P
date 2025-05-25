import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const artists = [
  {
    name: "Vincent van Gogh",
    image: "https://uploads6.wikiart.org/images/vincent-van-gogh.jpg!Portrait.jpg",
    bio: "Vincent van Gogh fue un pintor postimpresionista holandés, conocido por su uso emotivo del color y pinceladas expresivas. A pesar de luchar con problemas de salud mental, produjo más de 2,000 obras en poco más de una década, incluyendo famosos cuadros como 'La noche estrellada' y 'Los girasoles'. Su estilo único ha influenciado generaciones de artistas.",
    artwork: "https://uploads4.wikiart.org/images/vincent-van-gogh/the-starry-night-1889(1).jpg!Large.jpg"
  },
  {
    name: "Claude Monet",
    image: "https://uploads1.wikiart.org/images/claude-monet.jpg!Portrait.jpg",
    bio: "Claude Monet fue un pintor francés, uno de los fundadores del movimiento impresionista. Su técnica de captar la luz y la atmósfera cambió el rumbo del arte moderno. Su serie de nenúfares y la catedral de Ruan destacan por su estudio de la luz en diferentes momentos del día.",
    artwork: "https://uploads3.wikiart.org/images/claude-monet/impression-sunrise.jpg!Large.jpg"
  },
  {
    name: "Pablo Picasso",
    image: "https://uploads7.wikiart.org/images/pablo-picasso.jpg!Portrait.jpg",
    bio: "Pablo Picasso fue un artista español, conocido como el cofundador del cubismo y uno de los artistas más influyentes del siglo XX. Su obra abarca desde el periodo azul hasta el surrealismo. 'Guernica' es una de sus obras más poderosas contra la guerra.",
    artwork: "https://www.ifema.es/img/l/guernica/picasso1.png"
  },
  {
    name: "Salvador Dalí",
    image: "https://uploads8.wikiart.org/images/salvador-dali.jpg!Portrait.jpg",
    bio: "Salvador Dalí fue un pintor surrealista español, famoso por sus imágenes oníricas, su bigote icónico y su comportamiento excéntrico. Su obra más conocida, 'La persistencia de la memoria', representa relojes derretidos en un paisaje desértico.",
    artwork: "https://uploads2.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg!Large.jpg"
  },
  {
    name: "Francisco de Goya",
    image: "https://uploads6.wikiart.org/images/francisco-goya.jpg!Portrait.jpg",
    bio: "Francisco de Goya fue un pintor y grabador español, considerado uno de los artistas más importantes de finales del siglo XVIII y principios del XIX. Su obra abarca desde retratos de la corte hasta visiones oscuras de guerra y locura como en sus 'Pinturas negras'.",
    artwork: "https://totenart.com/noticias/wp-content/uploads/2021/09/cabecera-mejores-obras-francisco-de-goya-totenart.jpg"
  },
  {
    name: "Gustav Klimt",
    image: "https://uploads8.wikiart.org/images/gustav-klimt.jpg!Portrait.jpg",
    bio: "Gustav Klimt fue un pintor simbolista austríaco, conocido por sus retratos ornamentados y sus temas sensuales. Su estilo decorativo y uso del dorado alcanzó su clímax en obras como 'El beso'.",
    artwork: "https://ethic.es/wp-content/uploads/2024/07/gustav-klimt.png"
  },
  {
    name: "Rembrandt van Rijn",
    image: "https://uploads1.wikiart.org/images/rembrandt.jpg!Portrait.jpg",
    bio: "Rembrandt fue un pintor y grabador neerlandés del Siglo de Oro. Maestro del claroscuro, destacó por sus retratos y escenas bíblicas. Su obra refleja una profunda humanidad y una maestría técnica inigualable.",
    artwork: "https://totenart.com/noticias/wp-content/uploads/2021/07/las-10-mejores-obras-de-rembrandt.jpg"
  }
];

export default function WikiArtScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ArtistDetail', { artist: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text numberOfLines={2} style={styles.bio}>{item.bio}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  card: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  bio: { color: '#555', marginTop: 4 },
});
