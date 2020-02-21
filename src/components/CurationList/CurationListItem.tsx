import classNames from 'classnames';
import React, { memo } from 'react';
import { selectForegroundColor, styled } from '../../styles';
import CountButton from '../CountButton';

interface Props {
  badgeNumber?: number;
  imageUrl: string;
  likeCount: number;
  liked: boolean;
  productionName: string;
  className?: string;
  onClick?(): void;
}

function CurationListItem({
  imageUrl,
  likeCount,
  liked,
  productionName,
  className,
  onClick,
}: Props) {
  return (
    <Item className={classNames('CurationListItem', className)} onClick={onClick}>
      <Image style={{ backgroundImage: `url(${imageUrl})` }} />
      <Bottom>
        <ProductionName>{productionName}</ProductionName>
        <CountButton type="like" count={likeCount} activated={liked} />
      </Bottom>
    </Item>
  );
}

export default memo(CurationListItem);

const Item = styled.li`
  display: block;
  position: relative;
  cursor: pointer;
`;

const Image = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Bottom = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

const ProductionName = styled.div`
  font-size: 18px;
  line-height: 1.33;
  color: ${selectForegroundColor('textPrimary')};
`;
