import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { map as lodashMap } from 'lodash-es';

import usePokemonId from '../../hooks/usePokemonId';
import PokeAbilitiesItem from './PokeAbilitiesItem';
import { actions, selectors } from 'store/ducks/pokemons';

const PokeAbilities = React.memo(function PokeAbilities() {
  const pokemonId = usePokemonId();
  const [expandedId, setExpandedId] = useState(0);
  const abilities = lodashMap(
    useSelector(
      (state: any) => selectors.getPokemonById(state, pokemonId).abilitiesById
    )
  );
  const dispatch = useDispatch();

  const handleToggleDetail = (ability: any) => (
    _event: any,
    expanded: boolean
  ) => {
    if (expanded && !ability.short_effect) {
      dispatch(
        actions.fetchShortEffectByAbilityId.request({
          pokemonId,
          abilityId: ability.id
        })
      );
    }

    setExpandedId(expanded ? ability.id : 0);
  };

  return (
    <Grid item xs={12}>
      <Grid container justify="center" spacing={1}>
        {abilities.map((ability: any) => (
          <PokeAbilitiesItem
            key={ability.id}
            name={ability.name}
            short_effect={ability.short_effect}
            expanded={expandedId === ability.id}
            onToggle={handleToggleDetail(ability)}
          />
        ))}
      </Grid>
    </Grid>
  );
});

export default PokeAbilities;