import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';

function Header() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Navbar color="light" light expand="md" className="border-bottom shadow-sm py-3">
            <Container className="d-flex justify-content-between align-items-center">
                <NavbarBrand tag={Link} to="/" className="text-primary h3 mb-0">
                    QuizPlatform
                </NavbarBrand>
                <Nav className="ms-auto d-flex align-items-center">
                    <NavItem>
                        <Link to="/" className="nav-link text-dark mx-2">Home</Link>
                    </NavItem>
                    {userRole && (
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle nav caret className="text-dark mx-2">
                                {userName}
                            </DropdownToggle>
                            <DropdownMenu end>
                                {userRole === 'admin' && <DropdownItem tag={Link} to="/admin-dashboard">Admin Dashboard</DropdownItem>}
                                {userRole === 'staff' && <DropdownItem tag={Link} to="/staff-dashboard">Staff Dashboard</DropdownItem>}
                                {userRole === 'user' && <DropdownItem tag={Link} to="/user-dashboard">User Dashboard</DropdownItem>}
                                <DropdownItem divider />
                                <DropdownItem tag={Link} to="/profile">Profile</DropdownItem>
                                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;