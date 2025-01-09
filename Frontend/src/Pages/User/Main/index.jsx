
import { useEffect } from 'react'
import axios from "axios"
import '../../../App.css'
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { NavLink} from 'react-router-dom'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function CustomizedTables() {
  let [cars,setCars]=useState([])
function getData(){
  axios.get("http://localhost:3311/cars")
  .then((res)=>{
    setCars(res.data)
  })
}
useEffect(()=>{
   getData()
},[])


  async  function handleDelete(id){
   await axios.delete(`http://localhost:3311/cars/${id}`)
   getData()
}
  return (
    <section id='Table-sec'>


      <NavLink to='/addform'> <Button className='nav-btn' variant="outlined" >ADD CAR</Button></NavLink>

          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Brand</StyledTableCell>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Functions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((row) => (
            <StyledTableRow className='Tableim' style={row.isNew ? {backgroundColor:'Green'} : {backgroundColor:'Red'}}   key={row.name}>
              <StyledTableCell className='tabcell' component="th" scope="row">
                {row.brandName}
              </StyledTableCell>
              <StyledTableCell className='tabcell' align="right">{row.modelName}</StyledTableCell>
              <StyledTableCell className='tabcell' align="right">{row.year}</StyledTableCell>
              <StyledTableCell className='tabcell' align="right">{row.color}</StyledTableCell>
              <StyledTableCell className='tabcell' align="right"><Button onClick={()=>handleDelete(row._id)} variant="outlined" color="error">Delete</Button> <Button variant="outlined" color="warning">Edit</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  );
}