import React, { Component } from 'react';
import { Cell, Input } from 'zarm';
import { reduxForm } from 'redux-form';

import { SearchInput, DetailCard } from '../common'

export class HomepageUI extends Component {

    refs: any;

    headerChildCreate() {
        const props: any = this.props;
        const headerData: any[] = props.header.data;
        return headerData.map((x, i) => {
            return <div className="carousel__item__pic" key={i}>
                <img src={x.src} alt="" draggable={false} />
            </div>
        })
    }

    render() {
        const props: any = this.props;
        return <section>
            <header>
                <Cell title="todo">
                    <Input
                        ref="headerInput"
                        clearable
                        type="text"
                        placeholder="请输入"
                        value={props.header.value}
                        onChange={props.header.onChange}
                    />
                </Cell>
            </header>
            <main>
            </main>
            <footer>
            </footer>
        </section>
    }
}