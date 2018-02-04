import styled from 'styled-components';

import HOC from '../HOC';

const Input = styled.input`
  position: relative;
  display: block;
  padding: 0.8em;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #6A7989;
  font-size: 1.2em;
  -webkit-appearance: none;
  margin-top: 0.85em;
  width: 100%;

  :active,
  :focus {
    outline: none;
    border: none;
  }
`;

export default HOC(Input);
