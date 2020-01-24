import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

let containerElement: HTMLElement | null = null;

function getPortalContainer() {
  if (containerElement !== null) {
    return containerElement;
  }

  const elem = document.createElement('div');
  elem.id = 'portal-container';
  document.body.appendChild(elem);

  containerElement = elem;
  return containerElement;
}

interface PortalConsumerProps {
  children: ReactNode;
}

export function Portal({ children }: PortalConsumerProps) {
  return createPortal(children, getPortalContainer());
}
