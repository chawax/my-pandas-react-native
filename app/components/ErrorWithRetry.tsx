import {Button, Text, VStack} from 'native-base';
import React from 'react';

type ErrorWithRetryProps = {
  onRetry: () => void;
};

const ErrorWithRetry = ({onRetry}: ErrorWithRetryProps) => {
  return (
    <VStack space={2} alignItems="center">
      <Text fontSize="xl" fontWeight="bold">
        Oups !
      </Text>
      <Text fontSize="md">On dirait qu'il y a eu un problème !</Text>
      <Button colorScheme="error" onPress={onRetry}>
        Réessayer
      </Button>
    </VStack>
  );
};

export default ErrorWithRetry;
