import { AppName, Flex, Layout, Slider } from "@/core/components";
import { useRef } from "react";
import { SliderRef } from "@/core/vo/types/components.props";

const Register: React.FC = () => {
    const sliderRef = useRef<SliderRef>(null);

    return (
        <Layout>
            <Flex flex={1} justify="space-between" align="center">
                <AppName />
                <Slider ref={sliderRef} showNavigation={true}>
                    <Flex align="center" gap={4}>
                    </Flex>
                    <Flex align="center" gap={4}>
                    </Flex>
                </Slider>
                
            </Flex>
        </Layout>
    );
}

export default Register;