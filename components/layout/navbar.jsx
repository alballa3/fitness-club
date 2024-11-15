export function Navbar() {
    return(
        <footer className="py-10 bg-gray-900 text-[#f0f0f0]">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">Follow us on social media</p>
          <div className="space-x-6 mb-8">
            {/* Social Media Icons */}
            <a href="#" className="text-[#0af5b7] hover:text-white">Facebook</a>
            <a href="#" className="text-[#0af5b7] hover:text-white">Instagram</a>
            <a href="#" className="text-[#0af5b7] hover:text-white">Twitter</a>
          </div>
          <p>&copy; 2024 Fitness Club. All rights reserved.</p>
        </div>
      </footer>
    )
}