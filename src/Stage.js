import React, { Component } from 'react';
import "./css/Stage.css";

// 获取图片的相关数据
let imageDatas = require('./data/imgData.json');

// 将图片名信息转成路径信息
imageDatas = (function getImgURL(img) {
    for (let i = 0, j = img.length; i < j; i++) {
        let singleImgData = img[i];
        singleImgData.imgURL = require('./img/' + singleImgData.fileName);
        img[i] = singleImgData;
    }
    return img;
})(imageDatas);

class Stage extends Component {
    render() {
        return(
            <section className="stage">
                <section className="img-sec" >

                </section>
                <nav className="control-nav">

                </nav>
            </section>
        );
    }
}

export default Stage;