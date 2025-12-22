
"use client"

import CustomSeo from '../components/CustomSeo';

function TermsAndConditions() {
    return (
        <div className="min-h-screen my-6 py-10">
            <CustomSeo/>
            <div className="container mx-auto px-4 lg:px-16">
                
                <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Terms and Conditions</h1>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Introduction</h2>
                        <p className="text-gray-600">
                            Welcome to Disposable Bazar! These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using our site, you agree to comply with and be bound by the following terms and conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Acceptance of Terms</h2>
                        <p className="text-gray-600">
                            By accessing this website, you accept these terms and conditions in full. If you disagree with any part of these terms and conditions, you must not use our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Changes to Terms</h2>
                        <p className="text-gray-600">
                            Disposable Bazar reserves the right to revise these terms and conditions at any time. By using this website, you agree to be bound by the current version of these terms. We encourage you to review these terms periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Use of Our Website</h2>
                        <p className="text-gray-600">
                            You agree to use our website only for lawful purposes and in a way that does not infringe the rights of or restrict or inhibit the use and enjoyment of this site by any third party. Prohibited behavior includes harassing or causing distress to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Intellectual Property Rights</h2>
                        <p className="text-gray-600">
                            Unless otherwise stated, Disposable Bazar and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from the website for your personal use, subject to restrictions set in these terms and conditions.
                        </p>
                        <p className="text-gray-600">You must not:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Republish material from our website without prior written consent.</li>
                            <li>Sell, rent, or sub-license material from our website.</li>
                            <li>Reproduce, duplicate, or copy material from the website for commercial purposes.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Accounts</h2>
                        <p className="text-gray-600">
                            If you create an account on Disposable Bazar, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account or password.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Limitation of Liability</h2>
                        <p className="text-gray-600">
                            Disposable Bazar will not be liable for any direct, indirect, incidental, special, or consequential damages that result from your use or inability to use the website, including but not limited to reliance on any information obtained from the site, mistakes, or delays in operation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Governing Law</h2>
                        <p className="text-gray-600">
                            These terms and conditions are governed by and construed in accordance with the laws of [Your Country], and you submit to the non-exclusive jurisdiction of the courts located in [Your Country] for the resolution of any disputes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Us</h2>
                        <p className="text-gray-600">
                            If you have any questions about these terms and conditions, please contact us at:
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

export default TermsAndConditions;
