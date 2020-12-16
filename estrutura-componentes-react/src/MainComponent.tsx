import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export interface MainComponentProps {

}

export interface MainComponentState {

}

class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
    state = {}
    render() {
        return (<div className="container"><h1>Teste</h1>
            <Form>
                <Form.Group>
                    <Form.Check type="checkbox" label="Opção 1" id="chbxv1" />
                    <Form.Check type="checkbox" label="Opção 2" id="chbxv2" />
                    <Form.Check type="checkbox" label="Opção 3" id="chbxv3" disabled />
                </Form.Group>
            </Form>
            <Button variant="primary" size="sm">Botão</Button>  
        </div>);
    }
}

export default MainComponent;