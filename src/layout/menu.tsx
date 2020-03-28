import { Menu } from 'antd';
import * as React from 'react';
import config from '../common/router'
import './style.less'
interface IImenuState {
    selectedKeys: string[];
}
class App extends React.Component<any, IImenuState> {
    constructor(props) {
        super(props)
        this.state = {
            selectedKeys: []

        }
    }
    public componentDidMount = () => {
        let selectKeys = this.props.history.location.pathname.split('/').splice(-1, 1)
        selectKeys = selectKeys.map(element => {
            element = "/" + element
            return element
        })
        this.setState({
            selectedKeys: selectKeys
        })
    }
    public menuSelect = (item: any) => {
        this.props.history.push(item.key)
        this.setState({
            selectedKeys: item.key
        })
    }
    public render() {
        return (
            <Menu
                mode="inline"
                onSelect={this.menuSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {
                    config.map((ele) => {
                        return <Menu.Item key={ele.path}>{ele.name}</Menu.Item>
                    })
                }
            </Menu>
        );
    }
}

export default App;
