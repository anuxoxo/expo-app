import React from 'react';
import * as Sharing from 'expo-sharing';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import logo from './assets/logo.png';

export default function ImageShare() {

  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.btn}>
          <Text style={styles.btnText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode={'cover'} />

      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.btn}>
        <Text style={styles.btnText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50
  },
  instructions: {
    color: '#888',
    fontSize: 18
  },
  btn: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "cover"
  }
});