import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import lodashMap from 'lodash.map';

import PokeAbilitiesItem from './PokeAbilitiesItem';
import withCurrentId from '../../components/withCurrentID';
import { actions, selectors } from 'store/ducks/pokemons';

const PokeAbilities = React.memo(function PokeAbilities({ pokemonId }) {
  const [expandedId, setExpandedId] = useState(0);
  const abilities = lodashMap(
    useSelector(
      (state) => selectors.getPokemonById(state, pokemonId).abilitiesById
    )
  );
  const dispatch = useDispatch();

  const handleToggleDetail = (ability) => (_event, expanded) => {
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
        {abilities.map((ability) => (
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

PokeAbilities.propTypes = {
  pokemonId: PropTypes.number.isRequired
};

export default withCurrentId(PokeAbilities);
