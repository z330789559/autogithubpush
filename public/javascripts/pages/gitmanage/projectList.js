import React,{ Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import Gitlab_listView from '../../components/gitlab_listView';
import { BrowserRouter, Route,Link } from 'react-router-dom';
export default class ProjectList extends Component{
    constructor(props){
        super();
        this.state={
            url:null
        }
    }
    // componentDidMount(){
    //     let {match,history}=this.props,user_id= match.params.userid;
    //    if(!!user_id){
    //
    //    }else{
    //        history.back()
    //    }
    // }
    renderItem (item){
        return (<List.Item  actions={[<Link to={item.id + '/branchList'}  id={item.id}>分支列表</Link>,<Link to={item.id + '/deleteProject'}  id={item.id}>删除项目</Link>]}>
                <List.Item.Meta
                    name={item.name}
                    description={item.description}
                />
            </List.Item>
        )}
    render(){
        return(<Gitlab_listView source="/api/projects"  haspage={true} {...this.props} renderItem={this.renderItem}/>
        )
    }
}