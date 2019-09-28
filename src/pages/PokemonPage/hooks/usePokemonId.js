import { useParams } from 'react-router-dom';

function usePokemonId() {
  let { id } = useParams();

  return parseInt(id);
}

export default usePokemonId;
