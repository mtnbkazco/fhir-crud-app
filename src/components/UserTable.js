import React, { Component } from "react";
import {Table, Button, Label} from 'semantic-ui-react'
import axios from 'axios';
import { getPatients } from "../services/services";
import './UserTable.css'

class Patients extends Component {
  state = {
    patients: [],
    rows: []
  };

  componentDidMount() {
    getPatients().then((res) => {
      this.setState({ patients: this.flatPatient(res) });
    });
  }

  flatPatient = (response) => {
    return (response.data.entry || []).map((item) => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: `${((name[0] || {}).given || []).join(" ")} ${
          (name[0] || {}).family
        }`,
        gender: item.resource.gender,
        dob: item.resource.birthDate,
      };
    });
  };

  render() {
    const { patients } = this.state
    const url = 'http://hapi.fhir.org/baseR4/Patient/'

    const deletePatient = (data) => {
      const ans = window.confirm('Are you sure you want to DELETE this patient?')
      if(ans === true){
      axios.delete(url + data.id, {}).then(response => {
        console.log(response)
        alert(`Patient: ${data.id}, ${data.name}, has been deleted.`)
        })
        .catch((error) => {
          alert(`Patient: ${data.id}, ${data.name}, could NOT be deleted. This might be due to linked child resources. 
                 Error ${error} returned.`)
        })
      }
    }

    const headers = [
      'Patient Id',
      'Patient Name',
      'Gender',
      'Date of Birth',
      'Delete User'
    ]
    const tableStyle = {
      whiteSpace: "nowrap",
      paddingLeft: "10px",
      paddingRight: "10px",
    }

    return (
      <Table className='Table' celled padded>
        <br/>
        <Label content="This table reads in Patient data from HAPI FHIR Public Server - You may also delete resources here."/>
        <Table.Row>
          <Table.Cell>
            <Table style={{tableStyle}}
                   headerRow={headers}
                   tableData={patients}
                   renderBodyRow={(data, index) => {
                     const tableRow = (
                       <Table.Row key={index}>
                         <Table.Cell>
                           {data.id}
                         </Table.Cell>
                         <Table.Cell>
                           {data.name}
                         </Table.Cell>
                         <Table.Cell>
                           {data.gender}
                         </Table.Cell>
                         <Table.Cell>
                           {data.dob}
                         </Table.Cell>
                         <Table.Cell>
                           <Button onClick={() => deletePatient(data)} color={"red"}>Delete</Button>
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
}

export default Patients
