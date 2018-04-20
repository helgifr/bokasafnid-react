import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import './EditBook.css';

import { patchBook, fetchCategory, fetchBooks } from '../../actions/books';
import Button from '../../components/button';

class EditBook extends Component {

  state = { redirect : false, loading: true };

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
    const { dispatch, match } = this.props;
    const { book } = match.params;
    console.log(book);
    

    const category = await dispatch(fetchCategory());
    await dispatch(fetchBooks(`/${book}`))
    console.log('hva');
    
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
    const { dispatch, match } = this.props;
    const { book } = match.params;
    console.log(title, author, language, published, description);
    
    dispatch(patchBook(book, title, isbn13, author, description, category, isbn10, published, pages, language));
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAdding, book, type, category, errors } = this.props;
    const { redirect, loading } = this.state;
    console.log(errors.errors);
    console.log(isAdding, redirect);
    

    
    if (!isAdding && !redirect) {

      this.titleInput.current.classList.remove('wrong-input');
      this.authorInput.current.classList.remove('wrong-input');
      this.descriptionInput.current.classList.remove('wrong-input');
      this.categoryInput.current.classList.remove('wrong-input');
      this.isbn10Input.current.classList.remove('wrong-input');
      this.isbn13Input.current.classList.remove('wrong-input');
      this.publishedInput.current.classList.remove('wrong-input');
      this.pagesInput.current.classList.remove('wrong-input');
      this.languageInput.current.classList.remove('wrong-input');
      console.log('nei');
      

      if(errors.errors !== undefined) {
        errors.errors.map((error) => {
          console.log('lol');
          
          switch (error.field) {
            case 'title':
              console.log('lol');
              
              this.titleInput.current.classList.add('wrong-input');
              break;
            case 'author':
              this.authorInput.current.classList.add('wrong-input');
              break;
            case 'description':
              this.descriptionInput.current.classList.add('wrong-input');
              break;
            case 'category':
              this.categoryInput.current.classList.add('wrong-input');
              break;
            case 'isbn10':
              this.isbn10Input.current.classList.add('wrong-input');
              break;
            case 'isbn13':
              this.isbn13Input.current.classList.add('wrong-input');
              break;
            case 'published':
              this.publishedInput.current.classList.add('wrong-input');
              break;
            case 'pagecount':
              this.pagesInput.current.classList.add('wrong-input');
              break;
            case 'language':
              this.languageInput.current.classList.add('wrong-input');
              break;
          }
        });
      }
        else {
        console.log('Tókst ad skra bók');
        
        this.setState({ redirect: true });
      }
    }
  }

  render() {
    const { redirect , loading} = this.state;
    const { category, match } = this.props;
    
    console.log(match);
    
    if(loading) {
      return (<p>áfram</p>);
    }
    if (redirect) {
      return (
        <div>
          <p>Tókst að breyta bók</p>
          <p><Link to="/login">Innskráning</Link></p>
        </div>
      );
    }

    const { book } = this.props;

    return (
      <div className="page">
        <Helmet title='Skrá bók' />
        <h1>Breyta bók</h1>
        <form className="new-book-form">
          <div className="skraElement">
            <p>Titill:</p>
            <input type="text" name="title" ref={this.titleInput} defaultValue={book.title}/>
          </div>
          <div className="skraElement">
            <p>Höfundur:</p>
            <input type="text" name="author" ref={this.authorInput} defaultValue={book.author}/>
          </div>
          <div className="lysing">
            <p>Lýsing:</p>
            <textarea rows="4" cols="50" name="description" ref={this.descriptionInput}>
              {book.description}
            </textarea>
          </div>
          <div className="skraElement">
            <p>Flokkur:</p>
            <select ref={this.categoryInput} defaultValue={book.category}>
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
          <div className="skraElement">
            <p>ISBN10:</p>
            <input type="text"name="isbn10" ref={this.isbn10Input} defaultValue={book.isbn10}/>
          </div>
          <div className="skraElement">
            <p>ISBN13:</p>
            <input type="text"name="isbn13" ref={this.isbn13Input} defaultValue={book.isbn13}/>
          </div>
          <div className="skraElement">
            <p>Útgefin:</p>
            <input type="text"name="published" ref={this.publishedInput} defaultValue={book.published}/>
          </div>
          <div className="skraElement">
            <p>Fjöldi Síðna:</p>
            <input type="text"name="pages" ref={this.pagesInput} defaultValue={book.pagecount}/>
          </div>
          <div className="skraElement">
            <p>Tungumál:</p>
            <input type="text"name="language" ref={this.languageInput} defaultValue={book.language}/>
          </div>
          <p></p>
          <div className="skraElement">
          <Button onClick={this.submit} className="vistaButton">Vista</Button>
          <Link to={`/books/${book}`}><Button>Til baka</Button></Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    type: state.books.type,
    isAdding: state.books.isAdding,
    book: state.books.books,
    category: state.books.category,
    errors: state.books.errors,
  }
}

export default connect(mapStateToProps)(EditBook);