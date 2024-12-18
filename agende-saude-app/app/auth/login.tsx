import { AppName, Flex, H4, Layout, Paragraph, Slider } from "@/core/components";
import { useRef } from "react";
import { SliderRef } from "@/core/vo/types/components.props";

const Login: React.FC = () => {
    const sliderRef = useRef<SliderRef>(null);

    return (
        <Layout>
            <Flex flex={1} justify="space-between" align="center">
                <AppName />
                <Slider ref={sliderRef} showNavigation={false}>
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
                </Slider>
                
            </Flex>
        </Layout>
    );
}

export default Login;