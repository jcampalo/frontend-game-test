import { css } from 'styled-components';

const buttonStyles = css`
  cursor: ${({ disabled }) => disabled ? 'none' : 'pointer'};
  min-width: 120px;
  max-width: 250px;
  display: block;
  padding: 0.75em;
  font-size: 1em;
  border: none;
  background: none;
  color: inherit;
  vertical-align: middle;
  -webkit-backface-visibility: hidden;
  -webkit-appearance: button;
  opacity: ${({ disabled }) => disabled ? 0.7 : 1};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
  overflow: hidden;

  :focus {
    outline: none;
  }
`;

export default buttonStyles;
