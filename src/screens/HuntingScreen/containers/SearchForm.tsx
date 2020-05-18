import React, { useState, useCallback } from 'react';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { actions } from '../state';

const TextFieldStyled = styled(TextField)`
  && {
    background-color: white;
  }
`;

const SearchForm = React.memo(() => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handelSubmit = useCallback(
    (event) => {
      event.preventDefault();
      searchText && dispatch(actions.searchForPokemon.request(searchText));
    },
    [dispatch, searchText]
  );

  return (
    <form onSubmit={handelSubmit} autoComplete="off">
      <TextFieldStyled
        label="Name or Number"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
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
              <IconButton type="submit" aria-label="Search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        inputProps={{
          'data-testid': 'input-search'
        }}
      />
    </form>
  );
});

export default SearchForm;
