import { AppName, FlatButton, Flex, H4, H5, Layout, Paragraph, Slider, TextButton, TextInput } from "@/core/components";
import { useEffect, useRef, useState } from "react";
import { SliderRef } from "@/core/vo/types/components.props";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/core/vo/consts/schemas";
import { useForm } from "react-hook-form";
import { displaySuccessMessage } from "@/core/utils/toast.utils";
import { getPreviousUsers, includeNewUser } from "@/core/utils/storage.utils";
import { AuthenticationRequest, AuthenticationResponse } from "@/core/vo/types/types";
import { authenticate } from "@/core/services/auth.service";
import { acceptTrueOrElse } from "@/core/utils/functions";
import { useAuth } from "@/core/contexts/auth.provider";

const Login: React.FC = () => {
    const sliderRef = useRef<SliderRef>(null);
    const router = useRouter();
    const { login } = useAuth();
    const [previousAccesses, setPreviousAccesses] = useState<string[]>([]);

    const { control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            taxId: "", 
            password: ""
        },
    });

    const goToRegister = (): void => {
        router.navigate("/auth/register");
    };

    const goToResetPassword = (): void => {
        router.navigate("/auth/reset-password");
    };

    const useFoundUser = (user: string): void => {
        setValue("taxId", user);
        sliderRef.current?.goToLastSlide();
    }

    const onSubmit = async (data: AuthenticationRequest): Promise<void> => {
        const authenticationResponse: AuthenticationResponse = await authenticate(data);
        await includeNewUser(data.taxId);
        login(authenticationResponse);
        router.navigate("/platform/home");
        displaySuccessMessage("Acesso autorizado", "Você foi autenticado com sucesso!");
    };

    useEffect(() => {
        const checkExistingUser = async () => {
            getPreviousUsers().then((users) => {
                acceptTrueOrElse(
                    !!users,
                    () => setPreviousAccesses(users),
                    () => sliderRef.current?.goToLastSlide()
                );
            });
        };
        checkExistingUser();
    }, []);

    return (
        <Layout>
            <Flex flex={1} justify="space-between" align="center">
                <AppName />
                <Slider ref={sliderRef} showNavigation={false}>
                    <Flex align="center" gap={48}>
                        <Flex align="center" gap={16}>
                            <H4 style={{ textAlign: 'center' }}>
                                Acessos recentes
                            </H4>
                            <Paragraph style={{ textAlign: 'center' }}>
                                Encontramos acessos recentes, selecione um ou clique em novo acesso.
                            </Paragraph>
                        </Flex>
                        <Flex>
                            {
                                previousAccesses.map((user, index) => (
                                    <FlatButton type="primary" ghost key={index} onPress={() => useFoundUser(user)}>
                                        {user}
                                    </FlatButton>
                                ))
                            }
                        </Flex>
                        <FlatButton type="primary" onPress={() => sliderRef.current?.goToLastSlide()}>
                            Novo acesso
                        </FlatButton>
                    </Flex>
                    <Flex align="center" gap={32}>
                        <H5>Acesse sua conta</H5>
                        <Flex align="center" gap={32}>
                            <Flex align="center" gap={4}>
                                <TextInput
                                    name="taxId"
                                    label="CPF"
                                    icon="file-document"
                                    control={control}
                                />
                                <TextInput
                                    name="password"
                                    label="Senha"
                                    icon="lock-check"
                                    control={control}
                                />
                                <FlatButton type="primary" onPress={handleSubmit(onSubmit)}>
                                    Confirmar
                                </FlatButton>
                            </Flex>
                            <Flex align="center" gap={8}>
                                <Flex align="center">
                                    <Paragraph>Esqueceu a sua senha?</Paragraph>
                                    <TextButton type="primary" onPress={goToResetPassword}>Alterar senha</TextButton>
                                </Flex>
                                <Flex align="center">
                                    <Paragraph>Não possui cadastro?</Paragraph>
                                    <TextButton type="primary" onPress={goToRegister}>Realizar cadastro</TextButton>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Slider>
                
            </Flex>
        </Layout>
    );
}

export default Login;