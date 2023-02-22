import React from "react";

import { Refine, AuthProvider} from '@pankod/refine-core';
    import { notificationProvider
,RefineSnackbarProvider
,CssBaseline
,GlobalStyles
,ReadyPage
,ErrorComponent} from '@pankod/refine-mui';

import { AccountCircleOutlined, ChatBubbleOutline, PeopleAltOutlined, StarOutlineRounded, VillaOutlined } from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "./contexts";
import { Title, Sider, Layout, Header } from "./components/layout"
import { Login, Home, Agents, MyProfile, PropertyDetails, AllProperties, CreateProperty, AgentProfile, EditProperty } from "./pages";
import { CredentialResponse } from "./interfaces/google";
import { parseJwt } from "./utils/parse-jwt";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
const token = localStorage.getItem("token");
if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
} else {
    request.headers = {
        Authorization: `Bearer ${token}`,
    };
}

return request;
});



function App() {
    

    
            const authProvider: AuthProvider = {
                login: ({ credential }: CredentialResponse) => {
                    const profileObj = credential ? parseJwt(credential) : null;
        
                    if (profileObj) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify({
                                ...profileObj,
                                avatar: profileObj.picture,
                            }),
                        );
                    }
            
localStorage.setItem("token", `${credential}`);

                    return Promise.resolve();
                },
                logout: () => {
                    const token = localStorage.getItem("token");
        
                    if (token && typeof window !== "undefined") {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        axios.defaults.headers.common = {};
                        window.google?.accounts.id.revoke(token, () => {
                            return Promise.resolve();
                        });
                    }
        
                    return Promise.resolve();
                },
                checkError: () => Promise.resolve(),
                checkAuth: async () => {
                    const token = localStorage.getItem("token");
        
                    if (token) {
                        return Promise.resolve();
                    }
                    return Promise.reject();
                },
        
                getPermissions: () => Promise.resolve(),
                getUserIdentity: async () => {
                    const user = localStorage.getItem("user");
                    if (user) {
                        return Promise.resolve(JSON.parse(user));
                    }
                },
            };
        
            
    
    return (
        <ColorModeContextProvider>
<CssBaseline />
<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
<RefineSnackbarProvider>
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
notificationProvider={notificationProvider}
ReadyPage={ReadyPage}
catchAll={<ErrorComponent />}
resources={[
                    {
                        name: "property",
                        icon: <VillaOutlined />,
                        list: AllProperties,
                        show: PropertyDetails,
                        create: CreateProperty,
                        edit: EditProperty,
                    },
                    {
                        name: "agent",
                        icon: <PeopleAltOutlined />,
                        list: Agents,
                        show: AgentProfile,
                    },
                    {
                        name: "review",
                        icon: <StarOutlineRounded />,
                        list: Home,
                    },
                    {
                        name: "message",
                        icon: <ChatBubbleOutline />,
                        list: Home,
                    },
                    {
                        name: "my-profile",
                        icon: <AccountCircleOutlined />,
                        options: { label: 'My Profile'},
                        list: MyProfile,
                    },
                ]}
Title={Title}
Sider={Sider}
Layout={Layout}
Header={Header}
routerProvider={routerProvider}
authProvider={authProvider}
LoginPage={Login} 
DashboardPage={Home} />
        </RefineSnackbarProvider>


</ColorModeContextProvider>
      );
};

export default App;
