import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Flex,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {GeoPosition} from 'react-native-geolocation-service';
import {usePandas} from '../hooks/usePandas';
import {Panda} from '../Panda';

const ListHeader = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => (
  <Box>
    <Text fontSize="lg" fontWeight="bold">
      Les pandas autour de vous :
    </Text>
    <Text marginLeft={4}>Latitude : {latitude}</Text>
    <Text marginLeft={4}>Latitude : {longitude}</Text>
  </Box>
);

const ResultsScreen = () => {
  // @ts-ignore
  const {params: routeParams} = useRoute<{position: GeoPosition}>();
  const navigation = useNavigation();
  const {
    position: {
      coords: {latitude, longitude},
    },
  } = routeParams;

  const {data} = usePandas({latitude, longitude});

  const handlePress = (item: Panda) => {
    console.log(item);
    navigation.navigate('Details', {id: item.key});
  };

  const renderItem = ({item}: {item: Panda}) => {
    return (
      <Pressable key={item.key} onPress={() => handlePress(item)}>
        <Box
          bg="primary.600"
          py={4}
          px={3}
          my={2}
          shadow={2}
          rounded="lg"
          width="100%"
          alignSelf="center">
          <HStack justifyContent="space-between">
            <Box justifyContent="space-between">
              <VStack space={2}>
                <Text fontSize="lg" color="white" textTransform="uppercase">
                  {item.name}
                </Text>
                <Text color="white" fontSize="sm">
                  {item.distance}
                </Text>
              </VStack>
            </Box>
            <Avatar size="lg">{item.name.substring(0, 1)}</Avatar>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <Flex padding={4}>
      <FlatList
        data={data as Panda[]}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <ListHeader latitude={latitude} longitude={longitude} />
        )}
      />
    </Flex>
  );
};

export default ResultsScreen;
