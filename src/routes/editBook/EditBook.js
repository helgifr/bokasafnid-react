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
  titleLabel = React.createRef();
  authorInput = React.createRef();
  authorLabel = React.createRef();
  descriptionInput = React.createRef();
  descriptionLabel = React.createRef();
  categoryInput = React.createRef();
  categoryLabel = React.createRef();
  isbn10Input = React.createRef();
  isbn10Label = React.createRef();
  isbn13Input = React.createRef();
  isbn13Label = React.createRef();
  publishedInput = React.createRef();
  publishedLabel = React.createRef();
  pagesInput = React.createRef();
  pagesLabel = React.createRef();
  languageInput = React.createRef();
  languageLabel = React.createRef();

  async componentDidMount() {
    const { dispatch, match } = this.props;
    const { book } = match.params;
    console.log(book);
    

    const category = await dispatch(fetchCategory());
    await dispatch(fetchBooks(`/${book}`))
    console.log('hva');
    
    this.setState({loading: false});
  }

  handleErrors = (errors) => {
    if (errors.length > 0) {
      this.titleInput.current.classList.remove('wrong-input');
      this.titleLabel.current.classList.remove('wrong-label');
      this.authorInput.current.classList.remove('wrong-input');
      this.authorLabel.current.classList.remove('wrong-label');
      this.descriptionInput.current.classList.remove('wrong-input');
      this.descriptionLabel.current.classList.remove('wrong-label');
      this.categoryInput.current.classList.remove('wrong-input');
      this.categoryLabel.current.classList.remove('wrong-label');
      this.isbn10Input.current.classList.remove('wrong-input');
      this.isbn10Label.current.classList.remove('wrong-label');
      this.isbn13Input.current.classList.remove('wrong-input');
      this.isbn13Label.current.classList.remove('wrong-label');
      this.publishedInput.current.classList.remove('wrong-input');
      this.publishedLabel.current.classList.remove('wrong-label');
      this.pagesInput.current.classList.remove('wrong-input');
      this.pagesLabel.current.classList.remove('wrong-label');
      this.languageInput.current.classList.remove('wrong-input');
      this.languageLabel.current.classList.remove('wrong-label');

      console.log(errors);
      
      errors.map((error) => {
        switch (error.field) {
          case 'title':
            this.titleInput.current.classList.add('wrong-input');
            this.titleLabel.current.classList.add('wrong-label');
            break;
          case 'author':
            this.authorInput.current.classList.add('wrong-input');
            this.authorLabel.current.classList.add('wrong-label');
            break;
          case 'description':
            this.descriptionInput.current.classList.add('wrong-input');
            this.descriptionLabel.current.classList.add('wrong-label');
            break;
          case 'category':
            this.categoryInput.current.classList.add('wrong-input');
            this.categoryLabel.current.classList.add('wrong-label');
            break;
          case 'isbn10':
            this.isbn10Input.current.classList.add('wrong-input');
            this.isbn10Label.current.classList.add('wrong-label');
            break;
          case 'isbn13':
            this.isbn13Input.current.classList.add('wrong-input');
            this.isbn13Label.current.classList.add('wrong-label');
            break;
          case 'published':
            this.publishedInput.current.classList.add('wrong-input');
            this.publishedLabel.current.classList.add('wrong-label');
            break;
          case 'pagecount':
            this.pagesInput.current.classList.add('wrong-input');
            this.pagesLabel.current.classList.add('wrong-label');
            break;
          case 'language':
            this.languageInput.current.classList.add('wrong-input');
            this.languageLabel.current.classList.add('wrong-label');
            break;
        }
      });
    }
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
    if (!isAdding && !redirect) {
      this.setState({ redirect: true });
    }
  }

  render() {
    const { redirect , loading} = this.state;
    const { category, match, errors = [] } = this.props;
    
    this.handleErrors(errors);
    
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
        <ul>
        {(errors.map((error) => {
          return (
          <li>
            {error.message}
          </li>
          )
        }))}
        </ul>
        <form className="new-book-form">
          <div className="skraElement">
            <label className="label" ref={this.titleLabel}>Titill:</label>
            <input type="text" name="title" ref={this.titleInput} defaultValue={book.title}/>
          </div>
          <div className="skraElement">
            <label className="label" ref={this.authorLabel}>Höfundur:</label>
            <input type="text" name="author" ref={this.authorInput} defaultValue={book.author}/>
          </div>
          <div className="lysing">
            <label className="label" ref={this.descriptionLabel}>Lýsing:</label>
            <textarea rows="4" cols="50" name="description" ref={this.descriptionInput}>
              {book.description}
            </textarea>
          </div>
          <div className="skraElement">
            <label className="label" ref={this.categoryLabel}>Flokkur:</label>
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
            <label className="label" ref={this.isbn10Label}>ISBN10:</label>
            <input type="text"name="isbn10" ref={this.isbn10Input} defaultValue={book.isbn10}/>
          </div>
          <div className="skraElement">
            <label className="label" ref={this.isbn13Label}>ISBN13:</label>
            <input type="text"name="isbn13" ref={this.isbn13Input} defaultValue={book.isbn13}/>
          </div>
          <div className="skraElement">
            <label className="label" ref={this.publishedLabel}>Útgefin:</label>
            <input type="text"name="published" ref={this.publishedInput} defaultValue={book.published}/>
          </div>
          <div className="skraElement">
            <label className="label" ref={this.pagesLabel}>Fjöldi Síðna:</label>
            <input type="text"name="pages" ref={this.pagesInput} defaultValue={book.pagecount}/>
          </div>
          <div className="skraElement">
            <label className="label" ref={this.languageLabel}>Tungumál:</label>
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