import {useNavigation, useRoute} from '@react-navigation/native';
import {Flex, Spinner} from 'native-base';
import React from 'react';
import {GeoPosition} from 'react-native-geolocation-service';
import ErrorWithRetry from '../components/ErrorWithRetry';
import {usePandas} from '../hooks/usePandas';
import {Panda} from '../Panda';
import PandasList from './components/PandasList';

const ResultsScreen = () => {
  // @ts-ignore
  const {params: routeParams} = useRoute<{position: GeoPosition}>();
  const navigation = useNavigation();
  const {
    position: {
      coords: {latitude, longitude},
    },
  } = routeParams;

  const {isLoading, isSuccess, isError, refetch, data} = usePandas({
    latitude,
    longitude,
  });

  const handlePress = (item: Panda) => {
    navigation.navigate('Details', {id: item.id});
  };

  return (
    <Flex padding={4}>
      {isLoading && <Spinner />}
      {isSuccess && data && (
        <PandasList
          data={data as Panda[]}
          latitude={latitude}
          longitude={longitude}
          onPress={handlePress}
        />
      )}
      {isError && <ErrorWithRetry onRetry={refetch} />}
    </Flex>
  );
};

export default ResultsScreen;
