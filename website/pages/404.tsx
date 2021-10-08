import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div>oops! this page does not exist</div>
      <div>
        <Link href="/">
          <a>Go Home</a>
        </Link>
      </div>
    </div>
  )
}
