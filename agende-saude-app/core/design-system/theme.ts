export type ASTheme = {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        buttons: {
            primary: {
                background: string;
                text: string;
            };
            secondary: {
                background: string;
                text: string;
            };
            tertiary: {
                background: string;
                text: string;
            };
        }
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
        xxxs: number;
        xxs: number;
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
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
        xxxs: 12,
        xxs: 14,
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 36,
        xxl: 48
    }
};

export const asLightTheme: ASTheme = {
    colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        background: "red",
        text: "#212529",
        buttons: {
            primary: {
                background: "#007BFF",
                text: "#F8F9FA",
            },
            secondary: {
                background: "#6C757D",
                text: "#F8F9FA",
            },
            tertiary: {
                background: "#6C757D",
                text: "#F8F9FA",
            },
        }
    },
    ...asCommonTheme as Required<ASTheme>
};

export const asDarkTheme: ASTheme = {
    colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        background: "blue",
        text: "#F8F9FA",
        buttons: {
            primary: {
                background: "#007BFF",
                text: "#F8F9FA",
            },
            secondary: {
                background: "#6C757D",
                text: "#F8F9FA",
            },
            tertiary: {
                background: "#6C757D",
                text: "#F8F9FA",
            },
        }
    },
    ...asCommonTheme as Required<ASTheme>
};