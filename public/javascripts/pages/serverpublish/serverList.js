import React from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import Gitlab_listView from '../../components/gitlab_listView';
export default class ServerList extends  React.Component{
    renderItem (item){
       return (<List.Item  actions={[<a id={item.key}>删除</a>, <a>修改</a>]}>
            <List.Item.Meta
                projectname={item.key}
                description={'脚本路径: '+item.path}
                title={'项目名称：'+item.key}
            />
        </List.Item>
    )}
    render(){
        return (
            <div>
                <Gitlab_listView source="/api/projectToConfigList"  haspage={false} {...this.props} renderItem={this.renderItem}/>
            </div>
        )
}}