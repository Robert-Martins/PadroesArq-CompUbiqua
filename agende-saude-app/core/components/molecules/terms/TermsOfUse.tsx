import { Flex } from "..";
import { Emphasis, H1, H2, Paragraph } from "../..";

const TermsOfUse = () => (
    <Flex gap={16}>
        <H1>Termos de Uso</H1>
        <Paragraph>
            Estes termos de uso são apenas para fins informativos e não criam um acordo legalmente vinculativo. Eles têm como objetivo orientar sua interação com nosso aplicativo.
        </Paragraph>
        <H2>Diretrizes de Uso</H2>
        <Paragraph>
            Ao usar este aplicativo, você concorda em interagir respeitosamente com a plataforma e outros usuários, garantindo uma experiência positiva para todos.
        </Paragraph>
        <H2>Limitações</H2>
        <Paragraph>
            O aplicativo é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos por quaisquer problemas decorrentes do uso da plataforma.
        </Paragraph>
        <H2>Alterações nos Termos</H2>
        <Paragraph>
            Estes termos podem ser atualizados periodicamente para refletir mudanças nas funcionalidades do aplicativo ou políticas. O uso contínuo do aplicativo constitui aceitação dos termos atualizados.
        </Paragraph>
        <Paragraph>
            <Emphasis>Declaração:</Emphasis> Este documento é um modelo e não substitui termos de uso legalmente vinculativos.
        </Paragraph>
    </Flex>
);

export default TermsOfUse;