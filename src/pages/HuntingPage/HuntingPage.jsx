import React, { PureComponent } from 'react';
import { InputAdornment, IconButton, Grid } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import { withPageLayout } from 'components/PageLayout';
import PokeCard from 'components/PokeCard';
import { TextFieldStyled, GridResultStyled } from './HuntingPageStyled';

class HuntingPage extends PureComponent {
  state = { searchText: '' };

  handleSeeMoreClick = (id) => () => {
    const { history } = this.props;
    history.push(`/pokemons/${id}`);
  };

  handleDeleteClick = (id) => () => {
    alert(`Delete ${id}`);
  };

  handleInputSeachChange = (event) => {
    this.setState({ searchText: event.currentTarget.value });
  };

  handelSubmit = (event) => {
    event.preventDefault();
    console.log('submitted');
  };

  render() {
    const { searchText } = this.state;

    return (
      <div>
        <form onSubmit={this.handelSubmit} autoComplete="off">
          <TextFieldStyled
            label="Name or Number"
            value={searchText}
            onChange={this.handleInputSeachChange}
            margin="normal"
            variant="outlined"
            type="text"
            fullWidth
            required
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
        <GridResultStyled container spacing={0}>
          <Grid item xs={6} md={4}>
            <PokeCard
              id={6}
              name="charizard"
              imageURL="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
              onSeeMoreClick={this.handleSeeMoreClick(6)}
              onDeleteClick={this.handleDeleteClick(6)}
            />
          </Grid>
        </GridResultStyled>
      </div>
    );
  }
}

export default withPageLayout({
  title: 'Search Pokémons',
  backTo: '/pokemons'
})(HuntingPage);
