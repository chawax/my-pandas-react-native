import axios from 'axios';
import {useQuery} from 'react-query';
import {Panda} from '../Panda';

type UsePandasParams = {
  longitude: number;
  latitude: number;
};

export const usePandas = ({longitude, latitude}: UsePandasParams) => {
  return useQuery<Panda[]>('pandas', () =>
    axios
      .get(
        `http://localhost:3004/pandas?latitude=${latitude}&longitude=${longitude}`,
      )
      .then(res => res.data),
  );
};
