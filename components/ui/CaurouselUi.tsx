import { useEffect, useRef, useState } from 'react';
import { ViewProps } from 'react-native';
import PagerView from 'react-native-pager-view';

interface CaurouselUiProps extends ViewProps {
    length: number
    initialPage?: number
}

function CaurouselUi(props: CaurouselUiProps) {
    const { length, initialPage } = props

    const pagerRef = useRef<PagerView>(null);
    const [page, setPage] = useState(initialPage || 0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPage((currentPage) => {
                const nextPage = (currentPage + 1) % length;
                pagerRef.current?.setPage(nextPage);
                return nextPage;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [length]);

    return <PagerView 
        {...props} 
        initialPage={initialPage || 0} 
        ref={pagerRef}
        onPageSelected={(e) => setPage(e.nativeEvent.position)} 
    />
}

export default CaurouselUi