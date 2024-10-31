import React from 'react';

function Footer() {
    return (
        <footer className="bg-secondary text-white py-4">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} QuizPlatform. All rights reserved.</p>
                <div className="mt-3">
                    <a href="#" className="text-white mx-2">Terms of Service</a>
                    <a href="#" className="text-white mx-2">Privacy Policy</a>
                    <a href="#" className="text-white mx-2">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;