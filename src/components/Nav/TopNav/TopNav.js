import { Component } from "react";
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from "@reach/router";
import { menuConfig } from './topNavMenuConfig';
import { navbar, dropdown, dropbtn, dropdownContent } from '../../../styles/topNavStyles'

// import "./TopNav.css";

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

    renderMenu = (menuConfig, index) => {
        if (menuConfig.type === 'button') {
            return this.renderButton(menuConfig, index)
        }
        if (menuConfig.type === 'dropdown') {
            return this.renderDropDownMenu(menuConfig, index)
        }
    }

    renderButton = (menuConfig, index) => {
        let menuName = menuConfig.name;
        return (<div key={index} css={dropdown}>
            <Link to={menuConfig.link.to} >
            <button
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                menu-name={menuName}
                css={dropbtn}
            >
                {menuName}
            </button>
            </Link>
        </div>)
    }

    renderDropDownMenu = (menuConfig, index) => {
        let menuName = menuConfig.name;
        return (<div key={index} css={dropdown}>
            <button
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                menu-name={menuName}
                css={dropbtn}
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
                css={dropdownContent}
            >
                {menuConfig.items.map((menuItem, index) => {
                    return (<Link key={index} menu-name={menuName} to={menuItem.to}>{menuItem.text}</Link>)
                })}
            </div>
        </div>)
    };

    render() {
        return (
            <div>
                <div css={navbar}>
                    {menuConfig.map((menu, index) => {
                        return this.renderMenu(menu, index)
                    })}
                </div>
            </div>
        );
    }
}

export default TopNav;
