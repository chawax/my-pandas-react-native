import {useRoute} from '@react-navigation/core';
import {Badge, Box, Container, Image, Text} from 'native-base';
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
    <Container padding={4}>
      <Box width="100%">
        {data && (
          <>
            <Box>
              <Text fontSize="lg">{data.name}</Text>
              <Text fontSize="sm">À {data.distance} de vous</Text>
            </Box>
            <Box>
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
              <Box>
                {data.interests.map((interest, index) => (
                  <Badge colorScheme="primary" key={index} marginRight={5}>
                    <Text>{interest}</Text>
                  </Badge>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default DetailsScreen;
