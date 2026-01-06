import useColor from "@/hooks/useColor";
import useI18n from "@/lang/i18n";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type FontWeight =
  | "thin"
  | "extraLight"
  | "light"
  | "regular"
  | "medium"
  | "semiBold"
  | "bold"
  | "extraBold"
  | "black";

const fontMap: Record<FontWeight, string> = {
  thin: "LexendDeca-Thin",
  extraLight: "LexendDeca-ExtraLight",
  light: "LexendDeca-Light",
  regular: "LexendDeca-Regular",
  medium: "LexendDeca-Medium",
  semiBold: "LexendDeca-SemiBold",
  bold: "LexendDeca-Bold",
  extraBold: "LexendDeca-ExtraBold",
  black: "LexendDeca-Black",
};


interface TextUiProps extends TextProps {
    textLang?: string;
    weight?: FontWeight;
    isScale?: boolean;
}

type RNFontWeight =
 "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "ultralight" | "thin" | "light" | "medium" | "regular" | "semibold" | "condensedBold" | "condensed" | "heavy" | "black" | undefined

function mapFontWeight(fontWeight?: RNFontWeight): FontWeight {
  switch (fontWeight) {
    case "100":
      return "thin";
    case "200":
      return "extraLight";
    case "300":
      return "light";
    case "400":
    case "normal":
      return "regular";
    case "500":
      return "medium";
    case "600":
      return "semiBold";
    case "700":
    case "bold":
      return "bold";
    case "800":
      return "extraBold";
    case "900":
      return "black";
    default:
      return "regular";
  }
}


function TextUi({
  weight,
  style,
  ...props
}: TextUiProps) {
  const color = useColor();
  const i18n = useI18n();

  const flatStyle = StyleSheet.flatten(style) as TextStyle | undefined;

  const finalWeight: FontWeight =
    weight ?? mapFontWeight(flatStyle?.fontWeight);

  function hasTranslation(key: string) {
    const keys = key.split(".");
    let obj = i18n.translations[i18n.locale];

    for (const k of keys) {
      if (!obj || !Object.prototype.hasOwnProperty.call(obj, k)) {
        return false;
      }
      obj = obj[k];
    }
    return true;
  }

  return (
    <Text
      {...props}
      style={[
        {
          color: color.text,
          fontFamily: fontMap[finalWeight],
          fontWeight: undefined,
        },
        style,
      ]}
    >
      {props.textLang
        ? hasTranslation(props.textLang)
          ? i18n.t(props.textLang)
          : props.textLang
        : props.children}
    </Text>
  );
}


export default TextUi;