import React from "react";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
    return (
        <div className={`space-y-6 ${className}`}>
            {/* Wheel of Fortune news & updates */}
            <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">
                    Wheel of Fortune news & updates
                </h3>
                <div className="flex items-start space-x-3">
                    <input
                        type="checkbox"
                        id="newsletter"
                        name="ulp-newsletter"
                        defaultChecked
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700 leading-relaxed">
                        Stay in the know. We'll send you newsletters with fun videos from Ryan & Vanna plus updates on giveaways, contestant auditions and more.
                    </label>
                </div>
            </div>

            {/* Other Sony communications */}
            <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">
                    Other Sony communications
                </h3>
                <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            id="marketing"
                            name="ulp-marketing"
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="marketing" className="text-sm text-gray-700 leading-relaxed">
                            Yes, I would like to receive email updates from the Sony group companies. I acknowledge that my information will be handled and used by Sony Pictures Entertainment (SPE) in accordance with the SPE{" "}
                            <a href="https://www.sonypictures.com/corp/privacy.html" className="text-blue-600 underline hover:text-blue-800">
                                Privacy Policy
                            </a>
                            , and I agree to such handling and use by SPE.
                        </label>
                    </div>
                    <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            id="financial-incentive"
                            name="ulp-financial-incentive"
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="financial-incentive" className="text-sm text-gray-700 leading-relaxed">
                            By checking this box, you consent to the collection and use of your Personal Information as described in our{" "}
                            <a href="https://www.sonypictures.com/corp/privacy.html#sectionFIP" className="text-blue-600 underline hover:text-blue-800">
                                Notice regarding Financial Incentive Programs
                            </a>{" "}
                            and{" "}
                            <a href="https://www.sonypictures.com/corp/tos.html" className="text-blue-600 underline hover:text-blue-800">
                                Terms of Use
                            </a>
                            .
                        </label>
                    </div>
                </div>
            </div>

            {/* Legal Agreement Section */}
            <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start space-x-3">
                    <input
                        type="checkbox"
                        id="terms-agreement"
                        name="ulp-terms-agreement"
                        required
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms-agreement" className="text-sm text-gray-700 leading-relaxed">
                        By registering, you agree to Wheel of Fortune's{" "}
                        <a href="https://www.sonypictures.com/corp/tos.html" className="text-blue-600 underline hover:text-blue-800">
                            Terms and Conditions
                        </a>{" "}
                        &{" "}
                        <a href="https://www.sonypictures.com/corp/privacy.html" className="text-blue-600 underline hover:text-blue-800">
                            Privacy Policy
                        </a>
                        .
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Footer;
