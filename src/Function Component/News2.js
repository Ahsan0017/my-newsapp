import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem2 from './NewsItem2';
import Spiner2 from './Spiner2';

const News2 = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json()
        props.setProgress(70);
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}- My-NewsApp`;
        updateNews();
        //eslint-disable-next-line
    }, [])
    
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json()
        setArticles([...articles, ...parseData.articles])
        setTotalResults(parseData.totalResults)
        setLoading(false)
    };

    return (
        <>
            <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>My-NewApp - Top from {capitalizeFirstLetter(props.category)} Headline</h1>
            {loading && <Spiner2 />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spiner2 />} >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => {
                            return <div className="col-md-4" key={`${element.url}-${index}`}>
                                <NewsItem2 title={
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
        </>
    )
}

News2.defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
}

News2.propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News2