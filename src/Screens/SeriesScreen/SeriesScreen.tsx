import * as React from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { RootNavigationProps } from "../../navigation/types/RootStackTypes";
import { useTheme } from "../../Styles/Styles";
import { useAppDispatch } from "../../redux/hooks";
import { FC, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { BoldText, Containter, SearchComponent } from "../../components";
import { FilterIcon } from "../../components/SVGcomponents/FilterIcon";
import { ArrowsIcon } from "../../components/SVGcomponents/ArrowsIcon";
import { ArrowDownIcon } from "../../components/SVGcomponents/ArrowDownIcon";
import ContentLoader from "react-content-loader";
import { Rect } from "react-native-svg";
import { LayoutVideoItem } from "../../components/LayoutVideoItem";
import { getSeries } from '../../redux/thunks/screens/getSeries/GetSeries';

interface Props {
    id: number
    name: string
    rating: number
}

export const SeriesScreen: FC<RootNavigationProps<'Series'>> = ({ navigation }) => {
    const screenWidth = useWindowDimensions().width;
    const { colors } = useTheme();
    const dispatch = useAppDispatch();
    const length = Math.ceil((screenWidth - 30) / (140 + 10));
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    //mock data
    const series: Props[] = [
        { id: 1, name: 'series1', rating: 5.5 },
        { id: 2, name: 'series2', rating: 7.8 },
    ]
    const update = React.useCallback(async () => {
        setIsLoading(true);
        await dispatch(getSeries({search: search}));
        setIsLoading(false);
      }, [dispatch, search]);

      React.useEffect(() => {
        (async () => {
          await update();
        })();
      }, [update]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: colors.bgSecondary }}
            keyboardShouldPersistTaps={'always'}
            refreshControl={
                <RefreshControl
                    colors={[colors.colorMain]}
                    tintColor={colors.colorMain}
                    refreshing={isLoading}
                    onRefresh={async () => {
                        try {
                            setIsLoading(true);
                           // await getSeriesRequest();
                        } catch (e) {
                            console.log(e);
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                />
            }>
            <SearchComponent
                style={styles.search}
                value={search}
                containerStyle={{ backgroundColor: colors.fillPrimary }}
                onChangeText={setSearch}
                placeholder={'Поиск по названию'}
            />
            <Containter>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                        <View style={styles.btn}>
                            <FilterIcon color={colors.colorMain} />
                            <BoldText fontSize={16}>Фильтры</BoldText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.btn}>
                            <ArrowsIcon color={colors.colorMain} />
                            <BoldText fontSize={16}>По просмотру</BoldText>
                            <ArrowDownIcon color={colors.colorMain} />
                        </View>
                    </TouchableOpacity>
                </View>
            </Containter>
            <ScrollView>
                    {series.length &&
                        <FlatList
                            data={series}
                            style={styles.items}
                            contentContainerStyle={styles.itemContainer}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => navigation.navigate('AllSeries', {
                                    id: item.id,
                                    title: item.name
                                })}>
                                    <LayoutVideoItem item={item} height={162} heightImage={110}/>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                isLoading
                                    ? <ContentLoader
                                        width={screenWidth.toString()}
                                        height={'114'}
                                        backgroundColor={colors.skeletonBg}
                                        foregroundColor={colors.skeletonFg}>
                                        {Array(Math.ceil(90 * length))
                                            .fill(0)
                                            .map((item, index) => (
                                                <>
                                                    <Rect
                                                        key={index.toString() + 'image_artist'}
                                                        width={'80'}
                                                        height={'80'}
                                                        x={(90 * index).toString()}
                                                        y="0"
                                                        rx={'40'}
                                                        ry={'40'}
                                                    />
                                                    <Rect
                                                        key={index.toString() + 'text_artist'}
                                                        width={'80'}
                                                        height={'24'}
                                                        x={(90 * index).toString()}
                                                        y="90"
                                                        rx="8"
                                                        ry="8"
                                                    />
                                                </>
                                            ))}
                                    </ContentLoader>
                                    : <BoldText>Не найдено</BoldText>}
                        />
                    }
                </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    search: {
        marginTop: 15,
        marginHorizontal: 15,
    },
    items: {
        flex: 1,
        marginBottom: 20,
    },
    itemContainer: {
        paddingHorizontal: 15,
        gap: 15,
    }
});
