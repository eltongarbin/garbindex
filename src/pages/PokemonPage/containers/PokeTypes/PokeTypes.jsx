import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import Segregator from '../../components/Segregator';
import PokeTypesItem from './PokeTypesItem';

const GridContent = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

class PokeTypes extends PureComponent {
  state = { expandedId: 0 };

  handleToggleDetail = (id) => (event, expanded) => {
    this.setState({
      expandedId: expanded ? id : 0
    });
  };

  render() {
    const { expandedId } = this.state;

    return (
      <GridContent container spacing={8} alignItems="center">
        <Grid item xs={12}>
          <Segregator title="Types" />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={8}>
            <PokeTypesItem
              name="poison"
              expanded={expandedId === 64}
              pokemons={[
                { id: 1, name: 'bulbasaur' },
                { id: 2, name: 'ivysaur' },
                { id: 3, name: 'venusaur' }
              ]}
              onToggle={this.handleToggleDetail(64)}
            />
            <PokeTypesItem
              name="bug"
              expanded={expandedId === 65}
              pokemons={[]}
              onToggle={this.handleToggleDetail(65)}
            />
          </Grid>
        </Grid>
      </GridContent>
    );
  }
}

export default PokeTypes;
