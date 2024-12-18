import { Checkbox, Divider, Emphasis, Expandable, FlatButton, Flex, H1, H2, H3, H4, H5, H6, Layout, MediaRender, Paragraph, Select, Slider, Small, TextArea, TextButton, TextInput, Toggle } from "@/core/components";
import { Media } from "@/core/models/media.model";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

/**
 * 
 * const Home: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
  
    useEffect(() => {
        if (isAuthenticated !== undefined) {
            router.replace(
                isAuthenticated ? "/platform/home" : "/auth/login"
            );
        }
    }, [isAuthenticated]);
  
    return null;
};

export default Home;
 * 
 */

const Home: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [value, setValue] = useState<boolean>(true);
    const [selectedValue, setSelectedValue] = useState<string>("Option 20x");
    const [checked, setChecked] = useState<boolean>(false);

    const sliderRef = useRef(null);

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.nextSlide();
        }
    };

    const handlePrevious = () => {
        if (sliderRef.current) {
            sliderRef.current.prevSlide();
        }
    };

    const mockedMedia: Media = {
        id: null,
        size: null,
        filename: null,
        type: "image/png",
        data: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
        createdAt: null,
        updatedAt: null,
    }

    const [media, setMedia] = useState<Media | null>(mockedMedia);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: 'center' }}>
            <Layout>
                <Text style={{ textAlign: 'center' }}>
                    Home
                </Text>
                <Link href={"/"}>Go to About</Link>
                <Expandable expanded={isExpanded}>
                    <H1>H1</H1>
                    <H2>H2</H2>
                    <H3>H3</H3>
                    <H4>H4</H4>
                    <H5>H5</H5>
                    <H6>H6</H6>
                </Expandable>
                <Paragraph>Paragraph</Paragraph>
                <Emphasis>Emphasis</Emphasis>
                <Small>Small</Small>
                <FlatButton type='primary' onPress={() => {toggleExpand()}} ghost icon="hospital">
                    Ver mais
                </FlatButton>
                <TextButton type='primary' onPress={() => {}} ghost icon="hospital">
                    Visualizar mais
                </TextButton>
                <Divider />
                <TextInput icon="email" label="Input label" keyboardType="numeric" mask="+1 ([000]) [000] [00] [00]" />
                <Toggle
                    value={value}
                    options={[{ label: "Option 1", value: true }, { label: "Option 2", value: false }]}
                    onValueChange={(newValue) => setValue(newValue)}
                />
                <Select 
                    label="Select Label"
                    value={selectedValue}
                    editable={false}
                    icon="hospital"
                    options={[
                        { label: "Option 1", value: 'Value 1x' },
                        { label: "Option 2", value: "Option 2x" },
                        { label: "Option 3", value: "Option 3x" },
                        { label: "Option 4", value: "Option 4x" },
                        { label: "Option 5", value: "Option 5x" },
                        { label: "Option 6", value: "Option 6x" },
                        { label: "Option 7", value: "Option 7x" },
                        { label: "Option 8", value: "Option 8x" },
                        { label: "Option 9", value: "Option 9x" },
                        { label: "Option 10", value: "Option 10x" },
                        { label: "Option 11", value: "Option 11x" },
                        { label: "Option 12", value: "Option 12x" },
                        { label: "Option 13", value: "Option 13x" },
                        { label: "Option 14", value: "Option 14x" },
                        { label: "Option 15", value: "Option 15x" },
                        { label: "Option 16", value: "Option 16x" },
                        { label: "Option 17", value: "Option 17x" },
                        { label: "Option 18", value: "Option 18x" },
                        { label: "Option 19", value: "Option 19x" },
                        { label: "Option 20", value: "Option 20x" },
                    ]} 
                    onValueChange={(newValue) => setSelectedValue(newValue)}
                />
                <Checkbox 
                    value={checked}
                    onValueChange={(value) => setChecked(value)}
                    editable={false}
                />
                
                <TextArea label="TextArea Label" editable={false} />
                <Flex direction="column" justifyContent="center" alignItems="center" rowGap={12}>
                    <Text>Text 1</Text>
                    <Text>Text 2</Text>
                </Flex>
                <MediaRender media={media} icon="hospital-building" />
                <Slider showNavigation={true}>
                    <Text style={{ fontSize: 48 }}>Slide 1</Text>
                    <Text style={{ fontSize: 48 }}>Slide 2</Text>
                    <Text style={{ fontSize: 48 }}>Slide 3</Text>
                </Slider>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
                    <FlatButton type='primary' onPress={handlePrevious} ghost icon="chevron-left">
                        Anterior
                    </FlatButton>
                    <FlatButton type='primary' onPress={handleNext} ghost icon="chevron-right">
                        Próximo
                    </FlatButton>
                </View>
            </Layout>
        </ScrollView>
    );
}

export default Home;