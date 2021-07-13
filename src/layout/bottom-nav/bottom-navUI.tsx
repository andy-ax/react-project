import React, {Component} from 'react';
import { Carousel } from 'zarm';

class BottomNavUI extends Component{
    navListRender() {
        const props: any = this.props;
        return props.data.map((x: any, i: number) => {
            return <div className="nav-item">
                <div className="item-img">
                    <img src={x.src} />
                </div>
                <p className="item-name">{x.name}</p>
            </div>
        })
    }

    render() {
        return <div className="bottom-nav">
            <div className="nav-container">{
                this.navListRender()
            }</div>
        </div>
    }
}