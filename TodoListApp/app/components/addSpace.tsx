import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSpaceContext } from "../context/SpaceContext";
import { addSpaceStyles as styles } from '../styles/components';

type AddSpaceProps = {
  onClose: () => void;
};

const AddSpace = ({ onClose }: AddSpaceProps) => {
  const [newSpaceName, setNewSpaceName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { addSpace } = useSpaceContext();

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const pickImage = async () => {
    Keyboard.dismiss();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAddSpace = () => {
    if (newSpaceName.trim()) {
      addSpace(newSpaceName, selectedImage || undefined);
      setNewSpaceName("");
      setSelectedImage(null);
      onClose();
    } else {
      Alert.alert("Space name cannot be empty");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Create New Space</Text>
          <TouchableOpacity 
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={[
          styles.content,
          keyboardOpen && styles.contentKeyboardOpen
        ]}>
          <TextInput
            style={styles.input}
            value={newSpaceName}
            onChangeText={setNewSpaceName}
            placeholder="Enter space name..."
            placeholderTextColor="#999"
            autoFocus
          />
          
          <TouchableOpacity 
            style={[
              styles.imagePickerButton,
              keyboardOpen && styles.imagePickerButtonSmall
            ]}
            onPress={pickImage}
          >
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            ) : (
              <Text style={styles.imagePickerText}>Select Background Image</Text>
            )}
          </TouchableOpacity>

          <View style={[
            styles.bottomButtons,
            keyboardOpen && styles.bottomButtonsKeyboardOpen
          ]}>
            <TouchableOpacity 
              style={[styles.actionButton]} 
              onPress={handleAddSpace}
            >
              <Text style={[styles.actionText]}>Create Space</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddSpace;