import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { actions } from '../state';

const TextFieldStyled = styled(TextField)`
  && {
    background-color: white;
  }
`;

class SearchForm extends PureComponent {
  state = { searchText: '' };

  handleInputSeachChange = (event) => {
    this.setState({ searchText: event.currentTarget.value.toLowerCase() });
  };

  handelSubmit = (event) => {
    event.preventDefault();
    this.props.searchForPokemon(this.state.searchText);
  };

  render() {
    const { searchText } = this.state;

    return (
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
                <IconButton
                  type="submit"
                  aria-label="Toggle password visibility"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  searchForPokemon: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  searchForPokemon: actions.searchForPokemon.request
};

export default connect(
  null,
  mapDispatchToProps
)(SearchForm);
