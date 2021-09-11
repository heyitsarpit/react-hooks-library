import { useMediaStream } from '.'

export function Demo() {
  const { ref, pause, paused, restart, resume, play, stop, playing } =
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
        <button onClick={play} disabled={playing}>
          Start
        </button>
        <button onClick={stop} disabled={!playing}>
          Stop
        </button>
        <button onClick={restart}>Restart</button>
        <button onClick={pause} disabled={paused}>
          Pause
        </button>
        <button onClick={resume} disabled={!paused}>
          Resume
        </button>
      </div>
    </div>
  )
}
