/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { useSpring } from 'react-spring';
import { Portal } from '../../core';
import { DialogCard, DialogContainer, Dimmer } from './styles';

interface Props {
  open: boolean;
  /** @default 'dialog' */
  role?: 'dialog' | 'alertdialog';
  closeOnDimmerClick?: boolean;
  className?: string;
  children: ReactNode;

  onEntered?(): void;
  onExited?(): void;
  onClose?(): void;
}

const hiddenState = { opacity: 0, transform: `scale(0.9)` };
const showState = { opacity: 1, transform: `scale(1)` };

export function Dialog({
  open,
  role = 'dialog',
  closeOnDimmerClick = true,
  className,
  children,
  onExited,
  onEntered,
  onClose,
}: Props) {
  const [show, setShowState] = useState(open);
  const style = useSpring({
    from: open ? hiddenState : showState,
    to: open ? showState : hiddenState,
    config: {
      tension: 480,
      friction: 40,
      precision: 0.01,
    },
    delay: 100,
    onRest() {
      if (show) {
        let onEnd;
        if (!open) {
          setShowState(false);
          onEnd = onExited;
        } else {
          onEnd = onEntered;
        }

        onEnd?.();
      }
    },
  });

  const handleDimmerClick = useCallback(
    (event: MouseEvent) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (closeOnDimmerClick) {
        onClose?.();
      }
    },
    [closeOnDimmerClick, onClose],
  );

  useEffect(() => {
    if (open) {
      setShowState(true);
    }
  }, [open]);

  return (
    <Portal>
      <DialogContainer
        show={show}
        className={classNames(
          'Dialog',
          {
            'Dialog--is-displayed': show,
          },
          className,
        )}
      >
        <Dimmer
          onClick={handleDimmerClick}
          style={{ opacity: (style as any).opacity }}
          className="Dialog__dimmer"
        >
          <DialogCard
            role={role}
            style={{ transform: (style as any).transform }}
            className="Dialog__card"
          >
            {children}
          </DialogCard>
        </Dimmer>
      </DialogContainer>
    </Portal>
  );
}
