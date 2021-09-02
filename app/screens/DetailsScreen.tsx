import {useRoute} from '@react-navigation/core';
import {Badge, Box, Container, Text, Image} from 'native-base';
import React from 'react';
import {Panda} from '../Panda';
import data from '../pandas.json';

const DetailsScreen = () => {
  const {
    params: {id},
  } = useRoute();
  const panda: Panda | undefined = data.find(item => item.key === id);
  return (
    <Container>
      <Box width="100%">
        {panda ? (
          <>
            <Box>
              <Text fontSize="lg">{panda.name}</Text>
              <Text fontSize="sm">À {panda.distance} de vous</Text>
            </Box>
            <Box>
              <Image
                alt={panda.name}
                source={{
                  uri: panda.image,
                }}
                width={null}
                height={200}
                flex={1}
              />
            </Box>
            {panda.interests && (
              <Box>
                {panda.interests.map((interest, index) => (
                  <Badge colorScheme="primary" key={index} marginRight={5}>
                    <Text>{interest}</Text>
                  </Badge>
                ))}
              </Box>
            )}
          </>
        ) : (
          <Text>Panda introuvable</Text>
        )}
      </Box>
    </Container>
  );
};

export default DetailsScreen;
