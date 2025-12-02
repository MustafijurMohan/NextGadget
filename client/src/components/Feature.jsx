import {   Phone, Truck, Shield, RotateCcw } from 'lucide-react';
import Reveal from '../animation/Reveal';


const Feature = () => {
  return (
    <>
        {/* Features Section */}
        <div className="border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Reveal>
                    <div className="flex items-center space-x-3">
                        <div className="bg-gray-600 p-3 rounded-full">
                            <Truck className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold ">Free Shipping</h3>
                            <p className="text-sm text-gray-400">On orders over $100</p>
                        </div>
                    </div>
                    </Reveal>
                    <Reveal>
                    <div className="flex items-center space-x-3">
                        <div className="bg-gray-600 p-3 rounded-full">
                            <RotateCcw className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Easy Returns</h3>
                            <p className="text-sm text-gray-400">30-day return policy</p>
                        </div>
                    </div>
                    </Reveal>
                    <Reveal>
                    <div className="flex items-center space-x-3">
                        <div className="bg-gray-600 p-3 rounded-full">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Secure Payment</h3>
                            <p className="text-sm text-gray-400">SSL encrypted checkout</p>
                        </div>
                    </div>
                    </Reveal>
                    <Reveal>
                    <div className="flex items-center space-x-3">
                        <div className="bg-gray-600 p-3 rounded-full">
                            <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold">24/7 Support</h3>
                            <p className="text-sm text-gray-400">Customer service</p>
                        </div>
                    </div>
                    </Reveal>
                </div>
            </div>
        </div>
    </>
  )
}

export default Feature