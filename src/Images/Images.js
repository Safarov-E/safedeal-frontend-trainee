import React from 'react';
import { connect } from 'react-redux';
import Loading from '../loading';
import './Images.css';

class Images extends React.Component {
  state = {
    loading: true,
    show: true,
    addComment: [{
      id: '',
      name: '',
      text: '',
      date: ''

    }]
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
    console.log(this.props.comments)
  }
  displayImages = (id) => {
    fetch('https://boiling-refuge-66454.herokuapp.com/images/'+ id)
      .then((response) => response.json())
      .then((jsonStr) => this.props.add_modal(jsonStr))

    fetch('https://boiling-refuge-66454.herokuapp.com/images/'+ id)
      .then((response) => response.json())
      .then((jsonStr) => this.props.add_comment(jsonStr.comments))
    this.setState({show: true})
  }
  handleShow = () => {
    this.setState({show: false})
  }
  handlerComment = (id) => {
    return event => {
      event.preventDefault();
      let elements = event.target.elements;
      let name = elements['name'].value;
      let text = elements['comment'].value;
      // let idx;
      // if(id === 237) {
      //   idx = 153
      // } if(id === 238) {
      //   idx = 155
      // } if(id === 239) {
      //   idx = 156
      // } if(id === 240) {
      //   idx = 154
      // } if(id === 241) {
      //   idx = 157
      // } if(id === 242) {
      //   idx = 158
      // }
      this.setState({
        addComment: {
          id,
          name,
          text,
          date: Date.now()
        }
      })
      if(this.state.addComment.id !== undefined) {
        let comment = {
          id: this.state.addComment.id,
          name: this.state.addComment.name,
          text: this.state.addComment.text,
          date: this.state.addComment.date
        }
        console.log(comment)
        this.props.new_add_comment(comment)
      }
    }
  }
  // handlerName = (id) => {
  //   return event => {
  //     this.setState({
  //       addComment: {id, name: event.target.value}
  //     })
  //   }
  // }
  // handlerName = (event) => {
  //   this.setState({
  //     addComment: {text: event.target.value, date: Date.now()}
  //   })
  // }
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
                      <div className="line_1" onClick={this.handleShow}></div>
                      <div className="line_2" onClick={this.handleShow}></div>
                    </div>
                    <div className="largeImage">
                      <img src={item.url} alt="" />
                    </div>
                    <form onSubmit={this.handlerComment(item.id)}>
                      <input 
                        className="name" 
                        type="text" name="name" 
                        placeholder="Ваше имя" />
                      <input 
                        className="comment" 
                        type="text" name="comment" 
                        placeholder="Ваш комментарий" />
                      <button className="button">Оставить комментарий</button>
                    </form>
                    {/* <div className="comments">
                      <div className="comment_1">
                        <span>{item.comments[0]  !== undefined ?  ('0' + new Date(item.comments[0].date).getDate() + '.' + 
                        '0' + (new Date(item.comments[0].date).getMonth() + 1) + '.' +
                        new Date(item.comments[0].date).getFullYear()) : null}</span>
                        <p>{item.comments[0] !== undefined ? item.comments[0].text : null}</p>
                      </div>
                    </div> */}
                    <div className="comments">
                    {
                      this.props.comments.map((item) => {
                        return(
                                <div className="comment_1">
                                  <span>{item.date  !== undefined ?  (new Date(item.date).getDate() + '.' + 
                                  '0' + (new Date(item.date).getMonth() + 1) + '.' +
                                  new Date(item.date).getFullYear()) : null}</span>
                                  <p>{item.text !== undefined ? item.text : null}</p>
                                </div>)
                      })
                    }
                    </div>
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
    modalPhoto: state.images.modalPhoto,
    comments: state.images.comments
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
    }),
    add_comment: (comments) => dispatch({
      type: 'MODAL_COMMENT',
      comments
    }),
    new_add_comment: (comment) => dispatch({
      type: 'ADD_COMMENT',
      comment
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);