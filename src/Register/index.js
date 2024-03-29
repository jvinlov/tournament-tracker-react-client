import React, { Component } from 'react';
import { Form, Label, Button, Message, Grid, Header, Icon, Segment, List, Dropdown, Select, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import pbIcon from '../pickIcon.png';
import MenuBar from '../Menu'

class Register extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			gender: '',
			location: '',
			rating: '',
      email: '',
      password: '',
		}
	}


	
	// Handling of form value change
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value

		})
	}

	// Submission of register in form
	handleSubmit = async (e) => {
		e.preventDefault();
		console.log('hello', this.state);
		const registrationUrl = `${process.env.REACT_APP_API_URL}/api/v1/users/register`; // localhost:8000/api/v1/users/register
    	// this is users.  this matches flask app.py: app.register_blueprint(user, url_prefix='/api/v1/users')
    	const registerResponse = await fetch(registrationUrl, {
    		method: 'POST',
    		body: JSON.stringify(this.state),
    		credentials: 'include', // this sends our session cookie with our request
    		headers: {
    			'Content-Type': 'application/json'
    		}
    		
    	});

    	const parsedResponse = await registerResponse.json();
      console.log(parsedResponse)
	    if (parsedResponse.status.code === 201) {
	      console.log('Sign up successful');
	      this.props.history.push('/tourneys'); // Change url to /issues programmatically with react-router
	    } else {
	      // Else display error message to the user
	      this.setState({
	        errorMsg: parsedResponse.status.message
	      });
	    }
  
	}

	render() {
		return (
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <MenuBar/>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src={pbIcon} /> Tournament Tracker
      </Header>
      <Form size='large' onSubmit={this.handleSubmit}>
        <Segment stacked>
          <Form.Input
          	name = 'name'
          	type='text'
          	icon='signup'
          	iconPosition='left'
          	placeholder='Name' 
          	onChange={this.handleChange} 
          	required/>
          <Form.Input
          	name = 'location'
          	type='text'
            placeholder='City'
            fluid
            selection
            // options={departmentOptions}
            onChange={this.handleChange} 
            required />
          <Form.Input
            name= 'gender'
            type='text'
            placeholder='M/F'
            onChange={this.handleChange}
            required />
          <Form.Input
            name= 'rating'
            type = 'text'
            placeholder = 'USAPA rating'
            onChange={this.handleChange}
            required/>

          <Form.Input 
          	name = 'email'
          	type='email'
          	fluid icon='user' 
          	iconPosition='left' 
          	placeholder='E-mail address' 
          	onChange={this.handleChange} 
          	required/>
          <Form.Input
          	name = 'password'
            fluid icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handleChange} 
            required/>

          <Button color='teal' fluid size='large' type='submit'>
           Register
          </Button>
        </Segment>
         { this.state.errorMsg ? <Message negative>{this.state.errorMsg}</Message> : null }
      </Form>
      {/*<Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>*/}
    </Grid.Column>
  </Grid>
		)
	}
}

export default Register;