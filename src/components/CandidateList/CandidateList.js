import React, { useState, useEffect } from "react"
import MUIDataTable from "mui-datatables"
import styles from "./CandidateList.module.css"
import Call from "../../ui/Call/Call"
import {getCandidateList} from "../../service/CandidateService"


const CandidateList = (props) => {

    const [isCall, setIsCall] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [data, setData] = useState([])
    
    useEffect(() =>{
        getCandidateList()
        .then(res => {
            setData(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


    const toggleCall = (data) => {
        setPhoneNumber(data['PhoneNumber'])
        setIsCall(!isCall)
    }

    const columns = [
        {
         name: "Name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "PhoneNumber",
         label: "Phone Number",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
            name: "Percentage",
            label: "Percentage",
            options: {
             filter: true,
             sort: false,
            }
        // },
        // {
        //  name: "City",
        //  label: "City",
        //  options: {
        //   filter: true,
        //   sort: false,
        //  }
        // },
        // {
        //  name: "State",
        //  label: "State",
        //  options: {
        //   filter: true,
        //   sort: false,
        //  }
        }, {
            name: "Action",
            label: "Call",
            sort: false,
            empty: true,
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div style={{cursor: "pointer"}}>
                            <i
                            onClick={() => {
                                toggleCall(data[tableMeta.rowIndex])
                            }} 
                            className="fa fa-phone" 
                            aria-hidden="true"/>                            
                        </div>
                    );
                  }
            }
        }
       ];
       
       
        const options = {
          selectableRows: false,
        };
       
        return (
            <>
            {
                isCall ?
                <Call
                phoneNumber={phoneNumber}
                toggleCall={setIsCall}
                /> : null
            }
                <div className={styles['table']}>
                    <MUIDataTable
                    title={"Employee List"}
                    data={data}
                    columns={columns}
                    options={options}
                    />
                </div>
            </>
            )
}

export default CandidateList