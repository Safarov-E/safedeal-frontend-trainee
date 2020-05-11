import React from 'react';
import { connect } from 'react-redux';
import './Images.css';

class Images extends React.Component {
  componentDidMount() {
    fetch('https://boiling-refuge-66454.herokuapp.com/images')
      .then((response) => response.json())
      .then((jsonStr) => this.props.addImages(jsonStr))
  }
  render() {
    console.log(this.props.photos)
    return (
      <div className="gallery">
        
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