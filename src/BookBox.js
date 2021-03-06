import React, { PureComponent } from 'react'
import BookShelf from './components/BookShelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import NavLinks from './components/NavLinks'

class BookBox extends PureComponent {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(
            books => {
                this.setState({ books })
            }
        )
    }

    moveBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf;
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([book])
            }))
        })
    }

    render() {
        const { books } = this.state;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <NavLinks />

                <div className="list-books-content">
                    <BookShelf book={books} onMoveBook={this.moveBook} />
                </div>

                <div className="open-search">
                    <Link to="/search"> Add a book </Link>
                </div>
            </div>
        )
    }
}

export default BookBox;