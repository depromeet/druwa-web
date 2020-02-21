import { css } from '@emotion/core';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  colorPlatte,
  cssButtonReset,
  fontWeights,
  selectForegroundColor,
  styled,
} from '../../styles';
import { Icon } from '../../ui/icon';
import { Slider2 } from '../../ui/slider2';
import { DramaSliderTypeBItem } from './DramaSliderTypeBItem';

interface Props {
  title: string;
  count: number;
  /** @default 3 */
  size?: number;
  /** @default 12 */
  spacing?: number;
  className?: string;
  children: ReactNode;
}

export function DramaSliderTypeB({
  title,
  count,
  size = 3,
  spacing = 12,
  className,
  children,
}: Props) {
  const [page, setPage] = useState(0);
  const maxPage = useMemo(() => Math.ceil(count / size), [count, size]);

  const toPrevPage = useCallback(() => {
    setPage(page => page - 1);
  }, []);

  const toNextPage = useCallback(() => {
    setPage(page => page + 1);
  }, []);

  return (
    <section className={className}>
      <Head spacing={spacing / 2}>
        <TitleAnchor to={`/curation?title=${encodeURIComponent(title)}`}>
          <Title>{title}</Title>
          <Icon name="arrow-next" />
        </TitleAnchor>
        <Buttons>
          <NavButton onClick={toPrevPage} disabled={page === 0}>
            <Icon
              name="arrow-next"
              css={css`
                transform: rotate(180deg);
              `}
            />
          </NavButton>
          <NavButton onClick={toNextPage} disabled={page === maxPage - 1}>
            <Icon name="arrow-next" />
          </NavButton>
        </Buttons>
      </Head>
      <Slider
        page={page}
        size={size}
        spacing={spacing}
        css={css`
          min-height: 343px;
        `}
      >
        {children}
      </Slider>
    </section>
  );
}

const Head = styled.div<{ spacing: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${p => p.spacing}px;
`;

const TitleAnchor = styled(Link)`
  display: inline-flex;
  color: ${selectForegroundColor('textPrimary')};
  text-decoration: none;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0 4px 0 0;
  padding: 0 1px;
  font-size: 24px;
  font-weight: ${fontWeights.medium};
  height: 36px;
  line-height: 36px;
`;

const Buttons = styled.div`
  display: inline-flex;
`;

const NavButton = styled.button`
  ${cssButtonReset};
  width: 28px;
  height: 28px;
  border: none;
  margin: 0;
  background-color: ${colorPlatte.grey300};
  display: inline-flex;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const Slider = styled(Slider2)`
  margin-top: 20px;
`;

DramaSliderTypeB.Item = DramaSliderTypeBItem;
