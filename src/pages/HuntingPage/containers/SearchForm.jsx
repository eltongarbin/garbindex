import React, { PureComponent } from 'react';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import styled from 'styled-components';

export const TextFieldStyled = styled(TextField)`
  && {
    background-color: white;
  }
`;

class SearchForm extends PureComponent {
  state = { searchText: '' };

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
    );
  }
}

export default SearchForm;
