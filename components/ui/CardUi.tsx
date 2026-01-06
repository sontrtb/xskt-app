import useTheme from "@/hooks/useColor";
import { View, ViewProps } from "react-native";
import TitleUi from "./Title";

interface CardUiProps extends ViewProps {
    title?: string
}

function CardUi(props: CardUiProps) {
    const { title } = props;

    const color = useTheme()

    return (
        <View
            {...props}
            style={[
                {
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: color.bgCard,

                    shadowColor: color.shadow,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
                props.style
            ]}
        >
            {
                title && <TitleUi style={{ paddingBottom: 12}}>{title}</TitleUi>
            }
            {props.children}
        </View>
    )
}

export default CardUi