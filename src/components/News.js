import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes, { } from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'general'
    }
    
    static propsType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading:true,
            page: 1,
            totalResults:0,
        

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}- My-NewsApp`;
    }
    async updateNews() {
        this.props.setProgress(10);
        // const apiKey = "4fa465b0c0dd2d3eb796d31d80c757eb";
        // const url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=${this.props.country}&apikey=${apiKey}&max=${this.props.pageSize}&page=${this.state.page}`;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=960c2c4079c943969a80bed64b4609b0&page=${this.state.page}&pageSize=${this.props.pageSize}`

        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json()
        this.props.setProgress(70);
        this.setState({ articles: parseData.articles || [], 
            totalResults: parseData.totalResults || 0,
             loading: false,
            })
        this.props.setProgress(100);
    }
    async componentDidMount() {
       await this.updateNews();
    }
    // handlePreviousclick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }
    // handleNextclick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }
    
  fetchMoreData = async () => {
    this.setState({page:this.state.page + 1})
        // this.setState({});
        // const apiKey = "4fa465b0c0dd2d3eb796d31d80c757eb";
        // const url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=${this.props.country}&apikey=${apiKey}&max=${this.props.pageSize}&page=${this.state.page}`;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=960c2c4079c943969a80bed64b4609b0&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({ 
            articles:[...this.state.articles,...parseData.articles], 
            totalResults: parseData.totalResults,
            loading:false,
        })

  };
    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: '35px 0px ',marginTop:'90px' }}>My-NewsApp - Top from {this.capitalizeFirstLetter(this.props.category)} Headline</h1>
                { this.state.loading &&<Spiner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={ <Spiner />} >
                    {/* hasMore={this.state.articles.length <this.state.totalResults}
                    loader={this.state.articles.length < this.state.totalResults && <Spiner />} > */}
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element,index) => {
                            return <div className="col-md-4" key={`${element.url}-${index}`}>
                                <NewsItem title={
                                    element.title ? element.title.slice(0, 50) : ""} 
                                    description={element.description ? element.description.slice(0, 100) : ""} 
                                    ImageUrl={element.urlToImage}
                                     newsUrl={element.url} 
                                     author={element.author} 
                                     date={element.publishedAt} 
                                     source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}
