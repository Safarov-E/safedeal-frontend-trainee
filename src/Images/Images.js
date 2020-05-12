import React from 'react';
import { connect } from 'react-redux';
import Loading from '../loading';
import './Images.css';

class Images extends React.Component {
  state = {
    loading: true,
    show: true
  }
  componentDidMount() {
    fetch('https://boiling-refuge-66454.herokuapp.com/images')
      .then((response) => response.json())
      .then((jsonStr) => this.props.addImages(jsonStr))
  }
  componentDidUpdate(nextProps) {
    if(nextProps.photos !== this.props.photos) {
      this.setState({loading: false})
    }
  }
  displayImages = (id) => {
    fetch('https://boiling-refuge-66454.herokuapp.com/images/'+ id)
      .then((response) => response.json())
      .then((jsonStr) => this.props.add_modal(jsonStr))
    this.setState({show: true})
  }
  handleShow = () => {
    this.setState({show: false})
  }
  render() { 
    return (
      <div className="gallery">
        {
          !this.state.loading ?
          this.props.photos.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <img className="images" src={item.url} alt="world" onClick={() => this.displayImages(item.id)} />
              </React.Fragment>
            )
          })
          :
          <Loading/>
        }
        {
          this.state.show ?
          this.props.modalPhoto.map((item) => {
            return (<div key={item.id}>
              <div className="rectangle_7">
              </div>
              <div className="modal">
                  <div className="rectangle_8">
                    <div className="close" onClick={this.handleShow}>
                      <div className="line_1"></div>
                      <div className="line_2"></div>
                    </div>
                    <div className="largeImage">
                      <img src={item.url} alt="" />
                    </div>
                    <input className="name" type="text" placeholder="Ваше имя"/>
                    <input className="comment" type="text" placeholder="Ваш комментарий"/>
                    <button className="button" type="button">Оставить комментарий</button>
                </div>
              </div>
            </div>)
          })
          : null
        }
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    photos: state.images.photos,
    modalPhoto: state.images.modalPhoto
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addImages: (images) => dispatch({
      type: 'ADD_PHOTOS',
      images
    }),
    add_modal: (image) => dispatch({
      type: 'MODAL_PHOTOS',
      image
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);