import useColor from '@/hooks/useColor';
import { PADDING_PAGE } from '@/theme/layout';
import { Dimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

const windowWidth = Dimensions.get('window').width;

interface RenderHtmlUiProps {
    htmlString?: string
}

function RenderHtmlUi(props: RenderHtmlUiProps) {
    const { htmlString } = props;

    const color = useColor()

    const source = {
        html: htmlString ?? ""
    };

    return (
        <RenderHTML
            contentWidth={windowWidth - PADDING_PAGE * 2}
            source={source}
            tagsStyles={{
                body: {
                    color: color.text
                },
            }}
        />
    )
}

export default RenderHtmlUi