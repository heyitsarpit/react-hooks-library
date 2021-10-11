import { useMediaStream } from '.'

export function Demo() {
  const { ref, pause, isPaused, restart, resume, play, stop, isPlaying } =
    useMediaStream()

  return (
    <div>
      <video
        ref={ref}
        width="500"
        height="280"
        className="mx-auto my-4"
        muted
        autoPlay
        playsInline></video>
      <div className="flex justify-center gap-4">
        <button onClick={play} disabled={isPlaying}>
          Start
        </button>
        <button onClick={stop} disabled={!isPlaying}>
          Stop
        </button>
        <button onClick={restart}>Restart</button>
        <button onClick={pause} disabled={isPaused}>
          Pause
        </button>
        <button onClick={resume} disabled={!isPaused}>
          Resume
        </button>
      </div>
    </div>
  )
}
