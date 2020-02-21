import React, { ReactNode } from 'react';
import { styled } from '../../styles';
import CurationListItem from './CurationListItem';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function CurationList({ children, className }: Props) {
  return <List className={className}>{children}</List>;
}

CurationList.Item = CurationListItem;

const List = styled.ul`
  display: block;
  width: 100%;
  margin: -80px 0 0 0;
  padding: 0;
  list-style: none;

  &::after {
    clear: both;
    display: block;
    content: ' ';
  }

  & > .CurationListItem {
    float: left;
    width: 33.33%;
    padding: 0 6px;
    margin: 80px 0 0 0;
  }
`;
