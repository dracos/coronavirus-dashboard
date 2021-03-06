import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.div`
    grid-column: 1 / span 6;
    justify-self: end;
    margin-top: -2em;
    
    @media only screen and (max-width: 768px) {
      justify-self: start;
      grid-column: 1 / span 2;
      margin-top: auto;
    }
`;
})();

export const Paragraph: ComponentType<*> = (() => {
  return styled.p`
  margin: 0;
  `
})();