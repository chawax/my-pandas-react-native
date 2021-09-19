import {Badge, Box, HStack, Image, Text} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Panda} from '../../Panda';

type PandaDetailsProps = {
  data: Panda;
};

const PandaDetails = ({data}: PandaDetailsProps) => {
  const {width: screenWidth} = useWindowDimensions();
  return (
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
  );
};

export default PandaDetails;
