import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  &.ant-btn-primary {
    background: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
  }
  &.ant-btn-primary:hover {
    background: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.7;
  }
`;
