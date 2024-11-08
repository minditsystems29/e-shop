"use client";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gradient-to-r from-[#c1e1c5] via-[#a8d8b9] to-[#c1e1c5] py-8 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Us Section */}
        <div>
          <h4 className="font-bold mb-4 text-gray-900">Contact Us</h4>
          <p className="text-gray-700">
            Address: 132, My Street, Kingston, New York 12401.
          </p>
          <p className="text-gray-700">
            Phone: +01 2222 234 / (+91) 01 2345 6789
          </p>
          <p className="text-gray-700">Hours: 10:00 - 18:00, Mon-Sat</p>
        </div>

        {/* About Section */}
        <div>
          <h4 className="font-bold mb-4 text-gray-900">About</h4>
          <p className="text-gray-700">About Us</p>
          <p className="text-gray-700">Delivery Information</p>
          <p className="text-gray-700">Privacy Policy</p>
          <p className="text-gray-700">Terms & Conditions</p>
          <p className="text-gray-700">Contact Us</p>
        </div>

        {/* My Account Section */}
        <div>
          <h4 className="font-bold mb-4 text-gray-900">My Account</h4>
          <p className="text-gray-700">Sign In</p>
          <p className="text-gray-700">View Cart</p>
          <p className="text-gray-700">My Wishlist</p>
          <p className="text-gray-700">Track My Order</p>
          <p className="text-gray-700">Help</p>
        </div>

        {/* Install App Section */}
        <div>
          <h4 className="font-bold mb-4 text-gray-900">Install App</h4>
          <p className="text-gray-700">From App Store or Google Play</p>
          <div className="flex gap-4 mt-2">
            <div className="bg-white p-2 rounded shadow">
              <img src="/app.jpg" alt="App Store" className="w-28" />
            </div>
            <div className="bg-white p-2 rounded shadow">
              <img src="/play.jpg" alt="Google Play" className="w-28" />
            </div>
          </div>
          <p className="mt-4 text-gray-700">Secured Payment Gateways</p>
          <div className="flex gap-2 mt-2">
            <div className="bg-white p-2 rounded shadow">
              <img src="/visa.png" alt="Visa" className="w-12" />
            </div>
            <div className="bg-white p-2 rounded shadow">
              <img src="/mastercard.png" alt="MasterCard" className="w-12" />
            </div>
            <div className="bg-white p-2 rounded shadow">
              <img src="/maestro.png" alt="Maestro" className="w-12" />
            </div>
            <div className="bg-white p-2 rounded shadow">
              <img src="/amex.png" alt="American Express" className="w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-8 border-t border-gray-300 pt-4">
        <p className="text-gray-700">
          @ 2024, Your Company Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

