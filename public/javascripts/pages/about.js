import React,{ Component } from 'react';

export default class About extends Component {
    constructor(prop){
        super(prop)
        this.state={
            count:0
        }
    }
    componentDidMount(){
        console.log("开始执行componentDidMount")
        this.setState({
                count:this.state.count+1
            }
        )
        this.setState({
                count:this.state.count+1
            }
        )
        this.setState({
                count:this.state.count+1
            }
        )

    }
    render() {
        let {count}=this.state;
        console.log(count)
        return (
            <div>
                <h3>about{this.state.count}</h3>
            </div>
        )
    }
}
