import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route,Link } from 'react-router-dom';
import Home from './pages/home';
import 'antd/dist/antd.css'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
          </div>
    );
    }
}


// 创建 react 路由
const routes = (
    <BrowserRouter basename="/web">
               <App>
                   <Route exact path="/"  component={Home}/>
                   <Route path="/home"  component={Home}/>
               </App
               >
    </BrowserRouter>
);


// 渲染 react 应用
render(routes, document.getElementById('app-root'));