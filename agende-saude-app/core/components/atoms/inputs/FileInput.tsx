import React, { useState } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Media } from "@/core/models/media.model";
import { createMedia, deleteMedia, updateMedia } from "@/core/services/media.service";
import { FileInputProps } from "@/core/vo/types/components.props";
import { MediaRender } from "../images";
import { FlatButton } from "../buttons";
import { displayInfoMessage } from "@/core/utils/toast.utils";
import { Optional } from "@/core/utils/optional";
import { imagePickerOptions } from "@/core/vo/consts/consts";
import { convertImagePickerResultToFile } from "@/core/utils/components.utils";

const MediaInput: React.FC<FileInputProps> = ({ media, icon, onChangeValue }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [localMedia, setLocalMedia] = useState<Media | null>(media || null);

    const handleMediaUpload = async (file: File) => {
        let updatedMedia: Media;
        setIsLoading(true);
        if (localMedia?.id) {
            updatedMedia = await updateMedia(localMedia.id, file);
        } else {
            updatedMedia = await createMedia(file);
        }
        setLocalMedia(updatedMedia);
        onChangeValue(updatedMedia);
        setIsLoading(false);
    };

    const handleSelectFile = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            displayInfoMessage("Permissão negada", "Permissão para acessar a galeria é necessária.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

        Optional.ofNullable(convertImagePickerResultToFile(result))
            .ifPresent(handleMediaUpload);
    };

    const handleCapturePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            displayInfoMessage("Permissão negada", "Permissão para acessar a câmera é necessária.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync(imagePickerOptions);

        Optional.ofNullable(convertImagePickerResultToFile(result))
            .ifPresent(handleMediaUpload);
    };

    const handleDeleteMedia = async () => {
        if (!localMedia?.id) {
            displayInfoMessage("Erro", "Nenhuma mídia para deletar.");
            return;
        }

        await deleteMedia(localMedia.id);
        setLocalMedia(null);
        onChangeValue(null);
    };

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
          <MediaRender media={localMedia} icon={icon} />

          <View style={{ flexDirection: "row", marginTop: 10 }}>
              <FlatButton
                  onPress={handleSelectFile}
                  disabled={isLoading}
              >
                  Selecionar arquivo
              </FlatButton>
              <FlatButton
                  onPress={handleCapturePhoto}
                  disabled={isLoading}
              >
                  Abrir câmera
              </FlatButton>
              {localMedia && (
                  <FlatButton
                      onPress={handleDeleteMedia}
                      disabled={isLoading}
                  >
                      Remover
                  </FlatButton>
              )}
          </View>
      </View>
    );
};

export default MediaInput;