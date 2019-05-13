import React from 'react';
import { withRouter } from 'react-router-dom';

function withCurrentId(WrappedComponent) {
  return withRouter((props) => {
    const newProps = {
      ...props,
      pokemonId: parseInt(props.match.params.id)
    };

    return <WrappedComponent {...newProps} />;
  });
}

export default withCurrentId;
