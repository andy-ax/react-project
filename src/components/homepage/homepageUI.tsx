import React, {Component} from 'react';
import { Carousel } from 'zarm';

import { SearchInput, DetailCard } from '../common'

export class HomepageUI extends Component {

    headerChildCreate() {
        const props: any = this.props;
        const headerData: any[] = props.header.data;
        return headerData.map((x, i) => {
            return <div className="carousel__item__pic" key={i}>
                <img src={x.src} alt="" draggable={false} />
            </div>
        })
    }

    carouselCardCreate(dataName: string, size: string) {
        const props: any = this.props;
        const dataList: any[] = props[dataName].data;
        return dataList.map((x, i) => {
            return <DetailCard size={size}></DetailCard>
        })
    }

    render() {
        const props: any = this.props;
        return <section>
            <header>
                <Carousel
                    autoPlay
                    loop
                    direction="left"
                    onChangeEnd={props.header.onChangeEnd}
                >{this.headerChildCreate()}</Carousel>
            </header>
            <main>
                <SearchInput></SearchInput>
                <p>当季热销</p>
                <div className="main-carousel-container">
                    <Carousel
                        autoPlay
                        loop
                        direction="left"
                        onChangeEnd={props.main.onChangeEnd}
                    >{this.carouselCardCreate('main', 'big')}</Carousel>
                </div>
            </main>
            <footer>
                <p>镇店星品</p>
                <div className="footer-carousel-container">
                    <Carousel
                        autoPlay
                        loop
                        direction="left"
                        onChangeEnd={props.main.onChangeEnd}
                    >{this.carouselCardCreate('footer', 'normal')}</Carousel>
                </div>
            </footer>
        </section>
    }
}