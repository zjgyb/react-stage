import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "../css/Stage.css";

// 获取图片的相关数据
let imageDatas = require('../data/imgData.json');

// 将图片名信息转成路径信息
imageDatas = ((img) => {
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

    // 组件加载后后。为每张图片计算距离范围
    componentDidMount() {

        // 取舞台范围
        let stageDOM = ReactDOM.findDOMNode(this.stage),
            stageX = stageDOM.scrollWidth,
            stageY = stageDOM.scrollHeight,
            halfStageX = Math.floor(stageX / 2),
            halfStageY = Math.floor(stageY / 2);

        // 取到图片大小
        let imageFigureDOM = ReactDOM.findDOMNode(this.refs.imageFigure0),
            imgW = imageFigureDOM.scrollWidth,
            imgH = imageFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);
            
        // 取到中心点的位置
        this.props.Constant.centerPos = {
            left: halfStageX - halfImgW,
            height: halfStageY - halfImgH
        };

        // 取到左右的范围 
        this.props.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.props.Constant.hPosRange.leftSecX[1] = halfStageX - halfImgW * 3;
        this.props.Constant.hPosRange.rightSecX[0] = halfStageX + halfImgW;
        this.props.Constant.hPosRange.rightSecX[1] = stageX - halfImgW;
        this.props.Constant.hPosRange.y[0] = -halfImgH;
        this.props.Constant.hPosRange.y[1] = stageY - halfImgH;

        // 取到上侧的范围
        this.props.Constant.vPosRange.x[0] = halfStageX - imgW;
        this.props.Constant.vPosRange.x[1] = halfStageX;
        this.props.Constant.vPosRange.topY[0] = -halfImgH;
        this.props.Constant.vPosRange.topY[1] = halfStageY - halfImgH * 3;
        
    }
    render() {
        let controllerUnits = [],
            imgFigures = [];
        
        imageDatas.forEach((value, index) => {
            // 这里的key一般配置的是图片的ID
            imgFigures.push(<ImgFigure data={value} key={value.fileName} ref={ 'imageFigure' + index }/>);
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
