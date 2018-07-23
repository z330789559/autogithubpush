import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter, Route,Link,Redirect,Switch} from 'react-router-dom';
const { SubMenu } = Menu;
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;
import '../../stylesheets/style.css'
import User from "./user";
import Login from "./login";
import About from "./about";
import AddServer from "./serverpublish/addServer";
import AddBranch from "./gitmanage/addBranch";
import BranchList from "./gitmanage/branchList";
import ProjectList from "./gitmanage/projectList";
import ServerList from "./serverpublish/serverList";




export default class extends React.Component{

   render(){
       let  menubars=[{name:"login"},{name:"user"}]
       let  autoPublishMenu=[{name:"addServer"},{name:"serverList"}]
       let  gitlabOperatorMenu=[{name:"addBranch"},{name:"branchList"},{name:"projectlist"}]
       return  (
           <Layout>
               <Header className="header">
                   <div className="logo" />
                   <Menu
                       theme="dark"
                       mode="horizontal"
                       defaultSelectedKeys={['2']}
                       style={{ lineHeight: '64px' }}
                   >{menubars.map(function(menu,index){
                       return <Menu.Item key={index } ><Link to={'/home/'+ menu.name} >{menu.name}</Link></Menu.Item>
                   })}
                   </Menu>
               </Header>
               <Content style={{ padding: '0 50px' }}>
                   <Breadcrumb style={{ margin: '16px 0' }}>
                       <Breadcrumb.Item>Home</Breadcrumb.Item>
                       {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                   </Breadcrumb>
                   <Layout style={{ padding: '24px 0', background: '#fff' }}>
                       <Sider width={200} style={{ background: '#fff' }}>
                           <Menu
                               mode="inline"
                               defaultSelectedKeys={['1']}
                               defaultOpenKeys={['sub1']}
                           >
                               <SubMenu key="sub1" title={<span><Icon type="user" />用户</span>}>
                                   {menubars.map(function(menu,index){
                                       return <Menu.Item key={index + menu.name}><Link to={'/home/'+ menu.name} >{menu.name}</Link></Menu.Item>
                                   })}
                               </SubMenu>
                               <SubMenu key="sub2" title={<span><Icon type="cloud" />自动部署</span>}>
                                   {autoPublishMenu.map(function(menu,index){
                                       return <Menu.Item key={index + menu.name}><Link to={'/home/'+ menu.name} >{menu.name}</Link></Menu.Item>
                                   })}
                               </SubMenu>
                               <SubMenu key="sub3" title={<span><Icon type="usb" />gitlab操作</span>}>
                                   {gitlabOperatorMenu.map(function(menu,index){
                                       return <Menu.Item key={index + menu.name}><Link to={'/home/'+ menu.name} >{menu.name}</Link></Menu.Item>
                                   })}
                               </SubMenu>
                           </Menu>

                       </Sider>
                       <Content style={{ padding: '0 24px', minHeight: 280 }}>
                           <Switch>
                           <Route exact strict path="/home/" component={Login}/>
                           <Route  path="/home/user" component={User} />
                           <Route  path="/home/login" component={Login} />
                           <Route  path="/home/addServer" component={AddServer} />
                           <Route  path="/home/serverList" component={ServerList} />
                           <Route  path="/home/addBranch" component={AddBranch} />
                           <Route  path="/home/branchList" component={BranchList} />
                           <Route  path="/home/projectlist" component={ProjectList} />
                           <Route  path="/home/about" component={About} />
                           <Redirect exact strict from="/home" to="/home/" />
                           </Switch>
                       </Content>
                   </Layout>
               </Content>
               <Footer style={{ textAlign: 'center' }}>

               </Footer>
           </Layout>
       )
   }
    }

