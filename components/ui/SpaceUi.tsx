import { View, ViewProps } from "react-native";

interface SpaceUiProps extends ViewProps {
    height?: number;
    width?: null;
}

function SpaceUi(props: SpaceUiProps) {
    const { height, width } = props;


    return (
        <View
            {...props}
            style={[
                {
                    height, width
                },
                props.style
            ]}
        />
    )
}

export default SpaceUi