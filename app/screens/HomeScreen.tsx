import {useNavigation} from '@react-navigation/native';
import {Button, Center, Flex, Image, VStack} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import getLocation from '../services/geolocation';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGetLocation = async () => {
    try {
      const position = await getLocation();
      navigation.navigate('Results', {position});
    } catch {
      (e: Error) => {
        console.log(e);
      };
    }
  };

  const {height: screenHeight, width: screenWidth} = useWindowDimensions();

  return (
    <Flex padding={4}>
      <VStack paddingTop={4}>
        <Center>
          <Button colorScheme="primary" onPress={handleGetLocation} marginY={4}>
            Rechercher les pandas autour de moi
          </Button>
          <Image
            resizeMode="contain"
            source={{
              uri: 'https://media.giphy.com/media/wT71Ce9oKBQGc/giphy.gif',
            }}
            alt="My pandas"
            width={screenWidth - 20}
            height={screenHeight / 2}
          />
        </Center>
      </VStack>
    </Flex>
  );
};

export default HomeScreen;
