import axios from 'axios';
import {useQuery} from 'react-query';
import {Panda} from '../Panda';

type UsePandaParams = {
  id: string;
};

export const usePanda = ({id}: UsePandaParams) => {
  return useQuery<Panda>(['pandas', id], () =>
    axios
      .get(`https://fierce-gorge-64433.herokuapp.com/pandas/${id}`)
      .then(res => res.data),
  );
};
