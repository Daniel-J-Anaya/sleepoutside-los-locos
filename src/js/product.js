import { setLocalStorage, getLocalStorage, getParam} from './utils.mjs';
import { findProductById } from './externalServices.mjs';
import { productDetails } from './productDetails.mjs';

const productId = getParam('product');
productDetails(productId, '.product-detail');