import axios from 'axios';
import {useQuery} from 'react-query';
import {Panda} from '../Panda';

type UsePandaParams = {
  id: string;
};

export const usePanda = ({id}: UsePandaParams) => {
  return useQuery<Panda>(['pandas', id], () =>
    axios.get(`http://localhost:3004/pandas/${id}`).then(res => res.data),
  );
};
