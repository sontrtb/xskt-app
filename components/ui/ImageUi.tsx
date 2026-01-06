import useTheme from "@/hooks/useColor";
import { Image, ImageProps } from "expo-image";

function ImageUi(props: ImageProps) {
    const color = useTheme()
    return <Image
        {...props}
        style={[
            {backgroundColor: color.bgImage},
            props.style
        ]}
    />
}

export default ImageUi