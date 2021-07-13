import React, {Component} from 'react';
export class DetailCard extends Component {
    static defaultProps = {
        size: 'normal',
    }
    
    render() {
        const props: any = this.props
        return <div className={props.size}>DetailCard</div>
    }
}