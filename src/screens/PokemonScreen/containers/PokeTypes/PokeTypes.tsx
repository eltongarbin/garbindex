import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { isEmpty, map as lodashMap } from 'lodash-es';

import usePokemonId from '../../hooks/usePokemonId';
import Segregator from '../../components/Segregator';
import PokeTypesItem from './PokeTypesItem';
import { actions, selectors } from 'store/ducks/pokemons';

const GridContent = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

const PokeTypes = React.memo(function PokeTypes() {
  const pokemonId = usePokemonId();
  const [expandedId, setExpandedId] = useState(0);
  const types = lodashMap(
    useSelector((state) => selectors.getPokemonById(state, pokemonId).typesById)
  );
  const dispatch = useDispatch();

  const handleToggleDetail = (type) => (_event, expanded) => {
    if (expanded && isEmpty(type.pokemons)) {
      dispatch(
        actions.fetchPokemonsByTypeId.request({ pokemonId, typeId: type.id })
      );
    }

    setExpandedId(expanded ? type.id : 0);
  };

  return (
    <GridContent container spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Segregator title="Types" />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
          {types.map((type) => (
            <PokeTypesItem
              key={type.id}
              name={type.name}
              expanded={expandedId === type.id}
              pokemons={type.pokemons}
              onToggle={handleToggleDetail(type)}
            />
          ))}
        </Grid>
      </Grid>
    </GridContent>
  );
});

export default PokeTypes;
