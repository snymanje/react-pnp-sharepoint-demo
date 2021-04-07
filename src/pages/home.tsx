import { CircularProgress, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useSharePoint } from "../hooks/useSharePoint";
import CustomToolbar from "../components/MuiDatatable/CustomToolbar";
import CustomToolbarSelect from "../components/MuiDatatable/CustomToolbarSelect";

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

const options = {
  filterType: "dropdown",
  elevation: 2,
  selectableRowsOnClick: false,
  rowsPerPage: 10,
  customToolbar: () => {
    return <CustomToolbar />;
  },
  customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} />,
};

const Page1 = () => {
  const { spData, isLoading } = useSharePoint();
  return (
    <div>
      <MUIDataTable
        title={
          <Typography variant='h6'>
            ACME Employee list
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
        options={options}
      />
    </div>
  );
};

export default Page1;
