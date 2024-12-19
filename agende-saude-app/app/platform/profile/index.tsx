import { Flex, Layout, ProfileListItem, TabTitle } from "@/core/components";
import { ConfirmationModal } from "@/core/components/molecules/modals/ConfirmationModal";
import { useAuth } from "@/core/contexts/auth.provider";
import { useModal } from "@/core/contexts/modal.provider";
import { ConfirmationModalProps } from "@/core/vo/types/components.props";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const ProfileList = styled(Flex)`
    margin-top: 48px;
`;

const Profile: React.FC = () => {

    const { logout } = useAuth();
    const { displayModal, closeModal } = useModal();
    const router = useRouter();

    const performLogoutFlow = async (): Promise<void> => {
        await logout();
        router.push("/auth/login");
    }

    const displayLogoutConfirmation = (): void => {
        displayModal({
            modal: (props: ConfirmationModalProps) => <ConfirmationModal {...props} />,
            header: null,
            showCloseButton: false,
            modalProps: {
                title: "Sair",
                message: "Tem certeza que deseja sair?",
                onCancel: closeModal,
                onConfirm: () => performLogoutFlow(),
            },
        });
    }

    return (
        <Layout>
            <TabTitle>Perfil</TabTitle>
            <ProfileList gap={48}>
                <Flex gap={16}>
                    <Link href="/platform/profile/person">
                        <ProfileListItem icon="account-outline" title="Meus dados" />
                    </Link>
                    <Link href="/platform/profile/appointment">
                        <ProfileListItem icon="calendar-outline" title="Meus agendamentos" />
                    </Link>
                    <Link href="/platform/profile/faq">
                        <ProfileListItem icon="help-circle-outline" title="FAQ" />
                    </Link>
                    <Link href="/platform/profile/terms">
                        <ProfileListItem icon="shield-outline" title="Termos da Plataforma" />
                    </Link>
                    <Link href="/platform/profile/about">
                        <ProfileListItem icon="information-outline" title="Sobre" />
                    </Link>
                </Flex>
                <TouchableOpacity onPress={displayLogoutConfirmation}>
                    <ProfileListItem icon="logout" title="Sair" />
                </TouchableOpacity>
            </ProfileList>
        </Layout>
    )
}

export default Profile;