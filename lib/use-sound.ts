"use client";

type SoundType = "click" | "notification" | "success" | "error";

const soundMap: Record<SoundType, string> = {
  click: "/sounds/click.mp3",
  notification: "/sounds/notification.mp3",
  success: "/sounds/success.mp3",
  error: "/sounds/error.mp3",
};

export function useSound(enabled: boolean) {
  const play = (type: SoundType) => {
    if (!enabled) return;

    const audio = new Audio(soundMap[type]);
    audio.volume = type === "notification" ? 0.5 : 0.3;

    audio.play().catch(() => {
      // ignore autoplay restrictions
    });
  };

  return { play };
}