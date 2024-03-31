import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ref, watchEffect } from 'vue';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTime() {
  const currentTime = ref('');

  function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    currentTime.value = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  }

  watchEffect(() => {
    updateTime();
  });

  return {
    currentTime
  };
}