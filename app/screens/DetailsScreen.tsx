import {useRoute} from '@react-navigation/core';
import {Badge, Box, Flex, HStack, Image, Text} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {usePanda} from '../hooks/usePanda';

const DetailsScreen = () => {
  const {
    params: {id},
  } = useRoute();
  const {data} = usePanda({id});
  const {width: screenWidth} = useWindowDimensions();
  return (
    <Flex padding={4}>
      {data && (
        <>
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              {data.name}
            </Text>
            <Text fontSize="sm" marginTop={4}>
              Se trouve à {data.distance} de vous
            </Text>
          </Box>
          <Box marginTop={4}>
            <Image
              resizeMode="contain"
              source={{
                uri: data.image,
              }}
              alt={data.name}
              width={screenWidth - 10}
              height={200}
            />
          </Box>
          {data.interests && (
            <HStack
              marginTop={4}
              alignItems="flex-start"
              space={{
                base: 2,
                md: 4,
              }}
              mx={{
                base: 'auto',
                md: 0,
              }}>
              {data.interests.map((interest, index) => (
                <Badge key={index} colorScheme="dark">
                  {interest}
                </Badge>
              ))}
            </HStack>
          )}
        </>
      )}
    </Flex>
  );
};

export default DetailsScreen;
