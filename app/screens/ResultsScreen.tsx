import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Container,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {GeoPosition} from 'react-native-geolocation-service';
import {Panda} from '../Panda';
import data from '../pandas.json';

const ResultsScreen = () => {
  // @ts-ignore
  const {params: routeParams} = useRoute<{position: GeoPosition}>();
  const navigation = useNavigation();
  const {
    position: {
      coords: {latitude, longitude},
    },
  } = routeParams;

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
    <Container padding={4} style={{width: '100%', flex: 1}}>
      <Text fontSize="lg">Les pandas autour de vous :</Text>
      <Text>Latitude : {latitude}</Text>
      <Text>Latitude : {longitude}</Text>
      {/* <Content padder>
        <View style={{margin: 10}}>
          <Text style={styles.coord} note></Text>
          <Text style={styles.coord} note>
            Longitude : {longitude}
          </Text>
        </View>
      </Content> */}
      <FlatList data={data as Panda[]} renderItem={renderItem} width="100%" />
    </Container>
  );
};

export default ResultsScreen;

// export default class ResultsScreen extends Component {
//   handlePress = item => {
//     this.props.navigation.navigate('Details', {item});
//   };

//   renderItem = ({item}) => {
//     return (
//       <ListItem key={item.key} onPress={() => this.handlePress(item)}>
//         <Body>
//           <Text>{item.name}</Text>
//           <Text note>{item.distance}</Text>
//         </Body>
//         <Right>
//           <Icon name="arrow-forward" />
//         </Right>
//       </ListItem>
//     );
//   };

//   render() {
//     const {latitude, longitude} = this.props.navigation.state.params;
//     return (
//       <Container>
//         <Content padder>
//           <View style={{margin: 10}}>
//             <Text>Les pandas autour de vous :</Text>
//             <Text style={styles.coord} note>
//               Latitude : {latitude}
//             </Text>
//             <Text style={styles.coord} note>
//               Longitude : {longitude}
//             </Text>
//           </View>
//           <FlatList data={data} renderItem={this.renderItem} />
//         </Content>
//       </Container>
//     );
//   }
// }
