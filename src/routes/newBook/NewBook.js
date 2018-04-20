import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

/* todo sækja actions frá ./actions */

import './NewBook.css';
import { addBook, fetchCategory } from '../../actions/books';
import Button from '../../components/button';

class NewBook extends Component {

  state = { redirect : false, loading:true};

  titleInput = React.createRef();
  authorInput = React.createRef();
  descriptionInput = React.createRef();
  categoryInput = React.createRef();
  isbn10Input = React.createRef();
  isbn13Input = React.createRef();
  publishedInput = React.createRef();
  pagesInput = React.createRef();
  languageInput = React.createRef();

  async componentDidMount() {
    const { dispatch } = this.props;
    
    const category = await dispatch(fetchCategory());
    this.setState({loading: false});
  }

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
    dispatch(addBook(title, isbn13, author, description, category, isbn10, published, pages, language));
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAdding, book, type, category } = this.props;
    const { redirect, loading } = this.state;   
    
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
    const { redirect , loading} = this.state;
    const { category } = this.props;
    console.log(category);
   
    if(loading){
      return (<p>áfram</p>);
    }
    if (redirect) {
      return (
        <div>
          <p>Nýskráning tókst</p>
          <p><Link to="/login">Innskráning</Link></p>
        </div>
      );
    }

    return (
      <div class="page">
        <Helmet title='Skrá bók' />
        <h1>Ný bók</h1>
        <form className="new-book-form">
          <div class="skraElement">
            <p>Titill:</p>
            <input type="text" name="title" ref={this.titleInput}/>
          </div>
          <div class="skraElement">
            <p>Höfundur:</p>
            <input type="text" name="author" ref={this.authorInput}/>
          </div>
          <div class="lysing">
            <p>Lýsing:</p>
            <textarea rows="4" cols="50" name="description" ref={this.descriptionInput}>
            </textarea>
          </div>
          <div class="skraElement">
            <p>Flokkur:</p>
            <select ref={this.categoryInput}>
            <option value="null">--Veldu Flokk--</option>
              {category[0].items.map((category) => {
              return (
              <option value={category.id}>
                {category.title}
              </option>
              )
            })}
            </select>
          </div>
          <div class="skraElement">
            <p>ISBN10:</p>
            <input type="text"name="isbn10" ref={this.isbn10Input}/>
          </div>
          <div class="skraElement">
            <p>ISBN13:</p>
            <input type="text"name="isbn13" ref={this.isbn13Input}/>
          </div>
          <div class="skraElement">
            <p>Útgefin:</p>
            <input type="text"name="published" ref={this.publishedInput}/>
          </div>
          <div class="skraElement">
            <p>Fjöldi Síðna:</p>
            <input type="text"name="pages" ref={this.pagesInput}/>
          </div>
          <div class="skraElement">
            <p>Tungumál:</p>
            <input type="text"name="language" ref={this.languageInput}/>
          </div>
          <p></p>
          <div class="skraElement">
          <Button onClick={this.submit} className="vistaButton">Vista</Button>
          </div>
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
    category: state.books.category,
    error: state.books.error,
  }
  /* todo stilla redux ef það er notað */
}

export default withRouter(connect(mapStateToProps)(NewBook));
