import React, { Component } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { Download, CodeSquare } from 'react-bootstrap-icons';

const mammoth = require("mammoth");

class Converter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            html: null,
            testPath: '',
            newFile: null
        }
    }

    download(filename, text) {
        console.log(text);
        var element = document.createElement('a');
        element.setAttribute('href', 'data: text/html, <html contenteditable>' +
            encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    parseWordDocxFile(files) {
        var current = this;
        console.log(files);
        var file = files[0];

        var reader = new FileReader();
        reader.onloadend = function (event) {
            var arrayBuffer = reader.result;


            mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(
                function (resultObject) {
                    // console.log(resultObject.value);
                    //current.setState({ html: resultObject.value });
                    const newDoc = document.implementation.createHTMLDocument('title');
                    newDoc.body.innerHTML = resultObject.value;
                    current.setState({ html: resultObject.value, newFile: { name: file.name, file: newDoc } });

                });
        };
        reader.readAsArrayBuffer(file);
    }

    render() {
        console.log(this.state.html);
        return (
            <Row className="col-12 m-0 p-0 d-flex flex-column">
                <Container style={{ minHeight: '30vh' }} className="bg-light mt-4 p-5 d-flex text-dark flex-column justify-content-around col-lg-4 col-md-8">
                    <h2 className="text-info" style={{ letterSpacing: 2 }}>Word to HTML Converter</h2>
                    <Form className="mt-4">
                        <Form.Group>
                            <Form.Control
                                type="file"
                                accept=".doc,.docx"
                                onChange={(e) => e.target.files.length > 0 ? this.parseWordDocxFile(e.target.files) : null} />
                        </Form.Group>
                    </Form>

                    <Button onClick={() => console.log('converting')} variant="primary">
                        Convert
                    </Button>

                    {this.state.newFile === null ?
                        null :
                        <Row className="justify-content-around">
                            <Button variant="info"  className="mt-3"
                            //onClick={() => this.download(this.state.newFile.name.split('.').slice(0, -1).join('.'), this.state.html)} 
                            >
                                Preview <CodeSquare className="ml-3" size={23} /></Button>
                            <Button variant="outline-secondary" className="mt-3"
                                onClick={() => this.download(this.state.newFile.name.split('.').slice(0, -1).join('.'), this.state.html)} >
                                Download <Download className="ml-3" size={23} /></Button>
                        </Row>
                    }
                </Container>
                <Container
                    className="col-12 mx-auto mt-2 bg-light"
                    dangerouslySetInnerHTML={{ __html: this.state.html }} />
            </Row>
        )
    }
}

export default Converter;