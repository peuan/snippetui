import styled from '@emotion/styled';
import { ReactNode } from 'react';


const Container = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 20px;
  padding: 1rem 2rem;
  border: 1px solid rgba(200 200 200 / 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #eee;
  text-shadow: 0 1px 0 #999;
`;

const Card = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Card;