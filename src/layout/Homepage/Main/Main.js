import React, {Component} from 'react';
import { Container, Jumbotron, CardImg, CardTitle, CardSubtitle, CardBody, Badge } from 'reactstrap';
import firebase from '../../../config/firebase';
import classes from './Main.module.css';

import Welcome from '../Welcome/Welcome';
import ArticleCard from '../../../components/ArticleCard/ArticleCard';

const db = firebase.firestore();

class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            articles: []
        }
    }

componentDidMount() {
    this.getMyArticles()
}

getMyArticles = () => {
    db
        .collection('Articles' )
        .limit(8)
        .get()
        .then(docs => {
            if(!docs.empty){
                let allArticles = [];
                docs.forEach( function (doc) {
                    const article = {
                        id: doc.id,
                        ...doc.data()
                    }

                    allArticles.push(article)
                })

                this.setState({
                    articles: allArticles
                }, () => {
                    this.setState({
                        isLoaded: true
                    })
                })
            }
        })
}
    
    render() {
        return(
            <div>
                <Welcome/>
                <h1 className={classes.mainTitle}>Articles</h1>
                <Container className={classes.Container}>
                    {
                        this.state.isLoaded ?
                            this.state.articles.map((article, index) => {
                                return(
                                    <ArticleCard 
                                        key={index}
                                        data={article}
                                    />
                                )
                            })
                            : ''
                    }
                </Container>
            </div>
        )
    }
}

export default Main;