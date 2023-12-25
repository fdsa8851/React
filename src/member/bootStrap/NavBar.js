import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { tokenState } from './../GlobalState';
import { useRecoilState } from 'recoil';

export default function NabBarDropDown() {
    
    console.log("tokenState:" , tokenState);

    const [token, setToken] = useRecoilState(tokenState);

    console.log("token :", token);
    return (
        <div>
            {token ? 
                <Navbar className="navbar-dark" bg="dark">
                <Container>
                    <Navbar.Brand href="/Home">화면 변경 진행중</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navb ar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Board">게시판</Nav.Link>
                        <Nav.Link href="/Todo">공부 정리 게시판</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            : null
            }
        </div>
        );
}