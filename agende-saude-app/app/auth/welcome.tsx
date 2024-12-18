import { AppName, FlatButton, Flex, H4, Layout, Paragraph, Slider } from "@/core/components";
import { SliderRef } from "@/core/vo/types/components.props";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

const Welcome: React.FC = () => {
    const router = useRouter();
    const sliderRef = useRef<SliderRef>(null);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const handleNext = () => {
        sliderRef.current?.nextSlide(() => {
            setIsLastSlide(sliderRef.current?.isLastSlide() || false);
        });
    };

    const handlePrevious = () => {
        sliderRef.current?.previousSlide(() => {
            setIsLastSlide(sliderRef.current?.isLastSlide() || false);
        });
    };

    const goToLogin = () => {
        router.push('/auth/login');
    };

    return (
        <Layout>
            <Flex flex={1} justify="space-between" align="center">
                <AppName />
                <Slider ref={sliderRef} showNavigation={true}>
                    <Flex align="center" gap={4}>
                        <H4 style={{ textAlign: 'center' }}>
                            Acesso e Localização Facilitados
                        </H4>
                        <Paragraph style={{ textAlign: 'center' }}>
                            Agende Saúde é gratuito e acessível para todos. 
                            Com a geolocalização, encontre unidades de saúde próximas e agende suas consultas sem sair de casa, 
                            economizando tempo e deslocamento.
                        </Paragraph>
                    </Flex>
                    <Flex align="center" gap={4}>
                        <H4 style={{ textAlign: 'center' }}>
                            Agendamento Rápido e Eficiente
                        </H4>
                        <Paragraph style={{ textAlign: 'center' }}>
                            Reduza filas e tempo de espera! O Agende Saúde antecipa a triagem e o preenchimento de fichas, 
                            garantindo um atendimento ágil e eficiente, com transparência em cada etapa.
                        </Paragraph>
                    </Flex>
                    <Flex align="center" gap={4}>
                        <H4 style={{ textAlign: 'center' }}>
                            Gestão Inteligente e Notificações em Tempo Real
                        </H4>
                        <Paragraph style={{ textAlign: 'center' }}>
                            Com o Agende Saúde, unidades de saúde monitoram a demanda em tempo real e alocam recursos de forma otimizada. 
                            Receba notificações sobre novas consultas disponíveis e agende com rapidez e facilidade.
                        </Paragraph>
                    </Flex>
                </Slider>
                <Flex gap={16}>
                    {isLastSlide 
                    ?   <FlatButton type='secondary' onPress={goToLogin} ghost icon="login">
                            Acessar
                        </FlatButton>
                    : (
                        <>
                            <FlatButton type='primary' onPress={handleNext} icon="chevron-right">
                                Próximo
                            </FlatButton>
                            <FlatButton type='primary' onPress={handlePrevious} ghost icon="chevron-left">
                                Anterior
                            </FlatButton>
                        </>
                    )}
                </Flex>
            </Flex>
        </Layout>
    );
};

export default Welcome;