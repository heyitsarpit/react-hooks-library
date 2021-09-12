import { useEffect, useRef, useState } from 'react'

import { _navigator } from '../_ssr.config'

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
 * @see https://react-hooks-library.vercel.app/core/useUserMedia
 */
export function useMediaStream(options: UseMediaStreamOptions = {}) {
  const { audioDeviceId, videoDeviceId, autoSwitch } = options
  const isSupported = Boolean(_navigator?.mediaDevices?.getUserMedia)

  const stream = useRef<MediaStream | null>(null)
  const videoNode = useRef<HTMLVideoElement | null>(null)

  const [playing, setPlaying] = useState(false)
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)

  function getDeviceOptions(device: string | undefined | false | 'none') {
    if (device === 'none' || device === false) return false
    if (device === null) return true

    return {
      deviceId: device
    }
  }

  async function play() {
    if (!isSupported || stream.current) return

    stream.current =
      (await _navigator?.mediaDevices.getUserMedia({
        video: getDeviceOptions(videoDeviceId),
        audio: getDeviceOptions(audioDeviceId)
      })) ?? null

    setPlaying(true)
    return stream.current
  }

  async function stop() {
    setPlaying(false)
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
  }

  async function restart() {
    stop()
    return await play()
  }

  function muteAudio() {
    setAudioMuted(true)
    stream.current?.getAudioTracks().forEach((t) => (t.enabled = false))
  }

  function unMuteAudio() {
    setAudioMuted(false)
    stream.current?.getAudioTracks().forEach((t) => (t.enabled = true))
  }

  function muteVideo() {
    setVideoMuted(true)
    stream.current?.getVideoTracks().forEach((t) => (t.enabled = false))
  }

  function unMuteVideo() {
    setVideoMuted(false)
    stream.current?.getVideoTracks().forEach((t) => (t.enabled = true))
  }

  function pause() {
    muteAudio()
    muteVideo()
  }

  function resume() {
    unMuteAudio()
    unMuteVideo()
  }

  useEffect(() => {
    if (!videoNode.current) return

    videoNode.current.srcObject = stream.current
  }, [playing])

  useEffect(() => {
    if (autoSwitch && stream.current) restart()
  }, [videoDeviceId, audioDeviceId, autoSwitch])

  return {
    isSupported,
    ref: videoNode,
    stream,
    playing,
    play,
    stop,
    restart,
    audioMuted,
    muteAudio,
    unMuteAudio,
    videoMuted,
    muteVideo,
    unMuteVideo,
    pause,
    resume,
    paused: audioMuted && videoMuted
  }
}
