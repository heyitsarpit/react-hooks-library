import { useTitle } from '.'

export function Demo() {
  const { title, setTitle } = useTitle()

  function setRawTitle() {
    const titleNode = document.head.querySelector('title')
    // This will also re-render the component
    if (titleNode) titleNode.innerText = 'Some New Title'
  }

  return (
    <div>
      <div>
        Title - <span className="pill active">{title}</span>
      </div>
      <input
        type="text"
        placeholder="start typing to update title"
        onChange={(e) => setTitle(e.target.value)}
        className="mt-4"
      />

      <button onClick={setRawTitle} className="mt-4">
        set raw title
      </button>
    </div>
  )
}
