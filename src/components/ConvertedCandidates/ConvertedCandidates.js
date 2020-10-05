import React, { useState, useEffect } from "react"
import MUIDataTable from "mui-datatables"
import styles from "./ConvertedCandidates.module.css"
import Call from "../../ui/Call/Call"
import { getConvertedCandidateList } from "../../service/CandidateService"
import Title from "../../ui/Title/Title"


const ConvertedCandidates = (props) => {

    const [isCall, setIsCall] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [id, setId] = useState("")
    const [data, setData] = useState([])
    
    useEffect(() =>{
        getConvertedCandidateList()
        .then(res => {
            if(res.status === 200) {
                setData(res.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


    const toggleCall = (data) => {
        setPhoneNumber(data['PhoneNumber'])
        setId(data['_id'])
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
        // {
        //     name: "details",
        //     label: "Current Teacher",
        //     options: {
        //      filter: true,
        //      sort: false,
        //      customBodyRender: (value) => {
        //      return <p>{value[0].Name}</p>
        //      }
        //     }
        //    },
        {
            name: "percentage",
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
            name: "Catagory",
            label: "Category",
            options: {
             filter: true,
             sort: false,
            }
           }
       ];

    if(localStorage.getItem("type").toLowerCase() === "teacher") {
        columns.push({
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
        })
    }

    columns.push( {
        name: "Percentage",
        label: "View",
        sort: false,
        empty: true,
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <button
                    onClick={() => {
                        props.history.push("/candidates/update", data[tableMeta.rowIndex])
                    }} 
                    className="button"
                    style={{backgroundColor: "#008000c4", height: "35px", width: "60px", color: "white", margin: 0}}>
                        View
                    </button>
                );
              }
        }
    })
       
    const onAddStudent = () => {
        props.history.push('/candidates/add')
    }
       
        const options = {
          selectableRows: false,
        };
       
        return (
            <div style={{marginTop: "2rem"}}>
             <Title
             hideButton={true}
            onClick={onAddStudent} 
            title="Converted Candidates" />
            {
                isCall ?
                <Call
                id={id}
                phoneNumber={phoneNumber}
                toggleCall={setIsCall}
                /> : null
            }
                <div className={styles['table']}>
                    <MUIDataTable
                    title={"Converted Candidates"}
                    data={data}
                    columns={columns}
                    options={options}
                    />
                </div>
            </div>
            )
}

export default ConvertedCandidates