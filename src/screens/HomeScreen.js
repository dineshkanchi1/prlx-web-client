import React, { useEffect, useState } from 'react'
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import { DataGrid } from '@material-ui/data-grid';
/**
* @author
* @function HomeScreen
**/

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const {users,loading,error} = userList;
  useEffect(() => {
    dispatch(listUsers());
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 70 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'interest', headerName: 'Interest', width: 130 },
  ];

  
  return(
    <div>
      {loading?(
          <LoadingBox />
        ):error? (
          <MessageBox variant="danger">{error}</MessageBox>
        ):(
          <div style={{ height: 400, width: '100%', fontStyle: "bold"}}>
            <DataGrid 
            rows={users} 
            columns={columns.map((column) => ({
                ...column,
                disableClickEventBubbling: true,
            }))}
            pageSize={5}
            pagination
            style={{fontStyle: "bold !important"}}
            />
        </div>
        )
      } 
    </div>
   )

 }

export default HomeScreen