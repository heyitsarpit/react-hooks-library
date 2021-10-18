/* eslint-disable jsx-a11y/media-has-caption */
import { useScreenShare } from '.'

export function Demo() {
  const { play, ref, stop, isPlaying } = useScreenShare()

  return (
    <div className="flex flex-col items-center justify-center">
      <video
        ref={ref}
        width="500"
        height="280"
        className="mx-auto my-4"
        muted
        controls={isPlaying}
        autoPlay
        playsInline></video>
      <div className="flex gap-4">
        <button onClick={play} disabled={isPlaying}>
          Start Screen Sharing
        </button>
        <button onClick={stop} disabled={!isPlaying}>
          Stop Screen Sharing
        </button>
      </div>
    </div>
  )
}
