import { PaginatedListProps } from '@/core/vo/types/components.props';
import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';

const PaginatedList = forwardRef<FlatList<any>, PaginatedListProps<any>>((props, ref) => {
    const { onFetchNextPage, children } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState<Page<any>>({ number: 0, size: 10, last: false });

    const handleFetchNextPage = useCallback(async () => {
        if (page.last || isLoading) return;
        setIsLoading(true);
        try {
            const nextPageData = await onFetchNextPage(page.number + 1, page.size);
            setData((prevData) => [...prevData, ...nextPageData.content]);
            setPage(nextPageData);
        } catch (error) {
            console.error('Error fetching next page:', error);
        } finally {
            setIsLoading(false);
        }
    }, [page, isLoading, onFetchNextPage]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const initialData = await onFetchNextPage(0, page.size);
            setData(initialData.content);
            setPage(initialData);
            setIsLoading(false);
        })();
    }, [onFetchNextPage, page.size]);

    const renderFooter = () => (
        isLoading 
            ? (
                <View style={styles.footer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) 
            : null
    );

    return (
        <FlatList
            ref={ref}
            data={data}
            renderItem={({ item }) => children(item)}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleFetchNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
        />
    );
});

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PaginatedList;