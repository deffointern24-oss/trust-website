import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/lib/api";
import { toast } from "sonner";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  Loader2
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { post } = useApi();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await post('/subscribers/subscribe', { email });
      if (response.data.success) {
        toast.success("Thank you for subscribing!");
        setEmail("");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-trust-navy text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected with Our Mission</h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Get the latest updates on our educational initiatives, impact stories, and ways to make a difference.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button
                variant="secondary"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Organization Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AE</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">ArulEducation</h2>
                  <p className="text-trust-gold text-sm">Educational Trust</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Empowering communities through quality education, creating opportunities for lifelong learning,
                and building a brighter future for all.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-trust-gold cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-trust-gold cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 hover:text-trust-gold cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-trust-gold cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-trust-gold">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/our-work" className="text-gray-300 hover:text-white transition-colors">Our Work</Link></li>
                <li><Link to="/our-work/scholarships" className="text-gray-300 hover:text-white transition-colors">Scholarships</Link></li>
                <li><Link to="/our-work/digital-literacy" className="text-gray-300 hover:text-white transition-colors">Digital Literacy</Link></li>
                <li><Link to="/our-work/skill-development" className="text-gray-300 hover:text-white transition-colors">Skill Development</Link></li>
                <li><Link to="/resources/reports" className="text-gray-300 hover:text-white transition-colors">Annual Reports</Link></li>
                <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping</Link></li>
                <li><Link to="/cancellation-refunds" className="text-gray-300 hover:text-white transition-colors">Cancellation & Refunds</Link></li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-trust-gold">Our Programs</h3>
              <ul className="space-y-3">
                <li><Link to="/our-work/primary-education" className="text-gray-300 hover:text-white transition-colors">Primary Education</Link></li>
                <li><Link to="/our-work/higher-education" className="text-gray-300 hover:text-white transition-colors">Higher Education</Link></li>
                <li><Link to="/our-work/teacher-training" className="text-gray-300 hover:text-white transition-colors">Teacher Training</Link></li>
                <li><Link to="/our-work/infrastructure" className="text-gray-300 hover:text-white transition-colors">Infrastructure Development</Link></li>
                <li><Link to="/get-involved/volunteer" className="text-gray-300 hover:text-white transition-colors">Volunteer Opportunities</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Partner with Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-trust-gold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-trust-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">123 Education Street</p>
                    <p className="text-gray-300">Chennai, Tamil Nadu 600001</p>
                    <p className="text-gray-300">India</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-trust-gold" />
                  <p className="text-gray-300">+91-9876543210</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-trust-gold" />
                  <p className="text-gray-300">info@aruleducation.in</p>
                </div>
              </div>

              <Button variant="donate" size="lg" className="mt-6 w-full" asChild>
                <Link to="/donate">
                  <Heart className="w-4 h-4 mr-2" />
                  Make a Donation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 ArulEducation Trust. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/transparency" className="text-gray-300 hover:text-white transition-colors">Transparency</Link>
              <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping</Link>
              <Link to="/cancellation-refunds" className="text-gray-300 hover:text-white transition-colors">Cancellation & Refunds</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;