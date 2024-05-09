import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Col} from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Alert from 'react-bootstrap/Alert';
import "./FeedbackForm.css";

function FeedbackForm() {
    const [displayform, setDisplay] = useState(true)
    const [em_value, setEmValue] = useState('')
    const [nm_value, setNmValue] = useState('')
    const [ph_value, setPhValue] = useState()
    const [orderType, setOrderType] = useState('');
    const [showCheckboxes, setShowCheckboxes] = useState(false);

    const [checked_val, setCheckBoxChecked] = useState([]);
    const [error_msg, setErrorMsg] = useState('Please enter the value for the above field');



    const handleOrderTypeChange = (e) => {
        const selectedOrderType = e.target.value;
        setOrderType(selectedOrderType);
        setShowCheckboxes(true); 
      };

    

    const validateForm = ()=>{
        setErrorMsg('Please enter the value for the above field');

        [...document.getElementsByClassName('alert-danger')].forEach(element => {
            element.style.display = "none";
        });
        if(nm_value===''){
            document.getElementById('name_er').style.display = "block";
        }
        else if(em_value===''){
            document.getElementById('email_er').style.display = "block";
        }
        else if(!em_value.includes('.com')||(!em_value.includes('@'))){
            document.getElementById('email_er').style.display = "block";
            setErrorMsg('Invalid Email')
        }
        else if(!ph_value){
            document.getElementById('phone_er').style.display = "block";
        }
        else if(ph_value.length <13){
            document.getElementById('phone_er').style.display = "block";
            setErrorMsg('Invalid Phone number')
        }
        else if(checked_val.length < Object.keys(feedback_type).length){
            let keys = Object.keys(feedback_type)
            checked_val.map((val)=>{
                keys = keys.filter(item => item !== val.split('_')[0])
            })
            keys.map(val =>{
                document.getElementById('er_'+val).style.display = "block";
            })
        }
        else return true;
    };
    
    const formSubmit = (e) => {
        e.preventDefault();
      
        if (validateForm()) {
          var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
          var new_id = 0;
          if (existingEntries == null) existingEntries = [];
          else {
            let lastentry = existingEntries.slice(-1)[0];
            new_id = parseInt(lastentry["id"]) + 1;
          }
          var entry = {
            id: new_id,
            email: em_value,
            name: nm_value,
            phone: ph_value,
            checkbox_values: checked_val,
            orderType: orderType, 
          };
          existingEntries.push(entry);
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));
          setDisplay(false);
        }
      };
      


    const handleOnChange = (isChecked, value) => {
        let temp = [...checked_val];
        if (isChecked) {
            temp.push(value);
        } else {
            temp = temp.filter((item) => item !== value);
        }
        setCheckBoxChecked(temp);
    };
    

    const feedback_type = {
        'qos': 'Please rate the quality of the service you received', 
        'qob': 'Please rate the quality of your beverage.',
        'roc': 'Was our restaurant clean?',
        'exp': 'Please rate your overall dining experience.'
    };

    const feedback_opts = ['Excellent', 'Good', 'Fair', 'Bad'];
    
    return (
        <Container className='feedback'>
            {displayform ? 
            (<Card className="feedback-form">
                <Card.Header>
                    <cite title="Source Title">We are committed to providing you with the best
                        dining experience possible, so we welcome your comments.
                    </cite>
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    Please fill out this questionnaire. 
                    </blockquote>
                    
                </Card.Body>
                <Container className='padding30px'>
                    <Form>
                        <Row>
                            <Col>
                                
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='required-field'>Customer Name</Form.Label>
                                    <Form.Control type="text" required placeholder="E.g. jon snow" value={nm_value} onChange={e => setNmValue(e.target.value)} />
                                    
                                </Form.Group>
                                <Alert variant='danger' id='name_er'>
                                    &#9432;{error_msg}
                                </Alert>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='required-field'>Email address</Form.Label>
                                    <Form.Control type="email" required placeholder="E.g. abc@gmail.com" value={em_value} onChange={e => setEmValue(e.target.value)}/>
                                </Form.Group>
                                <Alert variant='danger' id='email_er'>
                                    &#9432;{error_msg}
                                </Alert>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail"
                                style={{marginRight: "-59%"}}>
                                    <Form.Label className='required-field'>Phone</Form.Label>
                                    <InputGroup>
                                        <PhoneInput
                                        placeholder="9999999999"
                                        value={ph_value}
                                        onChange={setPhValue}/>
                                    </InputGroup>
                                </Form.Group>
                                <Alert variant='danger' id='phone_er'>
                                    &#9432;{error_msg}
                                </Alert>
                            </Col>
                            <Col></Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicOrderType" 
                                style={{marginLeft: "-8%"}}>
                                    <Form.Label className='required-field'>Order Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={orderType}
                                        onChange={handleOrderTypeChange}
                                    >
                                        <option value="">Select Order Type</option>
                                        <option value="walk-ins">Walk-ins</option>
                                        <option value="online-order">Online Order</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        {showCheckboxes && orderType === 'walk-ins' && (
                            <Row>
                                {Object.keys(feedback_type).map((ty) => (
                                    <Col key={ty}>
                                        <Form.Group className="mb-1" controlId={ty}>
                                            <Form.Label className='required-field'>{feedback_type[ty]}</Form.Label>
                                            <InputGroup>
                                                <div className="mb-1">
                                                    {feedback_opts.map((opt, key) => (
                                                        <Form.Check
                                                            key={opt}
                                                            inline
                                                            label={opt}
                                                            name={`${ty}_feedback_opts`}
                                                            id={`${ty}_${key}`}
                                                            checked={checked_val.includes(ty + '_' + opt)}
                                                            onChange={(e) => handleOnChange(e.target.checked, ty + '_' + opt)}
                                                            type='checkbox'
                                                            value={opt}
                                                        />
                                                    ))}
                                                </div>
                                            </InputGroup>
                                        </Form.Group>
                                        <Alert variant='danger' id={`er_${ty}`}>
                                            &#9432;{error_msg}
                                        </Alert>
                                    </Col>
                                ))}
                            </Row>
                        )}

{showCheckboxes && orderType === 'online-order' && (
    <Row>
        <Col>
            <Form.Group className="mb-3" controlId="service-quality">
                <Form.Label>Please rate the quality of the service you received from your host.</Form.Label>
                <div>
                    {feedback_opts.map((opt, key) => (
                        <Form.Check
                            key={opt}
                            inline
                            label={opt}
                            name="service-quality"
                            id={`service-quality_${key}`}
                            checked={checked_val.includes('service-quality_' + opt)}
                            onChange={(e) => handleOnChange(e.target.checked, 'service-quality_' + opt)}
                            type='checkbox'
                            value={opt}
                        />
                    ))}
                </div>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3" controlId="delivery-service">
                <Form.Label>Please rate the delivery partner service.</Form.Label> <br/>
                <div>
                    {feedback_opts.map((opt, key) => (
                        <Form.Check style={{marginLeft: "-35%"}}
                            key={opt}
                            inline
                            label={opt}
                            name="delivery-service"
                            id={`delivery-service_${key}`}
                            checked={checked_val.includes('delivery-service_' + opt)}
                            onChange={(e) => handleOnChange(e.target.checked, 'delivery-service_' + opt)}
                            type='checkbox'
                            value={opt}
                        />
                    ))}
                </div>
            </Form.Group>
        </Col>
    </Row>

                        )}

                        <Button className='btn_purp' onClick={formSubmit}>Submit Review</Button>
                    </Form>
                </Container>
            </Card> 
            ):(
                <Card bg='light' text='dark' >
                    <Card.Body className='Feedback-thank'>
                        <div  className='padding30px' >
                            <div class="circle">
                                <div class="checkmark"></div>
                            </div>
                        </div>
                        <Card.Text>
                            Thank you for providing the feedback
                        </Card.Text>
                        <Form.Text muted>
                            We will work towards improving your experience
                        </Form.Text>
                        <div className='padding30px'>
                            <Button className='btn_purp' >Close</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
            
        </Container>
    );
}

export default FeedbackForm;
