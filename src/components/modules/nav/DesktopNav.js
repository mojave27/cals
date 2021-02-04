import React, { Component } from "react";
import { Link } from "@reach/router";
import { menuConfig } from './navMenuConfig';
// import { menuConfig } from './topNavMenuConfig';

import "./TopNav.css";

class TopNav extends Component {
  state = {
    display: {}
  };

  handleClick = event => {
    this.toggleDisplay(event, "none");
  };

  mouseOver = event => {
    this.toggleDisplay(event, "block");
  };

  mouseOut = event => {
    this.toggleDisplay(event, "none");
  };

  toggleDisplay = (event, displayType) => {
    const menuName = event.target.getAttribute("menu-name");
    let display = this.state.display;
    display[menuName] = displayType;
    this.setState({ display: display });
  };

  renderDropDownMenu = (dropDown, index) => {
    let menuName = dropDown.name;
    return (
      <div key={index} className="dropdown">
        <button
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          menu-name={menuName}
          className="dropbtn"
        >
          {menuName}
          <i className="fa fa-caret-down" />
        </button>
        <div
          style={{ display: this.state.display[menuName] }}
          menu-name={menuName}
          onClick={this.handleClick}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          className="dropdown-content"
        >
        {dropDown.items.map( (menuItem, index) => {
          return (<Link key={index} menu-name={menuName} to={menuItem.to}>{menuItem.text}</Link>)
        })}
        </div>
      </div>
    );
  };

  renderMenuItem = (item, index) => {
    switch (item.type) {
      case 'button':
        console.log('render a button')
        return this.renderButton(item, index)
      case 'dropdown':
        console.log('render a dropdown')
        return this.renderDropDownMenu(item, index)
      case 'functionButton':
        console.log('render a function button')
        break;
      default:
        console.log('unknown menu item type')
    }
  }

  renderButton = (item, index) => {
    console.log(JSON.stringify(item))
    return <Link to={item.link.to}>{item.link.text}</Link>
  }

  render() {
    return (
      <div style={{marginBottom: '30px'}}>
        <div className="navbar">
          {/* <Link to="/">home</Link> */}
          {/* <a href="https://fdc.nal.usda.gov/" target={'_blank'}>usda-db</a> */}
          { menuConfig.map( (menu, index) => {
            // return this.renderDropDownMenu(menu, index)
            return this.renderMenuItem(menu, index)
            })
          }
        </div>
      </div>
    );
  }
}

export default TopNav;
