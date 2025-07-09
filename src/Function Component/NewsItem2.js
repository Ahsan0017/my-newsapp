import React from 'react'

const NewsItem2 =(props)=> {

    let { title, description, ImageUrl, newsUrl, author, date,source } = props;
    return (
      <div className='my-3'>
        <div
          className="card" >
            <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
              <span className="badge rounded-pill bg-danger" >
                {source}
              </span>
              </div>
          <img src={!ImageUrl ? "https://www.hindustantimes.com/ht-img/img/2025/02/18/550x309/satyendar_jain_pti_1739877578250_1739877585284.jpeg" : ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}<span className="badge rounded-pill text-bg-success">New</span>
            
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }

export default NewsItem2