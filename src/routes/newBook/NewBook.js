import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

/* todo sækja actions frá ./actions */

import './NewBook.css';
import { addBook } from '../../actions/books';

class NewBook extends Component {

  state = { redirect: false };

  titleInput = React.createRef();
  authorInput = React.createRef();
  descriptionInput = React.createRef();
  categoryInput = React.createRef();
  isbn10Input = React.createRef();
  isbn13Input = React.createRef();
  publishedInput = React.createRef();
  pagesInput = React.createRef();
  languageInput = React.createRef();

  submit = (e) => {
    e.preventDefault();
    const title = this.titleInput.current.value;
    const author = this.authorInput.current.value;
    const description = this.descriptionInput.current.value;
    const category = this.categoryInput.current.value;
    const isbn10 = this.isbn10Input.current.value;
    const isbn13 = this.isbn13Input.current.value;
    const published = this.publishedInput.current.value;
    const pages = this.pagesInput.current.value;
    const language = this.languageInput.current.value;
    const { dispatch } = this.props;
    console.log(author);
    dispatch(addBook(title, isbn13, author, description, category, isbn10, published, pages, language));
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAdding, book, type } = this.props;
    const { redirect } = this.state;

    
    if (!isAdding && !redirect) {
      if (book.status === 401) {
        console.log('Wrong info');
      } 
      if(book.status === 400){
        console.log(book.result.error);
      }
        else {
        console.log('Tókst ad skra bók');
        
        this.setState({ redirect: true });
      }
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return (
        <div>
          <p>Nýskráning tókst</p>
          <p><Link to="/login">Innskráning</Link></p>
        </div>
      );
    }

    return (
      <div>
        <Helmet title='Skrá bók' />
        <p>Nýskráning</p>
        <form>
          <p>Titill:</p>
          <input type="text" name="title" ref={this.titleInput}/>
          <p>Höfundur:</p>
          <input type="text" name="author" ref={this.authorInput}/>
          <p>Lýsing:</p>
          <textarea rows="4" cols="50" name="description" ref={this.descriptionInput}>
          </textarea>
          <p>Flokkur:</p>
          <select ref={this.categoryInput}>
            <option value="Fiction">Fiction</option>
            <option value="Fantacy">Fantacy</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Design">Design</option>
            <option value="Buisness">Buisness</option>
            <option value="Economics">Economics</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Comic">Comic</option>
            <option value="Nonfiction">Nonfiction</option>
            <option value="Graphic Novel">Graphic Novel</option>
            <option value="Horror">Horror</option>
            <option value="Psychology">Psychology</option>
          </select>
          <p>ISBN10:</p>
          <input type="text"name="isbn10" ref={this.isbn10Input}/>
          <p>ISBN13:</p>
          <input type="text"name="isbn13" ref={this.isbn13Input}/>
          <p>Útgefin:</p>
          <input type="text"name="published" ref={this.publishedInput}/>
          <p>Fjöldi Síðna:</p>
          <input type="text"name="pages" ref={this.pagesInput}/>
          <p>Tungumál:</p>
          <input type="text"name="language" ref={this.languageInput}/>
          <p></p>
          <button onClick={this.submit}>Submit</button>
        </form>
      </div>
    );
  }
}

/* todo tengja við redux */

const mapStateToProps = (state) => {
  return {
    type: state.books.type,
    isAdding: state.books.isAdding,
    book: state.books.book,
    error: state.books.error,
  }
  /* todo stilla redux ef það er notað */
}

export default withRouter(connect(mapStateToProps)(NewBook));
