import {useRoute} from '@react-navigation/core';
import {Flex, Spinner} from 'native-base';
import React from 'react';
import ErrorWithRetry from '../components/ErrorWithRetry';
import {usePanda} from '../hooks/usePanda';
import PandaDetails from './components/PandaDetails';

const DetailsScreen = () => {
  const {
    params: {id},
  } = useRoute();
  const {data, isLoading, isError, isSuccess, refetch} = usePanda({id});
  return (
    <Flex padding={4}>
      {isLoading && <Spinner />}
      {isSuccess && data && <PandaDetails data={data} />}
      {isError && <ErrorWithRetry onRetry={refetch} />}
    </Flex>
  );
};

export default DetailsScreen;
