import React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { Button, IconButton, Paper, CircularProgress } from '@material-ui/core';
import { KeyboardBackspace } from "@material-ui/icons";

import { getProducts, deleteProduct } from '../../../actions/ProductActions';
import { deleteAlertError, deleteAlertSuccess } from '../../../components/Form/Alerts';
import { url, statusType } from '../../../constants';
import labels from '../../../assets/labels';
import Navbar from '../../../components/layout/Navbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons'

const List = ({ history, isLoading, products, getProductList, deleteProductItem, deleteStatus }) => {
  const [deleteError, setDeleteError] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
 
  React.useEffect(() => {
    getProductList();
  }, []);

  const handleDelete = (id) => {
    deleteProductItem(id);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (deleteStatus === statusType.success) {
        setDeleteError(false);
        setDeleteSuccess(true);
    }
    if (deleteStatus === statusType.error) {
      setDeleteError(true);
      setDeleteSuccess(false);

    }
}, [deleteStatus]);

const getBuyPrice = (price, vat) => price && vat && parseFloat(price) + (parseFloat(vat) * parseFloat(price) / 100) || 0;
    
  return(
    <div>{ isLoading
      ? <div className="loader"><CircularProgress /></div>
      : <div>
        <div className="drawer-subheader">
            <IconButton onClick={() => history.push(url.calendar)}><KeyboardBackspace /></IconButton>
            <h5>{ labels.appTitle }</h5>
        </div>
        <div className="list-subtitle">
          <h2>{ labels.productList }</h2>
          <Button onClick={() => history.push(`${ url.products }${ url.add }`)} className="font-button font-button--small">{ labels.addProductButton }</Button>
        </div>

        { deleteSuccess && deleteAlertSuccess({onClose: () => setDeleteSuccess(false)}) }
        { deleteError &&  deleteAlertError({onClose: () => setDeleteError(false)}) }

        { products?.length ? products.sort((a,b) => a.name > b.name ? 1 : -1).map(({ _id, name, priceBuyVat, priceBuy, priceSell, priceSellVat, quantity }) => {          
          return (
            <Paper className="user-card" key={ _id } elevation={ 0 }>
              <div className="product-element">
                <div>
                  <Link to={`${ url.products }/${ _id }`}>
                    <h3>{ name }</h3>
                    <p>{ priceBuy && <>kupno: <strong>{ priceBuy }zł</strong></>} {priceBuy && priceBuyVat
                     && <>| <strong>{ getBuyPrice(priceBuy, priceBuyVat) }zł</strong> (brutto)</>}</p>
                    <p>{priceSell && <>sprzedaż: <strong>{ priceSell }zł</strong></>} {priceSell && priceSellVat 
                    && <>| <strong>{ getBuyPrice(priceSell, priceSellVat) }zł</strong> (brutto)</>}</p>
                  </Link>
                </div>
                <div className="inline-action">
                  <IconButton disabled={ isLoading } onClick={() => handleDelete(_id)}><FontAwesomeIcon icon={ faTrash } /></IconButton>
                  <p>ilość: { quantity || '?' }</p>
                </div>
              </div>
            </Paper>
        )}) : <div className="user-card"><p>{labels.noProducts}</p></div>}
      </div>}
    <Navbar/>
    </div>
  );
};

List.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  getProductList: PropTypes.func.isRequired,
  deleteProductItem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products.data,
  categories: state.categories.data,
  isLoading: state.products.status === statusType.loading,
  deleteStatus: state.products.deleteStatus
});

const mapDispatchToProps = (dispatch) => ({
  getProductList: () => dispatch(getProducts()),
  deleteProductItem: (id) => dispatch(deleteProduct({id}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
