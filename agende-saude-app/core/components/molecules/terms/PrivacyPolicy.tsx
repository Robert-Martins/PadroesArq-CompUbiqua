import { Flex } from "..";
import { H1, Paragraph, H2, Emphasis } from "../..";

const PrivacyPolicy = () => (
    <Flex gap={16}>
        <H1>Política de Privacidade</H1>
        <Paragraph>
            Esta é uma política de privacidade genérica destinada apenas para fins informativos. Ela não constitui aconselhamento jurídico nem estabelece um acordo legalmente vinculativo.
        </Paragraph>
        <H2>Introdução</H2>
        <Paragraph>
            Valorizamos sua privacidade e estamos comprometidos em proteger suas informações pessoais. Este documento descreve como lidamos e protegemos seus dados.
        </Paragraph>
        <H2>Coleta de Dados</H2>
        <Paragraph>
            Coletamos informações para oferecer melhores serviços e aprimorar a experiência do usuário. Os dados coletados podem incluir detalhes pessoais, estatísticas de uso e preferências.
        </Paragraph>
        <H2>Uso dos Dados</H2>
        <Paragraph>
            Os dados coletados são usados para melhorar a plataforma, oferecer experiências personalizadas e garantir que o aplicativo funcione de maneira eficiente.
        </Paragraph>
        <Paragraph>
            <Emphasis>Nota:</Emphasis> Esta política é para fins gerais e não substitui uma política de privacidade formal elaborada por um profissional jurídico.
        </Paragraph>
    </Flex>
);

export default PrivacyPolicy;