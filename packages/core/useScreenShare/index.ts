import { useCallback, useEffect, useRef, useState } from 'react'

import { _navigator } from '../_ssr.config'
import { useIsSupported } from '../useIsSupported'

export interface UseScreenShareOptions {
  /**
   * If the stream video media constraints
   *
   * @default true
   */
  video?: boolean | MediaTrackConstraints | undefined
  /**
   * If the stream audio media constraints
   *
   * @default true
   */
  audio?: boolean | MediaTrackConstraints | undefined
}

/**
 * Reactive screen sharing
 *
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useScreenShare
 */
export function useScreenShare(options: UseScreenShareOptions = {}) {
  const { audio = true, video = true } = options
  const isSupported = useIsSupported(
    () => !!_navigator?.mediaDevices?.getDisplayMedia
  )

  const stream = useRef<MediaStream | null>(null)
  const ref = useRef<HTMLVideoElement | null>(null)

  const [isPlaying, setPlaying] = useState(false)

  const play = useCallback(async () => {
    if (!isSupported || !ref.current) return

    stream.current =
      (await _navigator?.mediaDevices.getDisplayMedia({
        audio,
        video
      })) ?? null

    setPlaying(true)

    return stream.current
  }, [audio, isSupported, video])

  const stop = useCallback(() => {
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
    setPlaying(false)
  }, [])

  useEffect(() => {
    if (!ref.current) return

    ref.current.srcObject = stream.current

    // Handle os native stop screen sharing buttons
    stream.current?.getVideoTracks()[0].addEventListener('ended', stop)
  }, [isPlaying, stop])

  return {
    isSupported,
    isPlaying,
    ref,
    stream,
    play,
    stop
  }
}
