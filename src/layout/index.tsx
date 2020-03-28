import { Layout } from 'antd';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom'
import config from '../common/router'
import Menu from './menu';
import './style.less'
const { Header, Footer, Sider, Content } = Layout;
class App extends React.Component<any, {}> {
    public componentDidMount = () => {
        // tslint:disable-next-line: no-console
        console.log(this.props.history)
    }
    public render() {
        return (
            <Layout className="app-body">
                <Sider collapsible={true}>
                    <div className='app-logo' />
                    <Menu history={this.props.history} />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content className="app-content">
                        <Switch>
                            {
                                config.map((item) => {
                                    return <Route path={item.path} key={item.path} component={item.component} />
                                })
                            }
                        </Switch>

                    </Content>
                    <Footer>yueyong@supremind</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;
