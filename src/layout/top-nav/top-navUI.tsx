import React, {Component} from 'react';
import { Carousel } from 'zarm';

class TopNavUI extends Component{

    leftSideRender() {
        const props: any = this.props;
        const menuList: any[] = props.menuList;
        return menuList.map((x, i) => {
            const secondList: any[] = x.data;
            const secondListDom = secondList.map((y, j) => {
                return <div className="second-item" key={y.name}>
                    <p>{y.name}</p>
                </div>
            })
            return <div className="first-list" key={x.name}>
                <div className="first-item">
                    <p>{x.name}</p>
                    <div className="second-list" style={{display: (x.show ? 'block' : 'none')}}>
                        {secondListDom}
                    </div>
                </div>
            </div>
        })
    }

    render() {
        const props: any = this.props;
        return <div className="top-nav">
            <div className="top-nav-container">
                <div className="left-nav" onClick={props.menuClick}>
                    <div className="menu-img">
                        <img src={props.menuSrc} />
                    </div>
                </div>
                <div className="main-nav">
                    <div className="icon-img">
                        <img src={props.iconSrc} />
                    </div>
                </div>
                <div className="right-nav">
                    <div className="chart-img">
                        <img src={props.chartSrc} />
                    </div>
                    <div className="cart-img">
                        <img src={props.cartSrc} />
                    </div>
                </div>
            </div>
            <div className="left-side-menu">
                <div className="left-side">
                    {this.leftSideRender()}
                </div>
            </div>
        </div>
    }
}