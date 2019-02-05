import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import { Card, Modal, Upload, Icon} from 'antd';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modal1Visible: false,
      modal2Visible: false,
      currentImage: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  }
  componentDidMount() {
    fetch('http://www.splashbase.co/api/v1/images/latest')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({data: data.images})
    })
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  handleClick = (image) => {
    this.setState({
      modal1Visible: true,
      currentImage: image,
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: image.url,
      }]
    })
  }

  render() {
    const imageCollection = this.state.data.map((image, index) => {
      return (
        <Col xs={24} sm={12} md={8} lg={4} onClick={() => this.handleClick(image)}>
          <Card
            hoverable
            style={{ width: 240, height: 240, margin: "10px", }}
            cover={<img alt="example" src={image.url} />}
          ></Card>
        </Col>
      )
    });
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="App">
        <Modal
          title={this.state.currentImage.id}
          style={{ top: 20, left: 10, }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
         <Upload
          // action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          >
            {this.state.fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
          </Modal>
          {/* <img src={this.state.currentImage.url} width="150px"></img> */}
        </Modal>
        <Row>
          {imageCollection}
        </Row>
      </div>
    );
  }
}

export default App;
