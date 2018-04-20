import React, { Component } from 'react';

import { connect } from 'react-redux';

import Helmet from 'react-helmet';


import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import { fetchRead } from '../../actions/user';
import { updateImage } from '../../actions/auth';
import { updateName } from '../../actions/auth';
import { updatePassword } from '../../actions/auth';
import queryString from 'query-string';

import './Profile.css';

import ReadBook from '../../components/readBooks';
import Button from '../../components/button';
import DeleteButton from '../../components/deleteButton';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state ={
      loading: true,
      page: queryString.parse(this.props.location.search).page,
      file : null,
    }
    this.onImageSubmit = this.onImageSubmit.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
  }

  /*state = {
    loading: true,
    page: queryString.parse(this.props.location.search).page,
    file : null,
  }*/
  
  nameInput = React.createRef();

  passwordInput1 = React.createRef();
  passwordInput2 = React.createRef();

  deleteBook(id) {

    
  }

  books() {
    const { loading } = this.state;
    const { books } = this.props;

    const qs = queryString.parse(this.props.location.search);
    const { page = 1 } = qs;

    if (loading) {
      return (
        <p>Sæki bækur...</p>
      );
    }

    return (
      <section>
        <h1 className="title">Lesnar bækur</h1>
        <ul>
          {books.items.map((book) => {
            return (
              <ReadBook
                key={book.id}
                id={book.id}
                title={book.title}
                rating={book.rating}
                review={book.review}
              />
            )
          })}
        </ul>
        {page > 1 &&
          <Link to={{pathname: "/profile", search: `?page=${Number(page) - 1}`}}><Button>{"<"} Til baka</Button></Link>
        }
        {books.items.length === 10 &&
          <Link to={{pathname: "/profile", search: `?page=${Number(page) + 1}`}}><Button>Næsta síða ></Button></Link>
        }
      </section>
    );

  }



  submitName = (e) => {
    e.preventDefault();
    const name = this.nameInput.current.value;
    this.nameInput.current.value = "";
    const { dispatch } = this.props;
    dispatch(updateName(name));
  }

  submitPassword = (e) => {
    e.preventDefault();
    const password1 = this.passwordInput1.current.value;
    const password2 = this.passwordInput2.current.value;
    this.passwordInput1.current.value = "";
    this.passwordInput2.current.value = "";
    if(password1 != null && password1 === password2) {
      const { dispatch } = this.props;
      dispatch(updatePassword(password1));
    }
  }

  onImageSubmit(e){
    e.preventDefault() // Stop form submit
    const image = this.state.file;
    if(image != null){
      const { dispatch } = this.props;
      dispatch(updateImage(image));
    }
  }

  onImageChange(e){
    this.setState({file: e.target.files[0]}, function () {
      
    });
  }

  updateImage(){

    return (
      <div>
        <form onSubmit={this.onImageSubmit}>
          <h1>Breyta mynd</h1>
          <input type="file" onChange={this.onImageChange} />
          <Button type="submit">Hlaða upp</Button>
        </form>
      </div>
    );

  }

  updateName(){

    return (
        <form onSubmit={this.submitName}>
          <div className="input">
            <p className="toUpdate"> Nafn: </p>
            <input className="textfield" type="text" name="name" ref={this.nameInput} />
          </div>
          <Button>Uppfæra nafn</Button>
        </form>
    );

  }

  updatePassword(){

    return (
        <form className="password-form" onSubmit={this.submitPassword}>
        <div className="input">
          <p className="toUpdate"> Lykilorð: </p>
          <input className="textfield" type="password" name="password1" ref={this.passwordInput1}/>
       </div>
       <div className="input"> 
          <p className="toUpdate"> Lykilorð aftur: </p>
          <input className="textfield" type="password" name="password2" ref={this.passwordInput2}/>
        </div>
        <Button>Uppfæra lykilorð</Button>
        </form>
    );

  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page = 1 } = this.state;
    await dispatch(fetchRead(`?offset=${10 * (this.state.page - 1)}`));
    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    const newqs = queryString.parse(this.props.location.search);
    const { page = 1, query = '' } = newqs;

    if (prevState.page !== page) {
      const { dispatch } = this.props;
      this.setState({ loading: true, page });
      await dispatch(fetchRead(`?offset=${10 * (page - 1)}`));
      this.setState({ loading: false });
    }
  }

  render() {
    const user  = JSON.parse(window.localStorage.getItem("user"));
    let updateImage = this.updateImage();
    let updateName = this.updateName();
    let updatePassword = this.updatePassword();
    let books = this.books();

    return (
      <div className="profile">
        <section>
        <h1 className="title">Upplýsingar</h1>
          {updateImage}
          {updateName}
          {updatePassword}
        </section>
        {books}
        <Helmet title="Síða mín" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetchingUser: state.user.isFetchingUser,
    books: state.user.books,
    error: state.user.error,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Profile);
