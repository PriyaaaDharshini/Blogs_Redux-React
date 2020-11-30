import React, {Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import 'antd/dist/antd.css';
import Login from './components/login';
import Registration from './components/register';

import Posts from './containers/Posts';
import Home from './containers/Home';

import CreatePost from './containers/CreatePost';
import EditPost from './containers/EditPost';

import { history } from './index';


import { Layout,Menu} from 'antd';
const {Content, Header, Footer } = Layout;

class App extends Component {

  constructor(props) {
    super(props);
    
    this.handleClick = e => {
      console.log('click ', e);
      this.setState({ current: e.key });
    };

    this.state = {
      post: null,
      
      // current: '/',
    };
   
    this.onEdit = this.onEdit.bind(this);
  }
 

  onEdit(post) {
    this.setState({post: post});
    history.push({
      pathname: `/edit/${post.id}`,
      state: { 
        post: post,
        
       }
    });    
  }

  render() {
      return (
        <Router >  
         <div className="App">
         <Layout className="layout" >
    <Header style={{ textAlign: 'center' }}>
        {/* <div className="logo" /> */}
      <Menu  theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">Blogs Home</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to='/blogs'>Update Blogs</Link>
        </Menu.Item>
        <Menu.Item key="5">
        <Link to='/login'>Login/Sign Up</Link>
        </Menu.Item>
        
      </Menu>
    </Header>
    
    <Switch>
    
    <Content style={{ padding: '0 20px' }}>
    <div className="site-layout-content">
 
          <Route path="/" 
                  exact 
                  render={ (props) => <Home { ...props } 
                    />} 
                />  
                       
              <Route path="/blogs" 
                  exact 
                  render={ (props) => <Posts isLogged={props.loggedIn}  { ...props } 
                  onEdit={this.onEdit}  />} 
                />
              <Route path="/create/"                   
                  render={ (props) => <CreatePost { ...props } 
                    post={this.state.post}                        
                  />} 
              />
              <Route path="/edit/:id"                   
                  render={ (props) => <EditPost { ...props } 
                    post={this.state.post}                        
                  />} 
                />
                <Route path="/login"                   
                  render={ (props) => <Login { ...props } 
                    post={this.state.post}                        
                  />} 
                />
                
                <Route path="/register"                   
                  render={ (props) => <Registration { ...props } 
                    post={this.state.post}                        
                  />} 
                />
         </div>
         </Content>
         </Switch>
         <Footer style={{ textAlign: 'center' }}>Blog ©2020 by Priya Dharshini</Footer>
  </Layout>
  </div>
   
        </Router>
      );
  }
}

export default App;






 