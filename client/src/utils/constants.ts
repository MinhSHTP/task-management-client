import DashboardIcon from "@mui/icons-material/Dashboard";
import TasksIcon from "@mui/icons-material/Task";
import GroupsIcon from "@mui/icons-material/Groups";

const loginRoute = "/login";
const dashboardRoute = "/dashboard";
const tasksRoute = "/tasks";
const groupsRoute = "/groups";

const APP_PATH = {
  LOGIN_ROUTE: loginRoute,
  DASHBOARD_ROUTE: dashboardRoute,
  TASKS_ROUTE: tasksRoute,
  GROUPS_ROUTE: groupsRoute,
};

const INITIAL_DASHBOARD_MENU_ITEMS = [
  {
    title: "Dashboard",
    path: APP_PATH.DASHBOARD_ROUTE,
    icon: DashboardIcon,
  },
  {
    title: "Tasks",
    path: APP_PATH.TASKS_ROUTE,
    icon: TasksIcon,
  },
  {
    title: "Groups",
    path: APP_PATH.GROUPS_ROUTE,
    icon: GroupsIcon,
  },
];

export { APP_PATH, INITIAL_DASHBOARD_MENU_ITEMS };
