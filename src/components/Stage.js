import React, { Component } from 'react';
import "../css/Stage.css";

// 获取图片的相关数据
let imageDatas = require('../data/imgData.json');

// 将图片名信息转成路径信息
imageDatas = (function getImgURL(img) {
    for (let i = 0, j = img.length; i < j; i++) {
        let singleImgData = img[i];
        singleImgData.imgURL = require('../img/' + singleImgData.fileName);
        img[i] = singleImgData;
    }
    return img;
})(imageDatas);

class ImgFigure extends Component {
    render() {
        const { imgURL, title, desc } = this.props.data;
        return(
            <figure className="img-figure">
                <img src={ imgURL } alt={ title } width="230" height="178" />
                <figcaption>
                    <h2>{ desc }</h2>
                </figcaption>
            </figure>
        );
    }
}

class Stage extends Component {
    render() {
        let controllerUnits = [],
            imgFigures = [];
        imageDatas.forEach(value => {
            imgFigures.push(<ImgFigure data={value} key={value.fileName}/>)
        });
        return(
            <section className="stage">
                <section className="img-sec" >
                   { imgFigures }
                </section>
                <nav className="controller-nav">
                    { controllerUnits }
                </nav>
            </section>
        );
    }
}

export default Stage;