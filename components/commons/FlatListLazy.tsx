import { IDataResponse, IPage } from "@/api/api";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import ActivityIndicatorUi from "../ui/ActivityIndicatorUi";
import EmptyUi from "../ui/EmptyUi";

const PAGE_SIZE = 20;

interface FlatListLazyProps<T> {
    renderItem: ListRenderItem<T>,
    queryKey: string[];
    queryFn: (param: IPage) => Promise<IDataResponse<T[]>>;
    keyExtractor: ((item: T, index: number) => string)
}

export interface FlatListLazyRef {
    refreshClearPage: () => void;
}

function FlatListLazyInner<T>(props: FlatListLazyProps<T>, ref: React.Ref<FlatListLazyRef>) {
    const {renderItem, queryKey, keyExtractor, queryFn} = props

    const color = useColor()

    const {
        refetch,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        data,
        isLoading
    } = useInfiniteQuery({
        initialPageParam: { page: 0, size: PAGE_SIZE },
        queryFn: ({ pageParam }) => queryFn(pageParam),
        queryKey: queryKey,
        enabled: true,
        getNextPageParam: (lastPage) => {
            const lastPageParam = lastPage.extra?.page
            if (lastPageParam && (lastPageParam.totalPages > (lastPageParam.number + 1))) {
                return {
                    page: lastPageParam.number + 1,
                    size: PAGE_SIZE
                }
            }
        }
    })

    const listRepairServiceHistory = data?.pages.map(p => p.data).flat()

    const queryClient = useQueryClient();
    const refreshClearPage = useCallback(() => {
        queryClient.removeQueries({
            queryKey: queryKey,
        });
        refetch()
    }, [queryClient, queryKey, refetch]);

    useImperativeHandle(ref, () => ({
        refreshClearPage
    }), [refreshClearPage]);

    const onNextPage = () => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    }

    if(isLoading) {
        return <ActivityIndicatorUi />
    }

    return (
        <View style={[styles.root, {backgroundColor: color.bg}]}>
            <FlatList
                contentContainerStyle={{ padding: PADDING_PAGE, paddingBottom: 100 }}
                data={listRepairServiceHistory}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={refreshClearPage}
                ListFooterComponent={() => isFetchingNextPage && <ActivityIndicator />}
                onEndReached={onNextPage}
                onEndReachedThreshold={0.2}
                ListEmptyComponent={EmptyUi}
            />
        </View>
    )
}

const FlatListLazy = forwardRef(FlatListLazyInner) as <T>(
    props: FlatListLazyProps<T> & { ref?: React.Ref<FlatListLazyRef> }
) => ReturnType<typeof FlatListLazyInner>;

export default FlatListLazy

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
})