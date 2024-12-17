export type ASTheme = {
    spacing: {
        layout: number;
    },
    colors: {
        primary: string;
        secondary: string;
        background: string;
        divider: string;
        text: string;
        buttons: {
            primary: {
                background: string;
                ghost: string;
                text: string;
            };
            secondary: {
                background: string;
                ghost: string;
                text: string;
            };
            tertiary: {
                background: string;
                ghost: string;
                text: string;
            };
            disabled: {
                background: string;
                ghost: string;
                text: string;
            }
        }
    };
    border: {
        lg: number;
        md: number;
        sm: number;
    },
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
    spacing: {
        layout: 16,
    },
    border: {
        lg: 28,
        md: 12,
        sm: 1,
    },
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
    ...asCommonTheme as Required<ASTheme>,
    colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        background: "red",
        divider: "#E9ECEF",
        text: "#212529",
        buttons: {
            primary: {
                background: "#007BFF",
                ghost: "#dbedff",
                text: "#F8F9FA",
            },
            secondary: {
                background: "#36D128",
                ghost: "#d7fcd4",
                text: "#F8F9FA",
            },
            tertiary: {
                background: "#EB2D2D",
                ghost: "#ffa8a8",
                text: "#F8F9FA",
            },
            disabled: {
                background: "#9E9E9E",
                ghost: "#E8E8E8",
                text: "#F8F9FA",
            }
        }
    }
};

export const asDarkTheme: ASTheme = {
    ...asCommonTheme as Required<ASTheme>,
    colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        background: "blue",
        divider: "#FFF",
        text: "#F8F9FA",
        buttons: {
            primary: {
                background: "#007BFF",
                ghost: "#F8F9FA",
                text: "#F8F9FA",
            },
            secondary: {
                background: "#6C757D",
                ghost: "#F8F9FA",
                text: "#F8F9FA",
            },
            tertiary: {
                background: "#6C757D",
                ghost: "#F8F9FA",
                text: "#F8F9FA",
            },
            disabled: {
                background: "#6C757D",
                ghost: "#F8F9FA",
                text: "#F8F9FA",
            }
        }
    }
};