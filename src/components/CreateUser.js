import React, { useState } from 'react';
import {Form, Label, Grid, Segment} from 'semantic-ui-react'
import axios from 'axios';
import './CreateUser.css';

function CreateUser() {
  const url = 'http://hapi.fhir.org/baseR4/Patient'
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    dateofbirth: '',
    gender: ''
  })

  function onFormSubmit(e) {
    e.preventDefault()
    axios.post(url, {
      "resourceType": "Patient",
      "type": "transaction",
      "entry": [{
        "resource": {
          "resourceType": "Patient",
          "name": [{
            "family": data.firstname,
            "given": [data.lastname],
          }],
          "gender": "",
          "birthDate": data.dateofbirth
        },
        "request": {
          "method": "POST",
          "url": "Patient",
          "ifNoneExist": "identifier=http://acme.org/mrns|12345"
        }
      }]
    }).then(response => {
    alert(`Patient: ${data.firstname} ${data.lastname} has been created. Patient Id: ${response.data.id}`)}
  )}

  function changeHandler(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }
  return (
    <div className='AddUserForm'>
      <Label content='Add User to HAPI FHIR Server' />
      <Form onSubmit={ (e) => onFormSubmit(e) }>
        <br/>
        <Form.Group widths='equal'>
          <Form.Input
            onChange={(e) => changeHandler(e)}
            fluid
            id='firstname'
            type='text'
            label='First name'
            placeholder='First name'
            value={data.firstname}
          />
          <Form.Input
            onChange={(e) => changeHandler(e)}
            fluid
            id='lastname'
            type='text'
            label='Last name'
            placeholder='Last name'
            value={data.lastname}
          />
          <Form.Input
            onChange={(e) => changeHandler(e)}
            fluid
            id='dateofbirth'
            type='date'
            label='Date of Birth'
            placeholder='2020-01-28'
            value={data.dateofbirth}
          />
          {/*<Form.Button type="submit" color={"blue"}>Submit</Form.Button>*/}
          <Segment>
          <Grid>
            <Grid.Column textAlign="center">
              <Form.Button type="submit" color={"blue"}>Submit</Form.Button>
            </Grid.Column>
          </Grid>
          </Segment>
        </Form.Group>
      </Form>
      <br/>
      <br/>
      <hr/>
    </div>
  )
}

export default CreateUser
