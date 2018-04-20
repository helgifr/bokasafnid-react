import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

/* todo sækja actions frá ./actions */

import './NewBook.css';
import { addBook, fetchCategory } from '../../actions/books';
import Button from '../../components/button';

class NewBook extends Component {

  state = { redirect : false, loading: true };

  static propTypes = {
    dispatch: PropTypes.func,
    isAdding: PropTypes.bool,
    book: PropTypes.array,
    category: PropTypes.array,
    errors: PropTypes.array,
  }

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
    
    await dispatch(fetchCategory());
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

  handleErrors = (errors) => {
    if(errors.length > 0){

      this.titleInput.current.classList.remove('wrong-input');
      this.titleInput.current.classList.remove('wrong-label');
      this.categoryInput.current.classList.remove('wrong-input');
      this.categoryInput.current.classList.remove('wrong-label');
      this.isbn10Input.current.classList.remove('wrong-input');
      this.isbn10Input.current.classList.remove('wrong-label');
      this.isbn13Input.current.classList.remove('wrong-input');
      this.isbn13Input.current.classList.remove('wrong-label');
      this.languageInput.current.classList.remove('wrong-input');
      this.languageInput.current.classList.remove('wrong-label');

      errors.forEach((error) => {
        
        if (error.field === this.titleInput.current.name) {
          this.titleInput.current.classList.add("wrong-input");
          this.titleInput.current.classList.add('wrong-label');
        } 
        if (error.field === this.categoryInput.current.name) {
          this.categoryInput.current.classList.add("wrong-input");
          this.categoryInput.current.classList.add('wrong-label');
        } 
        if (error.field === this.isbn10Input.current.name) {
          this.isbn10Input.current.classList.add("wrong-input");
          this.isbn10Input.current.classList.add('wrong-label');
        }
        if (error.field === this.isbn13Input.current.name) {
          this.isbn13Input.current.classList.add("wrong-input");
          this.isbn13Input.current.classList.add('wrong-label');
        }
        if (error.field === this.languageInput.current.id) {
          this.languageInput.current.classList.add("wrong-input");
          this.languageInput.current.classList.add('wrong-label');
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAdding, book, errors } = this.props;
    const { redirect } = this.state;
    console.log(isAdding);
    

    if (!isAdding && !redirect) {
      if (book.status === 401) {
        this.handleErrors(errors);
      }
      if(book.status === 400) {
        this.handleErrors(errors);
      }
        else {
        this.setState({ redirect: true });
      }
    }
  }

  render() {
    const { redirect , loading} = this.state;
    const { category, errors = [] } = this.props;
    
    this.handleErrors(errors);

    if(loading) {
      return (<p>áfram</p>);
    }

    if (redirect) {
      return (
        <div>
          <p>Tókst að skrá bók</p>
          <p><Link to="/login">Innskráning</Link></p>
        </div>
      );
    }

    return (
      <div className="page">
        <div className="errorMessage">
        <ul>
        {(errors.map((error) => {
          return (
          <li key={error.field}>
            <h3>{error.message}</h3>
          </li>
          )
        }))}
        </ul>
      </div>
        <Helmet title='Skrá bók' />
        <h1>Ný bók</h1>
        <form className="new-book-form">
          <div className="skraElement">
            <p>Titill:</p>
            <input type="text" name="title" ref={this.titleInput}/>
          </div>
          <div className="skraElement">
            <p>Höfundur:</p>
            <input type="text" name="author" ref={this.authorInput}/>
          </div>
          <div className="lysing">
            <p>Lýsing:</p>
            <textarea rows="4" cols="50" name="description" ref={this.descriptionInput}>
            </textarea>
          </div>
          <div className="skraElement">
            <p>Flokkur:</p>
            <select ref={this.categoryInput} name="category">
            <option>--Veldu Flokk--</option>
              {category[0].items.map((category) => {
              return (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
              )
            })}
            </select>
          </div>
          <div className="skraElement">
            <p>ISBN10:</p>
            <input type="text"name="isbn10" ref={this.isbn10Input}/>
          </div>
          <div className="skraElement">
            <p>ISBN13:</p>
            <input type="text"name="isbn13" ref={this.isbn13Input}/>
          </div>
          <div className="skraElement">
            <p>Útgefin:</p>
            <input type="text"name="published" ref={this.publishedInput}/>
          </div>
          <div className="skraElement">
            <p>Fjöldi Síðna:</p>
            <input type="text"name="pages" ref={this.pagesInput}/>
          </div>
          <div className="skraElement">
            <p>Tungumál:</p>
            <input type="text"name="language" ref={this.languageInput}/>
          </div>
          <p></p>
          <div className="skraElement">
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
    errors: state.books.errors,
  }
  /* todo stilla redux ef það er notað */
}

export default withRouter(connect(mapStateToProps)(NewBook));
