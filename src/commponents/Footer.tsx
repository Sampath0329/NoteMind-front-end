function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-purple-500/20 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2024 NoteMind AI. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer