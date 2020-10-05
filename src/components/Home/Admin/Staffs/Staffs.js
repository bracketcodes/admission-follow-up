import React, {useEffect, useState} from "react"
import styles from "./Staffs.module.css"
import MUIDataTable from "mui-datatables"
import { getStaffList } from "../../../../service/StaffService"
import Title from "../../../../ui/Title/Title"
import { withRouter } from "react-router-dom"
import { getThemeProps } from "@material-ui/styles"
import Input from "../../../../ui/Input/Input"
import { validate, getInitialValue }  from "./AddStaff/AddStaff"

export const columns = [
    {
     name: "Name",
     label: "Name",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Catagory",
     label: "Category",
     options: {
      filter: true,
      sort: false,
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
        name: "noOfStudentsAllocated",
        label: "No. of students",
        options: {
         filter: true,
         sort: false,
        }
    }
   ];

export const options = {
    selectableRows: false,
};


const Staffs = (props) => {
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
         name: "Catagory",
         label: "Category",
         options: {
          filter: true,
          sort: false,
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
        //     name: "noOfStudentsAllocated",
        //     label: "No. of students",
        //     options: {
        //      filter: true,
        //      sort: false,
        //     }
        // }
         {
            name: "password",
            label: "View",
            sort: false,
            empty: true,
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button
                        onClick={() => {
                            props.history.push("/staffs/update", data[tableMeta.rowIndex])
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

    const [data, setData] = useState([])
    const [currentStaff, setCurrentStaff] = useState(null)
    const [name, setName] = useState(getInitialValue())
    const [department, setDepartment] = useState(getInitialValue())
    const [phoneNumber, setPhoneNumber] = useState(getInitialValue())
    const [password, setPassword] = useState(getInitialValue())

    useEffect(() => {
        if(data.length == 0) {
            getStaffList()
            .then(res => {
                if(res.status === 200) {
                    setData(res.data)
                }
            })
            .catch(err => {

            })
        }
    }, [])

    
    const addStaff = () => {
        props.history.push("/staffs/add")
    }

    return (
        <div className={styles["staffs-block"]}>
            <Title
            onClick={addStaff} 
            title="Staffs" />
            <div className={styles['table']}>
                <MUIDataTable
                title={"Staffs"}
                data={data}
                columns={columns}
                options={options}
                />
            </div>
        </div>
    )
}

export default withRouter(Staffs)
