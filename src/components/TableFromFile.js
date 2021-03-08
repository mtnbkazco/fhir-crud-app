import React from 'react';
import { patientJson } from '../data/PatientData'
import {Button, Label, Table} from "semantic-ui-react";
import axios from "axios";

function TFF() {
  const headers = [
    'Last Name',
    'First Name',
    'Gender',
    'Date Of Birth',
    'Send to HAPI'
  ]

  function sendToHapi(data) {
    const url = 'http://hapi.fhir.org/baseR4/Patient/'
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
            "gender": data.gender,
            "birthDate": data.birthDate
          },
          "request": {
            "method": "POST",
            "url": "Patient",
            "ifNoneExist": "identifier=http://acme.org/mrns|12345"
          }
        }]
      }).then(response => {console.log(response.data)
        alert(`Patient: ${data.firstname} ${data.lastname} has been created. Patient Id: ${response.data.id}`)}
      )
      console.log(data)
    }

  return (
    <Table className='Table' celled padded>
      <br/>
      <Label content="This table reads in Patient data the available CSV - It can be sent to the HAPI FHIR Public Server"/>
      <Table.Row>
        <Table.Cell>
          <Table
                 headerRow={headers}
                 tableData={patientJson}
                 renderBodyRow={(data, index) => {
                   const tableRow = (
                     <Table.Row key={index}>
                       <Table.Cell>
                         {data.name[0].family}
                       </Table.Cell>
                       <Table.Cell>
                         {data.name[0].given}
                       </Table.Cell>
                       <Table.Cell>
                         {data.gender}
                       </Table.Cell>
                       <Table.Cell>
                         {data.birthDate}
                       </Table.Cell>
                       <Table.Cell>
                         <Button onClick={() => sendToHapi(data)}>Send to HAPI</Button>
                       </Table.Cell>
                     </Table.Row>
                   );
                   return tableRow;
                 }}
          />
        </Table.Cell>
      </Table.Row>
    </Table>
  )
}

export default TFF
