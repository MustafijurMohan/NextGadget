import {useDispatch, useSelector} from 'react-redux'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { createToContact } from '../redux/slice/contact';
import { createContact } from '../api/contact';
import Reveal from '../animation/Reveal';

const Contact = () => {
  const formDataInput = useSelector((state) => state.contact.formDataInput)
  const dipatch = useDispatch()
  const {name, email, subject, message} = formDataInput

  const handleChange = (e) => {
    const {name, value} = e.target
    dipatch(createToContact({name, value}))
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createContact(formDataInput)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Reveal>
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question about our products, need support, or just want to say hi, feel free to contact us.
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Contact Information Section */}
          <Reveal>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              Our team is ready to assist you. Here's how you can reach us.
            </p>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-600 text-xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Our Office</h4>
                  <p>123 Tech Lane, Silicon Valley, CA 90210, USA</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-blue-600 text-xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-blue-600 text-xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>support@yourtechstore.com</p>
                </div>
              </li>
            </ul>
          </div>
          </Reveal>

          {/* Contact Form Section */}
          <Reveal>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className='w-full px-6 py-3 rounded-md text-white font-semibold transition duration-300 bg-gray-600 hover:bg-gray-700 cursor-pointer'
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;