export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} UniPath. Данные обновляются ежедневно.
      </div>
    </footer>
  )
}