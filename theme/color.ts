export interface IColor {
    primary: string;
    shadow: string;
    text: string;
    textNeutral: string;
    bgCard: string;
    bgImage: string;
    bottomTab: string;
    borderColor: string;
    disable: string;
    bg: string;
}

const colors: IColor = {
    primary: "#ed0231",

    bg: "#F6F6F6",

    shadow: "rgba(0,0,0,0.15)",
    text: "#2B2B2B",

    textNeutral: "#8f8f8f",

    bgCard: "#FFFFFF",
    bgImage: "#f8e9e9ff",

    bottomTab: "#FFFFFF",

    borderColor: "#D8D8D8",
    disable: "#CFCFCF"
};


const darkColors: IColor = {
    primary: "#ed0231",

    bg: "#0F0F0F",

    shadow: "rgba(0,0,0,0.65)",

    text: "#ECECEC",
    textNeutral: "#A9A9A9",

    bgCard: "#181818",
    bgImage: "#2A2A2A",

    bottomTab: "#141414",

    borderColor: "#2E2E2E",
    disable: "#3D3D3D"
};


export {
    colors,
    darkColors
};

