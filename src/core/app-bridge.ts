interface OAuthTokenMessage {
  name: 'oauthToken';
  token: string | null;
}

export type AppBridgeMessage = OAuthTokenMessage;

export function postMessage(message: AppBridgeMessage) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)?.webkit?.messageHandlers?.druwaWebviewBridge?.postMessage?.(message);
}

export const appBridge = {
  postMessage,
} as const;
