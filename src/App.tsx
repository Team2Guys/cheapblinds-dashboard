import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import { AdminPanelSettings, People, Category, Layers, Inventory } from "@mui/icons-material";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider, dataProvider } from "#providers";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  Login,
  Dashboard,
  AdminCreate,
  AdminEdit,
  AdminList,
  AdminShow,
  UserEdit,
  UserList,
  UserShow,
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
  SubcategoryCreate,
  SubcategoryEdit,
  SubcategoryList,
  SubcategoryShow,
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              authProvider={authProvider}
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <Category />,
                  },
                },
                {
                  name: "subcategories",
                  list: "/subcategories",
                  create: "/subcategories/create",
                  edit: "/subcategories/edit/:id",
                  show: "/subcategories/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <Layers />,
                  },
                },
                {
                  name: "products",
                  list: "/products",
                  create: "/products/create",
                  edit: "/products/edit/:id",
                  show: "/products/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <Inventory />,
                  },
                },
                {
                  name: "users",
                  list: "/users",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <People />,
                  },
                },
                {
                  name: "admins",
                  list: "/admins",
                  create: "/admins/create",
                  edit: "/admins/edit/:id",
                  show: "/admins/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <AdminPanelSettings />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "m4vnM5-C8do39-XShqJI",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayout Header={Header}>
                        <Outlet />
                      </ThemedLayout>
                    </Authenticated>
                  }
                >
                  {/* <Route index element={<NavigateToResource resource="admins" />} /> */}
                  <Route index path="/" element={<Dashboard />} />
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="/subcategories">
                    <Route index element={<SubcategoryList />} />
                    <Route path="create" element={<SubcategoryCreate />} />
                    <Route path="edit/:id" element={<SubcategoryEdit />} />
                    <Route path="show/:id" element={<SubcategoryShow />} />
                  </Route>
                  <Route path="/products">
                    <Route index element={<ProductList />} />
                    <Route path="create" element={<ProductCreate />} />
                    <Route path="edit/:id" element={<ProductEdit />} />
                    <Route path="show/:id" element={<ProductShow />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route path="edit/:id" element={<UserEdit />} />
                    <Route path="show/:id" element={<UserShow />} />
                  </Route>
                  <Route path="/admins">
                    <Route index element={<AdminList />} />
                    <Route path="create" element={<AdminCreate />} />
                    <Route path="edit/:id" element={<AdminEdit />} />
                    <Route path="show/:id" element={<AdminShow />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler handler={() => "Dashboard | CheapBlinds"} />;
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
