import React, { useState, useEffect } from "react"
import MUIDataTable from "mui-datatables"
import { getCandidateList } from "../../../../service/CandidateService"
import { withRouter } from "react-router-dom"


const Table = (props) => {

    // const [data, setData] = useState([])
    
    // useEffect(() =>{
    //     setData(getCandidateList())
    // }, [])

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
            name: "percentage",
            label: "Percentage",
            options: {
             filter: true,
             sort: false,
            }
        },{
            name: "Catagory",
            label: "Category",
            options: {
             filter: true,
             sort: false,
            }
        },
        {
            name: "Percentage",
            label: "View",
            sort: false,
            empty: true,
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button
                        onClick={() => {
                            props.history.push("/candidates/update", props.data[tableMeta.rowIndex])
                        }} 
                        className="button"
                        style={{backgroundColor: "#008000c4", height: "35px", width: "60px", color: "white", margin: 0}}>
                            View
                        </button>
                    );
                  }
            }
        }
       ];
       
        return (
            <>
                <MUIDataTable
                title={"Candidate List"}
                data={props.data}
                columns={columns}
                options={
                    {
                        onRowsSelect: (meta, metaData) => {

                            let selected = metaData.map((el) => {
                                return props.data[el.index]
                            })

                            props.setSelectedRows(selected)
                        }
                    }
                }
                />
            </>
            )
}

export default withRouter(Table)
 