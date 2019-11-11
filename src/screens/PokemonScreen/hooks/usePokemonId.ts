import { useParams } from 'react-router-dom';

function usePokemonId() {
  let { id }: any = useParams();

  return parseInt(id);
}

export default usePokemonId;
