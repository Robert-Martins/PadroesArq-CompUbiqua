import { PaginatedListProps } from '@/core/vo/types/components.props';
import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';

const PaginatedList = forwardRef<FlatList<any>, PaginatedListProps<any>>((props, ref) => {
    const { page, onFetchNextPage, children } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const handleFetchNextPage = useCallback(async () => {
        if (page.last || isLoading) return;
        setIsLoading(true);
        try {
            const nextPageData = await onFetchNextPage();
            setData((prevData) => [...prevData, ...nextPageData]);
        } catch (error) {
            console.error('Error fetching next page:', error);
        } finally {
            setIsLoading(false);
        }
    }, [page.last, isLoading, onFetchNextPage]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const initialData = await onFetchNextPage();
                setData(initialData);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [onFetchNextPage]);

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