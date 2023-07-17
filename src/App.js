import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import Cart from './components/Cart'
import Payment from './components/Payment'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = item => {
    const {cartList} = this.state
    const isItemExists = cartList.find(eachItem => eachItem.id === item.id)

    if (isItemExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (isItemExists.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + item.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, item]

      this.setState({cartList: updatedCartList})
    }
  }

  increaseQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  }

  removeCartList = () => {
    this.setState({cartList: ''})
  }

  render() {
    const {cartList} = this.state
    return (
      <>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            increaseQuantity: this.increaseQuantity,
            decreaseQuantity: this.decreaseQuantity,
            removeCartList: this.removeCartList,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <Route
              exact
              path="/restaurant/:id"
              component={RestaurantItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/payment" component={Payment} />
            <ProtectedRoute path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </>
    )
  }
}

export default App

/*
const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]
*/
