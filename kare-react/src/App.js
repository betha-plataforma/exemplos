import React from 'react';
import { Badge, Button, Dropdown, Tabs, Tab, Alert, ProgressBar, Breadcrumb, Card, Form, DropdownButton, Modal, Pagination, OverlayTrigger, Popover } from 'react-bootstrap';
import './App.scss';

function App() {

  let show = false;
  const handleClose = () => show = false;
  const handleShow = () => show = true;

  const content = `
  Very long
  Multiline content
  that is engaging and what-not
`;
  return (

    <div className="container bg__gray--l40">
      <section>
        <h1>Abas</h1>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Home">
          </Tab>
          <Tab eventKey="profile" title="Profile">
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
          </Tab>
        </Tabs>

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example2" className="flex-column">
          <Tab eventKey="home" title="Home">
          </Tab>
          <Tab eventKey="profile" title="Profile">
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
          </Tab>
        </Tabs>
      </section>
      <section>
        <h1>Alertas</h1>
        <Alert variant="success" dismissable>
          This is an alert check it out!
        </Alert>
        <Alert variant="danger" dismissable>
          This is an alert check it out!
        </Alert>
        <Alert variant="warning" dismissable>
          This is an alert check it out!
        </Alert>
        <Alert variant="info" dismissable>
          This is an alert check it out!
        </Alert>
        <Alert variant="success" className="alert-icon" dismissable>
          This is an alert check it out!
        </Alert>
        <Alert variant="danger" className="alert-icon" dismissable>
          This is an alert check it out!
        </Alert>
        <Alert variant="warning" className="alert-icon" dismissable>
          This is an alert check it out!
        </Alert>
        <Alert variant="info" className="alert-icon" dismissable>
          This is an alert check it out!
        </Alert>
      </section>
      <section>
        <h1>Badge</h1>
        <div>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>
      <section>
        <h1>Botões</h1>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="info">Info</Button>
        <Button variant="link">Link</Button>

        <h1>Desabilitados</h1>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="success" disabled>Success</Button>
        <Button variant="warning" disabled>Warning</Button>
        <Button variant="danger" disabled>Danger</Button>
        <Button variant="info" disabled>Info</Button>
        <Button variant="link" disabled>Link</Button>
      </section>
      <section>
        <h1>Barra de progresso</h1>
        <div>
          <ProgressBar variant="success" now={40} />
          <ProgressBar variant="info" now={20} />
          <ProgressBar variant="warning" now={60} />
          <ProgressBar variant="danger" now={80} />
        </div>
      </section>

      <section>
        <h1>Breadcrumb</h1>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
            Library
  </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <section>
        <h1>Cards</h1>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1742c00a7f4%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1742c00a7f4%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5390625%22%20y%3D%2297.5%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
    </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </section>
      <section>
        <h1>Checkbox</h1>
        <Form>

          <Form.Group>
            <Form.Check type="checkbox" label="Check me out" id="check1" />
            <Form.Check type="checkbox" label="Check me out" id="check2" />
            <Form.Check type="checkbox" label="Check me out" id="check3" />
          </Form.Group>

          <Form.Group>
            <Form.Check type="checkbox" label="Check me out" id="check4" inline />
            <Form.Check type="checkbox" label="Check me out" id="check5" inline />
            <Form.Check type="checkbox" label="Check me out" id="check6" inline />
          </Form.Group>

          <Form.Group>
            <Form.Check type="checkbox" label="Check me out" id="check7" inline />
            <Form.Check type="checkbox" label="Check me out" id="check8" inline />
            <Form.Check type="checkbox" label="Check me out" id="check9" inline disabled />
          </Form.Group>
        </Form>
      </section>
      <section>
        <h1>Dropdown</h1>
        <Dropdown drop="up">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-danger">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <DropdownButton id="dropdown-item-button" title="Dropdown button">
          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton>
      </section>
      <section>
        <h1>Modal</h1>
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
      </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </section>

      <section>
        <h1>Paginação</h1>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </section>
      <section>
        <h1>Popover</h1>
        <OverlayTrigger
          trigger="click"
          overlay={
            <Popover id="popover-contained">
              <Popover.Title as="h3">Popover bottom</Popover.Title>
              <Popover.Content>
                <strong>Holy guacamole!</strong> Check this info.
          </Popover.Content>
            </Popover>
          }
        >
          <Button>Holy guacamole!</Button>
        </OverlayTrigger>
      </section>
      <section>
        <h1>Radio</h1>
        <Form>

          <Form.Group>
            <Form.Check type="radio" label="Check me out" id="radio1" />
            <Form.Check type="radio" label="radio me out" id="radio2" />
            <Form.Check type="radio" label="radio me out" id="radio3" />
          </Form.Group>

          <Form.Group>
            <Form.Check type="radio" label="radio me out" id="radio4" inline />
            <Form.Check type="radio" label="radio me out" id="radio5" inline />
            <Form.Check type="radio" label="radio me out" id="radio6" inline />
          </Form.Group>

          <Form.Group>
            <Form.Check type="radio" label="radio me out" id="radio7" inline />
            <Form.Check type="radio" label="radio me out" id="radio8" inline />
            <Form.Check type="radio" label="radio me out" id="radio9" inline disabled />
          </Form.Group>
        </Form>
      </section>
      <section>
        <h1>Switch</h1>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />
          <Form.Check
            disabled
            type="switch"
            label="disabled switch"
            id="disabled-custom-switch"
          />
        </Form>
      </section>
    </div>



  );
}

export default App;
