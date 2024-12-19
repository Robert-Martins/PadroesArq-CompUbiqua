import { AppName, FlatButton, Flex, H4, H5, Layout, Paragraph, Slider, TextButton, TextInput } from "@/core/components";
import { useEffect, useRef, useState } from "react";
import { SliderRef } from "@/core/vo/types/components.props";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/core/vo/consts/schemas";
import { useForm } from "react-hook-form";
import { displaySuccessMessage } from "@/core/utils/toast.utils";
import { getPreviousUsers, includeNewUser } from "@/core/utils/storage.utils";
import { AuthenticationRequest } from "@/core/vo/types/types";
import { authenticate } from "@/core/services/auth.service";
import { acceptTrueOrElse } from "@/core/utils/functions";

const Login: React.FC = () => {
    const sliderRef = useRef<SliderRef>(null);
    const router = useRouter();
    const [previousAccesses, setPreviousAccesses] = useState<string[]>([]);

    const { control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            taxId: "", 
            password: ""
        },
    });

    const goToRegister = () => {
        router.navigate("/auth/register");
    };

    const goToResetPassword = () => {
        router.navigate("/auth/reset-password");
    };

    const onSubmit = async (data: AuthenticationRequest): Promise<void> => {
        const dt = await authenticate(data);
        displaySuccessMessage("Acesso autorizado", "Você foi autenticado com sucesso!");
        await includeNewUser(data.taxId);
        console.log(dt);
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
                    <Flex align="center" gap={4}>
                        <H4 style={{ textAlign: 'center' }}>
                            Acessos recentes
                        </H4>
                        <Paragraph style={{ textAlign: 'center' }}>
                            Encontramos acessos recentes, selecione um ou clique em novo acesso.
                        </Paragraph>
                        <Flex>
                            {
                                previousAccesses.map((user, index) => (
                                    <FlatButton type="primary" ghost key={index} onPress={() => setValue("taxId", user)}>
                                        {user}
                                    </FlatButton>
                                ))
                            }
                        </Flex>
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