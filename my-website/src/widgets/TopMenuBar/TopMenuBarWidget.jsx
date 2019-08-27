import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TopMenuBarContainer from "./containers/TopMenuBarContainer";
export default class TopMenuBarWidget extends React.Component{
    render(){
        return(
            <div className="top-menu-bar">
            <Provider store={store}>
                <TopMenuBarContainer />
            </Provider>
            </div>
        )
    }
}