import { useCallback, useEffect, useRef, useState } from 'react'

import { _navigator } from '../_ssr.config'
import { useIsSupported } from '../useIsSupported'

export interface UseMediaStreamOptions {
  /**
   * Recreate stream when the input devices id changed
   *
   * @default true
   */
  autoSwitch?: boolean
  /**
   * The device id of video input
   *
   * When passing with `undefined` the default device will be used.
   * Pass `false` or "none" to disabled video input
   *
   * @default undefined
   */
  videoDeviceId?: string | undefined | false | 'none'
  /**
   * The device id of audio input
   *
   * When passing with `undefined` the default device will be used.
   * Pass `false` or "none" to disabled audio input
   *
   * @default undefined
   */
  audioDeviceId?: string | undefined | false | 'none'
}

/**
 * Reactive `mediaDevices.getUserMedia` streaming
 *
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useMediaStream
 */
export function useMediaStream(options: UseMediaStreamOptions = {}) {
  const { audioDeviceId, videoDeviceId, autoSwitch } = options
  const isSupported = useIsSupported(
    () => !!_navigator?.mediaDevices?.getUserMedia
  )

  const stream = useRef<MediaStream | null>(null)
  const ref = useRef<HTMLVideoElement | null>(null)

  const [isPlaying, setPlaying] = useState(false)
  const [isAudioMuted, setAudioMuted] = useState(false)
  const [isVideoMuted, setVideoMuted] = useState(false)

  const getDeviceOptions = useCallback(
    (device: string | undefined | false | 'none') => {
      if (device === 'none' || device === false) return false
      if (device === null) return true

      return {
        deviceId: device
      }
    },
    []
  )

  const play = useCallback(async () => {
    if (!isSupported || stream.current) return

    stream.current =
      (await _navigator?.mediaDevices.getUserMedia({
        video: getDeviceOptions(videoDeviceId),
        audio: getDeviceOptions(audioDeviceId)
      })) ?? null

    setPlaying(true)
    return stream.current
  }, [audioDeviceId, getDeviceOptions, isSupported, videoDeviceId])

  const stop = useCallback(() => {
    setPlaying(false)
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
  }, [])

  const restart = useCallback(async () => {
    stop()
    return await play()
  }, [play, stop])

  const muteAudio = useCallback(() => {
    setAudioMuted(true)
    stream.current?.getAudioTracks().forEach((t) => (t.enabled = false))
  }, [])

  const unMuteAudio = useCallback(() => {
    setAudioMuted(false)
    stream.current?.getAudioTracks().forEach((t) => (t.enabled = true))
  }, [])

  const muteVideo = useCallback(() => {
    setVideoMuted(true)
    stream.current?.getVideoTracks().forEach((t) => (t.enabled = false))
  }, [])

  const unMuteVideo = useCallback(() => {
    setVideoMuted(false)
    stream.current?.getVideoTracks().forEach((t) => (t.enabled = true))
  }, [])

  const pause = useCallback(() => {
    muteAudio()
    muteVideo()
  }, [muteAudio, muteVideo])

  const resume = useCallback(() => {
    unMuteAudio()
    unMuteVideo()
  }, [unMuteAudio, unMuteVideo])

  useEffect(() => {
    if (!ref.current) return

    ref.current.srcObject = stream.current
  }, [isPlaying])

  useEffect(() => {
    if (autoSwitch && stream.current) restart()
  }, [videoDeviceId, audioDeviceId, autoSwitch, restart])

  return {
    isSupported,
    ref,
    stream,
    isPlaying,
    play,
    stop,
    restart,
    isAudioMuted,
    muteAudio,
    unMuteAudio,
    isVideoMuted,
    muteVideo,
    unMuteVideo,
    pause,
    resume,
    isPaused: isAudioMuted && isVideoMuted
  }
}
