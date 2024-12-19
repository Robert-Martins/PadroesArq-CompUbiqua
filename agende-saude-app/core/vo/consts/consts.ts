import * as ImagePicker from 'expo-image-picker';

export const imagePickerOptions: ImagePicker.ImagePickerOptions = {
    mediaTypes: 'images',
    cameraType: ImagePicker.CameraType.front,
    allowsEditing: true,
    base64: true,
    aspect: [1, 1],
    quality: 1
};