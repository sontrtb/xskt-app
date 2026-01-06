import { TextProps } from "react-native";
import TextUi from "./TextUi";

function TitleUi(props: TextProps) {
    return (
        <TextUi
            {...props}
            style={[
                {
                    fontSize: 18,
                    fontWeight: "500",
                },
                props.style
            ]}
        />
    )
}

export default TitleUi