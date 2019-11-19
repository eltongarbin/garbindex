import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import usePokemonId from '../../hooks/usePokemonId';
import PokeAbilitiesItem from './PokeAbilitiesItem';
import { actions, selectors, types } from 'store/ducks/pokemons';
import { map } from 'lodash-es';

const PokeAbilities = React.memo(() => {
  const pokemonId = usePokemonId();
  const [expandedId, setExpandedId] = useState(0);
  const { abilitiesById } = useSelector(selectors.getPokemonById(pokemonId));
  const dispatch = useDispatch();

  const handleToggleDetail = (ability: types.PokemonAbility) => (
    _event: React.ChangeEvent<{}>,
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
        {map(abilitiesById).map((ability) => (
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
