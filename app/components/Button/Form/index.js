import React, { Children } from 'react';
import PropTypes from 'prop-types';

import StyledButton from './StyledButton';
import Wrapper from './Wrapper';

const Button = ({ secondary, className, children, onClick, ...props }) => {
  return (
    <Wrapper className={className}>
      <StyledButton {...props} secondary={secondary} onClick={onClick}>
        {Children.toArray(children)}
      </StyledButton>
    </Wrapper>
  );
};

Button.propTypes = {
  handleRoute: PropTypes.func,
  className: PropTypes.any,
  href: PropTypes.string,
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
