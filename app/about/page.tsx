export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About Us</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Welcome to our About page! This is where you can learn more about our company, our mission, and what we do.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To create amazing web applications that solve real-world problems and provide exceptional user
                experiences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading platform for innovative web solutions that empower businesses and individuals alike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}