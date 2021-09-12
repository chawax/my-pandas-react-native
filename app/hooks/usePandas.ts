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
        `https://fierce-gorge-64433.herokuapp.com/pandas?latitude=${latitude}&longitude=${longitude}`,
      )
      .then(res => res.data),
  );
};
