import MUIDataTable from "mui-datatables";
import { useSharePoint } from "../hooks/useSharePoint";

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

/* const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
]; */

const options = {
  filterType: "checkbox",
};

const Page1 = () => {
  const { spData, isLoading } = useSharePoint();
  return (
    <div>
      <MUIDataTable title={"Employee List"} data={spData} columns={columns} options={options} />
    </div>
  );
};

export default Page1;
