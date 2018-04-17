import React, { Component } from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
=======
import Helmet from 'react-helmet';
>>>>>>> cce20a70c201f0b1a9001e56248e9aead033deff

import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import { fetchRead } from '../../actions/user';
import { updateName } from '../../actions/user';
import { updatePassword } from '../../actions/user';
import queryString from 'query-string';

import ReadBook from '../../components/readBooks';
import Button from '../../components/button';

class Profile extends Component {
  
  state = {
    loading: true,
    page: queryString.parse(this.props.location.search).page,
  }

  nameInput = React.createRef();

  passwordInput1 = React.createRef();
  passwordInput2 = React.createRef();

  info(user) {
    const { name, image } = user;
    let src;
    if (image) {
      src = image;
    } else {
      src = "/profile.jpg";
    }
    return (
      <div className="user">
        <img src={src} alt="profile picture" />
        <p className="name"> {name} </p> 
        <div className="info">

        </div>
      </div>
    );
  }

  books(){
    const { loading } = this.state;
    const { books } = this.props;
    
    const qs = queryString.parse(this.props.location.search);
    const { page = 1, query = '' } = qs;

    if (loading) {
      return (
        <p>Sæki bækur...</p>
      );
    }
    

    return (
      <section>
        <h1>Lesnar bækur</h1>
        <ul>
          {books.items.map((book) => {
            return (
              <ReadBook
                id={book.id}
                title={book.title}
                rating={book.rating}
                review={book.review}
              />
            )
          })}
        </ul>
      </section>
    );

  }

  submitName = (e) => {
    e.preventDefault();
    const name = this.nameInput.current.value;
    const { dispatch } = this.props;
    dispatch(updateName(name));
  }

  submitPassword = (e) => {
    e.preventDefault();
    const password1 = this.passwordInput1.current.value;
    const password2 = this.passwordInput2.current.value;
    if(password1 === password2){
      const { dispatch } = this.props;
      dispatch(updatePassword(password1));
    }

  }

  updateImage(){

    
    return (
      <div> 
      </div>
    );

  }

  updateName(){

    
    return (
      <div> 
        <form onSubmit={this.submitName}>
          <p> Nafn: </p>
          <input type="text" name="name" ref={this.nameInput} />
          <button>Uppfæra nafn</button>
        </form>
      </div>
    );

  }

  updatePassword(){
    
    return (
      <div> 
        <form onSubmit={this.submitPassword}>
        <p> Lykilorð: </p>
        <input type="password" name="password1" ref={this.passwordInput1}/>
        <p> Lykilorð aftur: </p>
        <input type="password" name="password2" ref={this.passwordInput2}/>
          <button>Uppfæra lykilorð</button>
        </form>
      </div>
    );

  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchRead(`?offset=${10 * (this.state.page - 1)}`));    this.setState({ loading: false });
  }

  render() {
    const user  = JSON.parse(window.localStorage.getItem("user"));
    let updateImage = this.updateImage();
    let updateName = this.updateName();
    let updatePassword = this.updatePassword();
    let info = this.info(user);
    let books = this.books();
    
    return (
      <div>
<<<<<<< HEAD
        <section>
        <h1>Upplýsingar</h1>
          {updateImage}
          {updateName}
          {updatePassword}
        </section>
        {books}
=======
        <Helmet title="Síða mín" />
        <p>Notendasíða</p>
>>>>>>> cce20a70c201f0b1a9001e56248e9aead033deff
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.user.isFetching,
    books: state.user.books,
    error: state.user.error,
  }
}

export default connect(mapStateToProps)(Profile);