import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, CardHeader } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import withCurrentID from '../../components/withCurrentID';

const CardHeaderStyled = styled(CardHeader)`
  && {
    padding-bottom: 0px;
  }
`;

function HeaderInfo({ pokemonId, name }) {
  return (
    <CardHeaderStyled
      action={
        <IconButton aria-label="Catch">
          <AddCircleIcon />
        </IconButton>
      }
      title={name}
      subheader={`#${pokemonId}`}
    />
  );
}

HeaderInfo.propTypes = {
  pokemonId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

const mapStateToProps = ({ pokemons }, { pokemonId }) => ({
  pokemonId,
  name: pokemons.byId[pokemonId].name
});

export default compose(
  withCurrentID,
  connect(mapStateToProps)
)(HeaderInfo);
