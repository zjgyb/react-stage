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
        let styleObj = {};

        if(this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        const { imgURL, title, desc } = this.props.data;
        return(
            <figure className="img-figure" style={styleObj}>
                <img src={ imgURL } alt={ title } width="230" height="178" />
                <figcaption>
                    <p>{ desc }</p>
                </figcaption>
            </figure>
        );
    }
}

class Stage extends Component {
    constructor() {
        super();
        this.state = {
            imgsArrangeArr: this.getDefaultData()
        }
    }

    getDefaultData() {
        let imgsArrangeArr = [];
        for (let i = 0; i < imageDatas.length; i++) {
            imgsArrangeArr[i] = {
                pos: {
                    top: 0,
                    left: 0
                }
            }
        }
        return imgsArrangeArr;
    }

    getRangeRandom = (low, high) => {
        return Math.ceil(Math.random() * (high - low) + low); 
    }

    /* 
     * 重新布局图片
     * 指定居中图片
     */
    rearrage = (centerIndex) => {
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.props.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            // 取零个或一个
            topImgNum = Math.floor(Math.random() * 2),
            topImgSpliceIndex = 0,
            
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

            // 居中图片
            imgsArrangeCenterArr[0].pos = centerPos;

            // 取出要布局上侧图片
            topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
            imgsArrangeTopArr =  imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

            imgsArrangeTopArr.forEach((value, index) => {
                imgsArrangeTopArr[index].pos = {
                    top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                }
            });

            // 布局左右两侧
            for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
                let hPosRangeLORX = null;
                if(i < k) {
                    hPosRangeLORX = hPosRangeLeftSecX;
                } else {
                    hPosRangeLORX = hPosRangeRightSecX;
                }
                
                imgsArrangeArr[i].pos = {
                    top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                }
            }

            if(imgsArrangeArr && imgsArrangeTopArr[0]) {
                imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
            }

            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });

    }

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
            top: halfStageY - halfImgH
        };

        // 取到左右的范围 
        this.props.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.props.Constant.hPosRange.leftSecX[1] = halfStageX - halfImgW * 3;
        this.props.Constant.hPosRange.rightSecX[0] = halfStageX + halfImgW;
        this.props.Constant.hPosRange.rightSecX[1] = stageX - halfImgW;
        this.props.Constant.hPosRange.y[0] = -halfImgH;
        this.props.Constant.hPosRange.y[1] = stageY - halfImgH;

        // 取到上侧的范围
        this.props.Constant.vPosRange.x[0] = halfImgW - imgW;
        this.props.Constant.vPosRange.x[1] = halfImgW;
        this.props.Constant.vPosRange.topY[0] = -halfImgH;
        this.props.Constant.vPosRange.topY[1] = halfStageY - halfImgH * 3;
        
        // 第一张图片居中
        this.rearrage(1);
    }
    test(index) {
        if(!this.state.imgsArrangeArr[index]) {
            this.setState({
                imgsArrangeArr: this.state.imgsArrangeArr.push({
                    pos: {
                        top: 0,
                        left: 0
                    }
                })
            })
        }
        
    }
    render() {
        let controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach((value, index) => {
            // 这里的key一般配置的是图片的ID
            // if(!this.state.imgsArrangeArr[index]) {
            //     this.state.imgsArrangeArr[index] = {
            //         pos: {
            //             left: 0,
            //             top: 0
            //         }
            //     }
            // }
            imgFigures.push(
                <ImgFigure 
                    data={value} 
                    key={value.fileName} 
                    ref={ 'imageFigure' + index }
                    arrange={this.state.imgsArrangeArr[index]}
                />
            );
        });
        return(
            <section className="stage" ref={node => { this.stage = node; }}>
                <section className="img-sec" >
                   { imgFigures }
                   { this.Test }
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
