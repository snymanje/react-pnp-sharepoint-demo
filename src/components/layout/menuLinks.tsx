import { AddCircleOutlined, SubjectOutlined, Edit } from "@material-ui/icons";

export const menuItems = [
  {
    text: "Home",
    icon: <SubjectOutlined color='secondary' />,
    path: "/",
  },
  {
    text: "Page 1",
    icon: <Edit color='secondary' />,
    path: "/page1",
  },
  {
    text: "Page 2",
    icon: <AddCircleOutlined color='secondary' />,
    path: "/page2",
  },
];
