import React, { Component } from 'react';
import ReactDOM from "react-dom";
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
                    <p>{ desc }</p>
                </figcaption>
            </figure>
        );
    }
}

class Stage extends Component {
    componentDidMount() {
        let stageDOM = ReactDOM.findDOMNode(this.stage),
            stageX = stageDOM.scrollWidth,
            stageY = stageDOM.scrollHeight;
        console.log(stageX);
    }
    render() {
        let controllerUnits = [],
            imgFigures = [];
        
        imageDatas.forEach(value => {
            // 这里的key一般配置的是图片的ID
            imgFigures.push(<ImgFigure data={value} key={value.fileName} />);
        });
        return(
            <section className="stage" ref={node => { this.stage = node; }}>
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

Stage.defaultProps = {
    Constant: {
        // 中间的图片
        centerPos: {
            left: 0,
            right: 0
        },
        // 水平方向的取值范围
        hPosRange: { 
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        // 垂直方向的取值范围
        vPosRange: {
            x: [0, 0],
            topY: [0, 0]
        }
    }
}

export default Stage;