import $ from 'jquery';
import React from 'react';
import { List, Avatar, Button, Spin } from 'antd';
export default class Gitlab_listView extends React.Component {

    constructor(props) {
        super(props);
        let {haspage}=props;
        this.pageIndex=1;
       this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: !!haspage?true:false,
            data: [],
        }
        this.updateStateFromAjax=this.updateStateFromAjax.bind(this)
    }
      updateStateFromAjax(data){

          let {history}=this.props;
          if(!data || data.status==0){
            return  history.push('login')
          }
         if(!!data && data.status ==1){
             return  this.setState({
                 loading: false,
                  showLoadingMore:false,
                  data:data.user
              })
          }

          if( data.status ==3 &&data.user.length  <20){
           this.setState({
                  showLoadingMore:false
              })
          }else{
              this.pageIndex++;
          }
          this.setState({
              loading: false,
              loadingMore:false,
              data: this.state.data.concat(data.user)
          });

          window.dispatchEvent(new Event('resize'));
      }

      requestServer(){
        let self =this
           $.get(self.props.source+"?pageIndex="+self.pageIndex, (data) => {
              self.updateStateFromAjax(data)
          });
      }
     onLoadMore (){

         this.setState({
             loadingMore: true,
         })
         this.requestServer()
     }
    componentDidMount() {
        this.requestServer()
    }

    render() {
       self=this;
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore.bind(self)}>loading more</Button>}
            </div>
        ) : null;
        return (<div> <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={this.props.renderItem}
        /></div>);
    }
}