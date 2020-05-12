import React from 'react';
import { connect } from 'react-redux';
import './Images.css';

class Images extends React.Component {
  componentDidMount() {
    fetch('https://boiling-refuge-66454.herokuapp.com/images')
      .then((response) => response.json())
      .then((jsonStr) => this.props.addImages(jsonStr))
  }
  displayImages = () => {
    
  }
  render() {
    return (
      <div className="gallery">
        {
          this.props.photos.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <img className="images" src={item.url} alt="world" onClick={this.displayImages} />
              </React.Fragment>
            )
          })
        }
        <div>
          <div className="rectangle_7">
          </div>
          <div className="modal">
              <div className="rectangle_8">
                <div className="close">
                  <div className="line_1"></div>
                  <div className="line_2"></div>
                </div>
                <div className="largeImage">
                  <img src="https://avatars.mds.yandex.net/get-pdb/1965212/7df6f8dd-7659-4f9f-bd8d-ed629e6efa05/s1200?webp=false" alt="" />
                </div>
                <input className="name" type="text" placeholder="Ваше имя"/>
                <input className="comment" type="text" placeholder="Ваш комментарий"/>
                <button className="button" type="button">Оставить комментарий</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    photos: state.images.photos
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addImages: (images) => dispatch({
      type: 'ADD_PHOTOS',
      images
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);