import { useCallback, useEffect, useMemo, useRef } from 'react';
import { noop } from '../utils';

export interface WindowPopupHookOptions {
  features?: WindowPopupFeatures;

  onClose?(message?: string): void;
}

export interface WindowPopupFeatures {
  left?: number;
  top?: number;
  /** The minimum required value is 100. */
  width?: number;
  /** The minimum required value is 100. */
  height?: number;
  /** Requires chrome=yes. */
  centerscreen?: boolean;
  /** @default true */
  resizable?: boolean;
  /** @default true */
  scrollbars?: boolean;
  menubar?: boolean;
  toolbar?: boolean;
}

export interface WindowPopupOpenOptions {
  /** @default 'focus' */
  behaviorIfAlreadyOpened?: 'focus' | 'closeAndReopen';
}

const popupData = new Map<string, string>();
const popupCloseListeners = new Map<string, () => void>();

const INTERNAL_MESSAGE_SAVE_FN = '__druwa_popup_message_save__';
const INTERNAL_CLOSE_FN = '__druwa_popup_close__';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any)[INTERNAL_MESSAGE_SAVE_FN] = (popupName: string, message: string) => {
  popupData.set(popupName, message);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any)[INTERNAL_CLOSE_FN] = (popupName: string) => {
  popupCloseListeners.get(popupName)?.();
};

export function postMessageToOpener(popupName: string, message: string | undefined) {
  if (typeof message === 'string') {
    window.opener?.[INTERNAL_MESSAGE_SAVE_FN]?.(popupName, message);
  }
}

export function closeThisPopup(popupName: string) {
  window.opener?.[INTERNAL_CLOSE_FN]?.(popupName);
}

export function useWindowPopup(
  url: string,
  popupName: string,
  options: WindowPopupHookOptions = {},
) {
  const { features = {}, onClose = noop } = options;

  const ref = useRef<Window | null>(null);
  const featuresStr = useMemo(() => createWindowPopupFeaturesStr(features), [features]);

  useEffect(() => {
    const closeListener = () => {
      ref.current?.close();
      ref.current = null;
      onClose(popupData.get(popupName));
    };

    popupCloseListeners.set(popupName, closeListener);

    return () => {
      popupCloseListeners.delete(popupName);
    };
  }, [popupName, onClose]);

  const createWindowPopup = useCallback(() => {
    if (ref.current !== null) {
      return ref.current;
    }

    ref.current = window.open(url, popupName, featuresStr);

    return ref.current;
  }, [url, popupName, featuresStr]);

  const open = useCallback(
    (options: WindowPopupOpenOptions = {}) => {
      const { behaviorIfAlreadyOpened = 'focus' } = options;

      try {
        // 만약 팝업이 열리지 않은 상태라면 그냥 연다.
        if (ref.current === null) {
          createWindowPopup();
          return;
        }

        switch (behaviorIfAlreadyOpened) {
          case 'focus':
            ref.current?.focus();
            break;
          case 'closeAndReopen':
            ref.current?.close();
            createWindowPopup();
            break;
        }
      } catch (error) {
        if (error instanceof DOMException) {
          // CORS
        }
      }
    },
    [createWindowPopup],
  );

  const close = useCallback(() => {
    ref.current?.close();
  }, []);

  return {
    open,
    close,
  };
}

const isNumber = (val: number | undefined): val is number => val !== undefined;

function createWindowPopupFeaturesStr(features: WindowPopupFeatures = {}) {
  const featuresWithDefault: WindowPopupFeatures = {
    resizable: true,
    scrollbars: true,
    ...features,
  };

  const strs = [];
  const numbers: (keyof WindowPopupFeatures)[] = ['left', 'top', 'width', 'height'];
  const booleans: (keyof WindowPopupFeatures)[] = [
    'centerscreen',
    'resizable',
    'scrollbars',
    'menubar',
    'toolbar',
  ];

  for (const num of numbers) {
    const val = featuresWithDefault[num];
    if (isNumber(val as number | undefined)) {
      strs.push(`${num}=${val}`);
    }
  }

  for (const bool of booleans) {
    const val = featuresWithDefault[bool];
    if (Boolean(val)) {
      strs.push(`${bool}=on`);
    }
  }

  return strs.join(',');
}
