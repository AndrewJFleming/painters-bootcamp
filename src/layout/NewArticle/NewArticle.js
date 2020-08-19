import React, {Component} from 'react';
import classes from './NewArticle.module.css';
import { Container, Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button } from 'reactstrap';
// import Compressor from 'compressorjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import firebase from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const db = firebase.firestore();
const storageRef = firebase.storage();

class NewArticle extends Component {
    constructor(props) {
        super(props);
        this.state={
            article:{
                title:'',
                content:'',
                createDate: new Date(),
                hasFeaturedImage: false,
                featuredImage: '',
                isPublished: false,
                lastModified: new Date(),
                createUserID: '',
            }
        }
    }
    
modules = {
    toolbar: {
        container: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': []}],
            [{size: []}],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean'], ['code-block']
        ],
        // handlers: {
        //     'image': () => this.quillImageCallBack()
        // }
    },
    clipboard: {
        matchVisual: false,
    },
}

formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
]

    onChangeArticleTitle = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                title: value
            }
        })
    }

    onChangeArticleContent = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                content: value
            }
        })
    }

    onChangePublish = (val) => {
        this.setState({
            article: {
                ...this.state.article,
                isPublished: val === 'True'
            }
        })
    }

    submitArticle = () => {
        const article = this.state.article;
        article.createUserID = this.props.auth.uid
        db.collection("Articles")
            .add(article).then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    // fileCompress = (file) => {
    //     return new Promise((resolve, reject) => {
    //         new Compressor(file, {
    //             file: 'File',
    //             quality: 0.5,
    //             maxWidth: 640,
    //             maxHeight: 640,
    //             success(file) {
    //                 return resolve({
    //                     success: true,
    //                     file: file
    //                 })
    //             },
    //             error(err){
    //                 return resolve({
    //                     success: false,
    //                     message: err.message
    //                 })
    //             }
    //         })
    //     })
    // }

    // quillImageCallBack = () => {
        // const input = document.createElement('input')
        // input.setAttribute('type', 'file')
        // input.setAttribute('accept', 'image/*')
        // input.click()
        // input.onChange = async () => {
        //     const file = input.files[0];
            // const compressState = await this.fileCompress(file);
            // if(compressState.success){
    //             const fileName = uuidv4();
    //             storageRef.ref().child( 'Articles/' + fileName).put(compressState.file)
    //                 .then(async snapshot => {
    
    //                     const downloadURL = await storageRef.ref().child( 'Articles/' + fileName).getDownloadURL()
    //                     let quill = this.quill.getEditor()
    //                     const range = quill.getSelection(true)
    //                     quill.insertEmbed(range.index, 'image', downloadURL)
    //                 })
    //         }
    //     }
    // }

    uploadImageCallBack = (e) => {
        return new Promise(async (resolve, reject) => {
            const file = e.target.files[0];
            const fileName = uuidv4();
            storageRef.ref().child( 'Articles/' + fileName).put(file)
                .then(async snapshot => {

                    const downloadURL = await storageRef.ref().child( 'Articles/' + fileName).getDownloadURL()
                    resolve({
                        success: true,
                        data: {link: downloadURL}
                    })
                })
        })
    }

    render() {
        return(
            <Container>
                <h2 className={classes.SectionTitle}>New Article</h2>
                <Row>
                    <Col xs={12} sm={12} md={8} lg={9} xl={9} className={classes.Col}>
                        <FormGroup>
                            <Label className={classes.FormTitle}>Title</Label>
                            <Input 
                                type="text" 
                                name="articleTitle" 
                                id="articleTitle" 
                                placeholder=""
                                onChange={(e) => this.onChangeArticleTitle(e.target.value)}
                                value={this.state.article.title}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ReactQuill
                                className={classes.ReactQuill}
                                ref={(el) => this.quill = el}
                                value={this.state.article.content}
                                onChange={(e) => this.onChangeArticleContent(e)}
                                // theme="snow"
                                module={this.modules}
                                formats={this.formats}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={3} xl={3} className={classes.Col}>
                        <Card>
                            <CardHeader className={classes.CardHeader}>
                                Article Settings
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label className={classes.Label}>Publish</Label>
                                    <Input type="select" name='publish' id="publish" 
                                        onChange={(e) => this.onChangePublish(e.target.value)}
                                    >
                                        <option>False</option>
                                        <option>True</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label className={classes.Label}>Featured Image</Label>
                                    <Input type='file' accept='image/*' className={classes.ImageUploader}
                                    onChange={async (e) => {
                                        const uploadState = await this.uploadImageCallBack(e);
                                        if(uploadState.success){
                                            this.setState({
                                                hasFeaturedImage: true,
                                                article:{
                                                    ...this.state.article,
                                                    featuredImage: uploadState.data.link
                                                }
                                            })
                                        }
                                    }}>

                                    </Input>

                                    {
                                        this.state.hasFeaturedImage ?
                                            <img src={this.state.article.featuredImage} className={classes.FeaturedImg}/> : ''
                                    }

                                </FormGroup>
                                <FormGroup>
                                    <Button
                                        className={classes.Button}
                                        onClick={(e) => this.submitArticle()}>
                                            Submit
                                    </Button>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewArticle;