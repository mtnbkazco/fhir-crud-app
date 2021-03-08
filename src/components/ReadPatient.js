import React, {useState} from 'react';
import {Button, Form, Label} from "semantic-ui-react";
import axios from "axios";

function ReadUser() {
  const url = 'http://hapi.fhir.org/baseR4/Patient/'
  const [data, setData] = useState({
    id: ''
  })

  const readUser = (e) => {
    e.preventDefault()
    axios.get(url + data.id, {})
      .then(response => {
        if (response.data.birthDate === undefined){

        }
        alert(`Patient data returned: 
               Patient Id: ${response.data.id}
               Patient FirstName: ${response.data.name[0].given[0]} 
               Patient LastName: ${response.data.name[0].family} 
               Patient DOB: ${response.data?.birthDate || '' } 
               Patient Gender: ${response.data?.gender || ''}`)
      })
  }

  const changeHandler = (e) => {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }

  return (
    <div style={{paddingLeft: '20px'}}>
      <br/>
      <Label content='Read User to HAPI FHIR Server' />
      <br/>
      <br/>
        <Form onSubmit={(e) => readUser(e)}>
          <Form.Field width={6}>
            <Form.Input onChange={(e) => changeHandler(e)}
                        label='Patient Id'
                        placeholder='Patient Id'
                        id='id'
                        type='text'
            />
          </Form.Field>
          <Button type='submit' color={'blue'}>Submit</Button>
        </Form>
    </div>
  )
}

export default ReadUser
