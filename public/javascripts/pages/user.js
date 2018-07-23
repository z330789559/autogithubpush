import React from 'react';
import Gitlab_listView from '../components/gitlab_listView';
import { List, Avatar, Button, Spin } from 'antd';
import { BrowserRouter, Route,Link } from 'react-router-dom';
export default class User extends React.Component{
    renderItem (item){
        return (<List.Item  actions={[<Link to={item.id + '/projectList'}  id={item.id}>查看git项目</Link>]}>
            <List.Item.Meta
                avatar={<Avatar src={item.avatar_url}/>}
                name={item.name}
                description={item.web_url}
            />
        </List.Item>
    )}
    render(){
    return (
        <div>
            <p>用户列表</p>
            <Gitlab_listView source="/api/getUserList"  haspage={true} {...this.props} renderItem={this.renderItem}/>

        </div>);}}


