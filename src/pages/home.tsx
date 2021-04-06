import MaterialTable from "material-table";
import { useSharePoint } from "../hooks/useSharePoint";

const columns = [
  { title: "ID", field: "ID" },
  { title: "Title", field: "Title" },
  { title: "Name", field: "Name" },
  { title: "Surname", field: "Surname" },
  { title: "Department", field: "Department" },
];

const Page2 = () => {
  const { spData } = useSharePoint();
  spData.map((item) => console.log(Object.keys(item)));
  console.log(spData);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={columns}
        data={spData}
        title='SharePoint Data'
        isLoading={false}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => alert("You want to delete " + rowData),
          },
        ]}
        options={{
          exportButton: true,
          sorting: true,
        }}
      />
    </div>
  );
};

export default Page2;
