import { useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useSharePoint } from "../hooks/useSharePoint";
import CustomToolbar from "../components/MuiDatatable/CustomToolbar";
import CustomToolbarSelect from "../components/MuiDatatable/CustomToolbarSelect";
import AddEditDrawer from "../components/MuiDatatable/AddEditDrawer";

const columns = [
  {
    name: "ID",
    label: "ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Title",
    label: "Title",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Surname",
    label: "Surname",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Department",
    label: "Department",
    options: {
      filter: true,
      sort: true,
    },
  },
];

const Page1 = () => {
  const { spData, isLoading } = useSharePoint();
  const [drawerAddOpen, setdrawerAddOpen] = useState(false);

  const handleDrawerToggle = () => {
    setdrawerAddOpen(!drawerAddOpen);
  };

  return (
    <div>
      <MUIDataTable
        title={
          <Typography variant='h6'>
            Employee list
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={spData}
        columns={columns}
        options={{
          filterType: "dropdown",
          elevation: 2,
          selectableRowsOnClick: false,
          rowsPerPage: 10,
          customToolbar: () => {
            return (
              <CustomToolbar
                handleDrawerToggle={handleDrawerToggle}
                drawerAddOpen={drawerAddOpen}
              />
            );
          },
          customToolbarSelect: (selectedRows) => (
            <CustomToolbarSelect selectedRows={selectedRows} />
          ),
        }}
      />
      <AddEditDrawer handleDrawerToggle={handleDrawerToggle} drawerAddOpen={drawerAddOpen} />
    </div>
  );
};

export default Page1;
