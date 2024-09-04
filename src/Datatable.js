import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { filterCamerasbyLocation,filterCamerasbyStatus } from "./store";
import { buildStyles } from "react-circular-progressbar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import SmartScreenIcon from "@mui/icons-material/SmartScreen";
import BasicModal from "./Updatestatusmodal";
import { CollectionsOutlined, KeyboardArrowDown, Search } from "@mui/icons-material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import RssFeedOutlinedIcon from "@mui/icons-material/RssFeedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box } from "@mui/material";
import Input from "@mui/joy/Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector,useDispatch } from 'react-redux';
import { fetchCameras ,} from "./store";
const activeStyle = {
  cursor: "pointer",
  fontWeight: 600,
  padding: "7px",
  color: "green",
  borderRadius: "4px",
  background: "#e5f4ef",
};
const inactiveStyle = {
  cursor: "pointer",
  fontWeight: 600,
  padding: "7px",
  borderRadius: "4px",
  color: "gray",
  background: "#f0f0f0",
};
const columns = [
  {
    field: "name",
    headerName: "NAME",
    width: 180,
    renderCell: (params) => {
      return (
        <div
          style={{
            cursor: "pointer",
            verticalAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <FiberManualRecordIcon
            fontSize="xl"
            style={{ color: "green" }}
          />{" "}
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "health",
    headerAlign: "center",

    headerName: "HEALTH",
    renderCell: (params) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            verticalAlign:"middle",
            color: "grey",
            justifyContent: "space-around",
          }}
        >
         <FilterDramaIcon  />
          
          {/* <FilterDramaIcon />{" "} */}
          <div style={{ width: 30, height: 30 ,marginBottom:"20px"}}>
            <CircularProgressbar
              styles={buildStyles({
                textColor: "black",
                pathColor: "orange",
                textSize: 35,
              })}
              value={65}
              text={`${params.row.health.cloud}`}
            />
          </div>
          <SmartScreenIcon sx={{ml:1}}/>
          <div style={{ width: 30, height: 30,marginBottom:"20px" }}>
            <CircularProgressbar
              styles={buildStyles({
                textColor: "black",
                pathColor: "green",
                textSize: 35,
              })}
              value={65}
              text={`${params.row.health.cloud}`}
            />
          </div>
        </div>
      );
    },
    width: 130,
  },
  { field: "location", headerName: "LOCATION", width: 230 },
  { field: "recorder", headerName: "RECORDER", width: 230 },
  {
    field: " tasks",
    headerAlign: "center",
    align: "center",
    headerName: "TASK",
    renderCell: (params) => {
      
      return <div style={{ cursor: "pointer" }}>Task {params.row.tasks}</div>;
    },
    width: 210,
  },
  {
    field: "status",
    headerAlign: "center",
    align: "center",
    headerName: "STATUS",
    renderCell: (params) => {
      return (
        <div>
          <span
            style={params.row.status == "Active" ? activeStyle : inactiveStyle}
          >
            {params.row.status}
          </span>
        </div>
      );
    },
    width: 190,
  },

  {
    field: "action",
    headerAlign: "center",
    align: "center",
    headerName: "ACTIONS",
    renderCell: (params) => {
      return (
        <div style={{ cursor: "pointer", marginTop: "6px", color: "gray" }}>
          <DoNotDisturbIcon style={{ fontSize: "20px" }} />
        </div>
      );
    },
    width: 190,
  },
];

const paginationModel = { page: 0, pageSize: 9 };

export default function DataTable() {
  const [data, setData] = useState([]);
  const[filterData,setFilterData]=useState([])
  const [select, setSelect] = useState(false);
  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState();
  const [statusdata, setStatusData] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState(0);
  const[search,setSearch]=useState("");
  const dispatch=useDispatch();
  let state=useSelector((state)=>state.camera.value) || [];
  // let state2=useSelector((state)=>state.camera) || [];


  const [camerasData,setCamerasData]=useState([] );
// console.log(camerasData);
  useEffect(() => {
    dispatch(fetchCameras());
    
  
  }, []);
  useEffect(()=>{
    setCamerasData(state.data);
    setLocationOptions([
      ...new Set(state.data&&state.data.map((item) => item.location)),
    ])
  },[state.data])
  const getData = async () => {
    await fetch('https://api-app-staging.wobot.ai/app/v1/fetch/cameras', {
      headers: { Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy " },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json.data);
        setData(json.data);
        setFilterData(json.data);
        setStatusData(json.data);
        setLocationOptions([
          ...new Set(json.data.map((item) => item.location)),
        ]);
      });
  };

  const handleChangeLocation = (event, value) => {
    dispatch(filterCamerasbyLocation({value,state}));
    if(value!=""){
     
      setCamerasData(state.data.filter((param)=>param.location==value));
    }
    else{
      setCamerasData(state.data)
    }
   


  };
  const handleChangeStatus = (event, value) => {
    dispatch(filterCamerasbyStatus(value))
    if(value!=""){
      setCamerasData(state.data.filter((param)=>param.status==value));
    }
    else{
      setCamerasData(state.data)
    }
  };

  const handleSearch=(e)=>{
    setSearch(e.target.value)
    if(e.target.value!=""){
      setCamerasData(camerasData.filter((data)=>JSON.stringify(data).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1));
    }
    else{
      setCamerasData(state.data);
    }
   

     
  } 
  console.log(locationOptions);
console.log(camerasData)
console.log(state.data)
  return (
    <div sx={{ width: "100%" }}>
      <Box
        sx={{ m: 5, textAlign: "end", display: "flex", justifyContent: "end" }}
      >
        <Input
        value={search}
          onChange={(e)=>{handleSearch(e)}}
          endDecorator={<SearchOutlinedIcon />}
          sx={{
            width: "300px",
            background: "#f3f3f3",
            border: "none",
            outline: "none",
          }}
          size="lg"
          placeholder="search"
        />
      </Box>
      <Box sx={{ ml: 5 }}>
        <h2>Cameras</h2>
      </Box>
      
      <Box sx={{ ml: 5 }}>
        <p style={{ fontSize: "17px" }}>Manage your Camera here</p>
      </Box>
  
      <Box sx={{  display: "flex" ,background:"white",padding:2,ml:5,mr:5,mb:0.5}}>
        <Select
          onChange={handleChangeLocation}
          placeholder="Location"
          startDecorator={<LocationOnOutlinedIcon sx={{ color: "grey" }} />}
          indicator={<KeyboardArrowDown />}
          sx={{ width: 240, color: "gray" }}
        >
          <Option value="">Location</Option>
          {locationOptions&&locationOptions.map((param) => {
              return <Option value={param}>{param}</Option>;
            })}
        </Select>
        <Select
          onChange={handleChangeStatus}
          placeholder="Status"
          startDecorator={<RssFeedOutlinedIcon sx={{ color: "grey" }} />}
          indicator={<KeyboardArrowDown />}
          sx={{ width: 240, ml: 5, color: "gray" }}
        >
          {" "}
          <Option value="">Status</Option>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
          
        </Select>
        <Box sx={{ textAlign: "end", mr: 5 }}>
        {select ? (
          <BasicModal rowSelectionModel={rowSelectionModel}getData={getData}  setCamerasData={setCamerasData} camerasData={camerasData}  />
        ) : (
          ""
        )}
      </Box>
      </Box>
    

      <Box sx={{ml: 5, mr: 5, color: "grey", background: "white"}}>
      <DataGrid
        sx={{color:"#6d6e6f"  }}
        rows={camerasData}
        onRowSelectionModelChange={(selection) => {
          
          if (selection.length == 1) {
            let params = state.data.filter((cell) => cell.id == selection);
            setRowSelectionModel(params[0]);
            setSelect(true);
          } else if (selection.length == 0) {
            setSelect(false);
          }
        }}
        disableMultipleRowSelection={true}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      </Box>
     

    </div>
  );
}