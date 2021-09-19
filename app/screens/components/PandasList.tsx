import {Avatar, Box, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {FlatList, Pressable} from 'react-native';
import {Panda} from '../../Panda';

type PandasListProps = {
  data: Panda[];
  longitude: number;
  latitude: number;
  onPress: (item: Panda) => void;
};

const ListHeader = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => (
  <Box>
    <Text fontSize="lg" fontWeight="bold">
      Les pandas autour de votre position :
    </Text>
    <Text marginLeft={4}>Latitude : {latitude}</Text>
    <Text marginLeft={4}>Longitude : {longitude}</Text>
  </Box>
);

const PandasList = ({data, latitude, longitude, onPress}: PandasListProps) => {
  const renderItem = ({item}: {item: Panda}) => {
    return (
      <Pressable key={item.id} onPress={() => onPress(item)}>
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
    <FlatList
      data={data as Panda[]}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <ListHeader latitude={latitude} longitude={longitude} />
      )}
    />
  );
};

export default PandasList;
