export type ASTheme = {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
    };
    fonts: {
        thin: string;
        thinItalic: string;
        light: string;
        lightItalic: string;
        regular: string;
        regularItalic: string;
        medium: string;
        mediumItalic: string;
        semiBold: string;
        semiBoldItalic: string;
        bold: string;
        boldItalic: string;
    };
    fontSizes: {
        small: number;
        medium: number;
        large: number;
    };
}

const asCommonTheme: Partial<ASTheme> = {
    fonts: {
        thin: "Inter-Thin",
        thinItalic: "Inter-ThinItalic",
        light: "Inter-Light",
        lightItalic: "Inter-LightItalic",
        regular: "Inter-Regular",
        regularItalic: "Inter-Italic",
        medium: "Inter-Medium",
        mediumItalic: "Inter-MediumItalic",
        semiBold: "Inter-SemiBold",
        semiBoldItalic: "Inter-SemiBoldItalic",
        bold: "Inter-Bold",
        boldItalic: "Inter-BoldItalic",
    },
    fontSizes: {
        small: 12,
        medium: 16,
        large: 20,
    }
};

export const asLightTheme: ASTheme = {
    colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        background: "#F8F9FA",
        text: "#212529",
    },
    ...asCommonTheme as Required<ASTheme>
};

export const asDarkTheme: ASTheme = {
    colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        background: "#212529",
        text: "#F8F9FA",
    },
    ...asCommonTheme as Required<ASTheme>
};