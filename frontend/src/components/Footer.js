import React from 'react';
import { Container } from 'reactstrap';

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <Container className="text-center">
                <p className="mb-2">&copy; {new Date().getFullYear()} QuizPlatform</p>
                <div>
                    <a href="#" className="text-white text-decoration-none mx-2">Terms of Service</a>
                    <a href="#" className="text-white text-decoration-none mx-2">Privacy Policy</a>
                    <a href="#" className="text-white text-decoration-none mx-2">Contact Us</a>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;