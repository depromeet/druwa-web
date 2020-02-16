import { useEffect, useRef } from 'react';

let youtubePlayerApiScriptElement: HTMLScriptElement | null = null;
let yt: GlobalYoutubePlayerVar | null = null;

interface GlobalYoutubePlayerVar {
  Player: YoutubePlayerConstructor;
}

function initializeYoutubePlayerApiScript() {
  if (youtubePlayerApiScriptElement !== null) {
    return;
  }

  youtubePlayerApiScriptElement = document.createElement('script');
  youtubePlayerApiScriptElement.src = 'https://www.youtube.com/iframe_api';

  const firstScriptTag = document.getElementsByTagName('script')[0];
  if (firstScriptTag) {
    firstScriptTag.parentNode?.insertBefore(youtubePlayerApiScriptElement, firstScriptTag);
  } else {
    document.body.appendChild(youtubePlayerApiScriptElement);
  }
}

function readyForYoutubePlayerInitialize(callback: (Player: YoutubePlayerConstructor) => void) {
  initializeYoutubePlayerApiScript();

  if (yt !== null) {
    callback(yt.Player);
    return;
  }

  if (!('onYouTubeIframeAPIReady' in window)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).onYouTubeIframeAPIReady = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      yt = (window as any).YT as GlobalYoutubePlayerVar;
      callback(yt.Player);
    };
  }
}

export interface YoutubePlayerOptions {
  /** @default 640 */
  width?: number;
  /** @default 360 */
  height?: number;
  videoId: string;
  playerVars?: {
    autoplay?: 0 | 1;
    color?: 'red' | 'white';
    controls?: 0 | 1;
    /**
     * 전체 화면 버튼이 플레이어에 표시 여부
     * @default 1
     */
    fs?: 0 | 1;
    enablejsapi?: 0 | 1;
    origin?: string;
  };
  events?: {
    onReady?(event: { target: YoutubePlayer }): void;
    onStateChange?(event: { data: YoutubePlayerStates }): void;
    onError?(event: { data: YoutubePlayerErrorCodes }): void;
  };
}

export enum YoutubePlayerStates {
  NotStarted = -1,
  Ended = 0,
  Playing = 1,
  Paused = 2,
  Buffering = 3,
}

export enum YoutubePlayerErrorCodes {
  InvalidVideoId = 2,
  Html5NotSupported = 5,
  CannotFoundVideo = 100,
  VideoNotAllowed = 101,
  VideoNotAllowed2 = 150,
}

export type YoutubePlayerConstructor = {
  new (containerId: string, options: YoutubePlayerOptions): YoutubePlayer;
};

export interface YoutubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  clearVideo(): void;
  getPlayerState(): YoutubePlayerStates;
  /** 동영상 재생이 시작된 이후의 경과 시간을 초 단위로 반환합니다. */
  getCurrentTime(): number;
  /**
   * 현재 재생 중인 동영상의 재생 시간을 초 단위로 반환합니다. 동영상의 메타데이터가 로드되기 전에는 getDuration()이 0을
   * 반환하며 일반적으로 동영상 재생이 시작된 직후에 발생한다는 점에 유의하세요.
   */
  getDuration(): number;
  getVideoUrl(): string;
  destroy(): void;
}

interface YoutubePlayerHookOptions
  extends Pick<YoutubePlayerOptions, 'width' | 'height' | 'playerVars'> {
  onReady?(player: YoutubePlayer): void;
  onStateChange?(state: YoutubePlayerStates): void;
  onError?(errorCode: YoutubePlayerErrorCodes): void;
}

export function useYoutubePlayer(videoId: string, options: YoutubePlayerHookOptions = {}) {
  initializeYoutubePlayerApiScript();

  const { width, height, playerVars, onReady, onStateChange, onError } = options;
  const playerRef = useRef<YoutubePlayer | null>(null);

  useEffect(() => {
    readyForYoutubePlayerInitialize(Player => {
      playerRef.current?.destroy();
      playerRef.current = null;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      playerRef.current = new Player('main-video', {
        videoId,
        width,
        height,
        playerVars,
        events: {
          onReady(event) {
            onReady?.(event.target);
          },
          onStateChange(event) {
            onStateChange?.(event.data);
          },
          onError(event) {
            onError?.(event.data);
          },
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);
}
