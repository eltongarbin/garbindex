/* eslint-disable react/forbid-foreign-prop-types */
import checkPropTypes from 'check-prop-types';

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );

  expect(propError).toBeUndefined();
};
