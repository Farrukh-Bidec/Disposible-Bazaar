"use client";
import React from 'react';
import CustomSeo from '../components/CustomSeo';

function PrivacyPolicy() {
    return (
        <div className="min-h-screen my-6 py-10">
            <CustomSeo id={12} />
            <div className="container mx-auto px-4 lg:px-16">
                
                <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Privacy Policy</h1>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Introduction</h2>
                        <p className="text-gray-600">
                            Welcome to Disposable Bazar. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you how we handle your personal data, your privacy rights, and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Information We Collect</h2>
                        <p className="text-gray-600">
                            When you visit our website or make a purchase, we collect the following information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Personal Identification Information: Name, email address, phone number, etc.</li>
                            <li>Payment Information: Credit card details or payment method information.</li>
                            <li>Order Details: Information related to your purchase (product details, shipping address, etc.).</li>
                            <li>Technical Data: IP address, browser type, and usage data.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">How We Use Your Information</h2>
                        <p className="text-gray-600">
                            We use your personal information to provide, maintain, and improve our services. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Processing and delivering your orders.</li>
                            <li>Managing payments and preventing fraud.</li>
                            <li>Communicating with you about your order or any issues.</li>
                            <li>Personalizing your shopping experience and offering relevant products.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sharing Your Information</h2>
                        <p className="text-gray-600">
                            We may share your personal data with third parties for the purposes mentioned above. These include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Payment processors to complete your transactions.</li>
                            <li>Shipping companies to deliver your orders.</li>
                            <li>Analytics providers to improve our website performance.</li>
                        </ul>
                        <p className="text-gray-600">
                            We do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Rights</h2>
                        <p className="text-gray-600">
                            You have the following rights concerning your personal information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Right to access the personal data we hold about you.</li>
                            <li>Right to request correction of inaccurate data.</li>
                            <li>Right to request deletion of your personal data.</li>
                            <li>Right to object to or restrict our processing of your data.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Data Security</h2>
                        <p className="text-gray-600">
                            We take reasonable measures to protect your personal data from unauthorized access, disclosure, or loss. However, no method of transmission over the internet is 100% secure, and we cannot guarantee the absolute security of your data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Changes to This Policy</h2>
                        <p className="text-gray-600">
                            We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Us</h2>
                        <p className="text-gray-600">
                            If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        </p>
                        <p className="text-gray-600">
                            <strong>Email:</strong> info@disposablebazaar.com <br />
                            <strong>Phone:</strong> 0321-3850002
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
