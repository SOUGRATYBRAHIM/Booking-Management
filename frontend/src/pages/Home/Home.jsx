import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, Zap, Shield, BarChart3, Users, Clock, CheckCircle, LogOut, Menu, X } from 'lucide-react';

import { Button, Card, Badge } from '../../components/ui';
import Footer from '../../components/layout/Footer';
import { logout } from '../../store/slices/authSlice';


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Public Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              BookManager
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#hero" className="text-gray-700 hover:text-blue-600 transition">Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">{user.name || user.email}</span>
                  <Link to="/dashboard">
                    <Button variant="secondary" size="sm">Dashboard</Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t">
              <a href="#hero" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#pricing" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">Dashboard</Button>
                    </Link>
                    <Button variant="danger" className="w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id='hero' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" className="mb-4">✨ Professional Booking Solution</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Streamline Your <span className="text-blue-600">Booking Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage appointments, bookings, and schedules effortlessly. Increase productivity and customer satisfaction with our intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg">
                  Get Started Free <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">✓ 14-day free trial • No credit card required</p>
          </div>
          <div className="relative">
            <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-2xl h-96 shadow-2xl">
              <div className="flex items-center justify-center h-full">
                <div className="text-white text-center">
                  <BarChart3 size={80} className="mx-auto mb-4 opacity-80" />
                  <p className="text-xl font-semibold">Smart Booking Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BookManager?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage bookings efficiently and professionally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={32} />,
                title: 'Lightning Fast',
                description: 'Instant booking confirmations and automated notifications.',
              },
              {
                icon: <Shield size={32} />,
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security with 99.9% uptime guarantee.',
              },
              {
                icon: <BarChart3 size={32} />,
                title: 'Analytics & Insights',
                description: 'Detailed reports and metrics to grow your business.',
              },
              {
                icon: <Users size={32} />,
                title: 'Team Collaboration',
                description: 'Invite team members and manage permissions easily.',
              },
              {
                icon: <Clock size={32} />,
                title: '24/7 Support',
                description: 'Round-the-clock customer support when you need it.',
              },
              {
                icon: <CheckCircle size={32} />,
                title: 'Easy Integration',
                description: 'Seamlessly integrate with your existing tools.',
              },
            ].map((feature, index) => (
              <Card key={index} variant="elevated" className="text-center hover:shadow-xl transition">
                <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Booking Process?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using BookManager to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                Start Your Free Trial
              </Button>
            </Link>
            <a href="#contact">
              <Button variant="secondary" size="lg">
                Schedule a Demo
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$29',
                description: 'Perfect for solopreneurs',
                features: ['Up to 100 bookings/month', 'Basic reports', 'Email support'],
              },
              {
                name: 'Professional',
                price: '$79',
                description: 'For growing businesses',
                featured: true,
                features: ['Unlimited bookings', 'Advanced analytics', 'Priority support', 'Team members', 'Custom branding'],
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: ['Everything in Professional', 'Dedicated account manager', 'Custom integration', 'SLA guarantee'],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                variant={plan.featured ? 'bordered' : 'default'}
                className={plan.featured ? 'border-blue-600 transform scale-105' : ''}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-600">/month</span>}
                </div>
                <Button className="w-full mb-6" variant={plan.featured ? 'primary' : 'outline'}>
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle size={18} className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
          </div>
          <Card variant="elevated">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600 shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <path d="m22 6-10 7L2 6"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">support@bookmanager.com</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600 shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+1 (234) 567-890</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="text-blue-600 shrink-0" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Support Hours</h4>
                      <p className="text-gray-600">24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Home;