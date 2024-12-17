import { useModal } from "@/core/contexts/modal.provider";
import { Media } from "@/core/models/media.model";
import { MediaRenderProps } from "@/core/vo/types/components.props";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const StyledImage = styled.Image`
    min-width: 32px;
    min-height: 32px;
    width: 100%;
    height: 100%;
    flex: 1;
    resize-mode: contain;
`;

const StyledImageRenderer: React.FC<Media> = (props) => {
    return (
        <StyledImage
            source={{ uri: `data:${props.type};base64,${props.data}` }}
            resizeMode="contain"
            onError={(e) => console.error('Failed to load image', e.nativeEvent.error)}
        />
    );
};

const MediaRender: React.FC<MediaRenderProps> = (props) => {
    const { icon, media } = props;
    const { displayModal } = useModal();

    const openMedia = () => {
        displayModal({
            modal: (props: Media) => <StyledImageRenderer {...props} />,
            header: null,
            showCloseButton: true,
            modalProps: media,
        });
    };

    return (
        <View style={{ flex: 1 }}>
            {media 
                ? (
                    <TouchableOpacity onPress={openMedia}>
                        <StyledImageRenderer {...media} />
                    </TouchableOpacity>
                ) 
                : <MaterialCommunityIcons name={icon || 'image-off'} size={32} />
            }
        </View>
    );
};

export default MediaRender;
