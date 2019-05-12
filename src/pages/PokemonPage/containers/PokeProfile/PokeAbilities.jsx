import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';

import PokeAbilitiesItem from './PokeAbilitiesItem';

class PokeAbilities extends PureComponent {
  state = { expandedId: 0 };

  handleToggleDetail = (id) => (event, expanded) => {
    this.setState({
      expandedId: expanded ? id : 0
    });
  };

  render() {
    const { expandedId } = this.state;

    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={8}>
          <PokeAbilitiesItem
            name="solar-power"
            short_effect=""
            expanded={expandedId === 64}
            onToggle={this.handleToggleDetail(64)}
          />
          <PokeAbilitiesItem
            name="blaze"
            short_effect="Increases Special Attack to 1.5× but costs 1/8 max HP after each turn during strong sunlight."
            expanded={expandedId === 65}
            onToggle={this.handleToggleDetail(65)}
          />
        </Grid>
      </Grid>
    );
  }
}

export default PokeAbilities;
