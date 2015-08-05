var ProductCategoryRow = require('./product_category_row.js');
var ProductRow = require('./product_row.js');
var ProductTable = require('./product_table.js');
var SearchBar = require('./search_box.js');

var PRODUCTS = [
  {category: '30 Year Fix', price: '4.25%', stocked: false, name: 'BankA'},
  {category: '30 Year Fix', price: '4.25%', stocked: false, name: 'BankB'},
  {category: '30 Year Fix', price: '3.75%', stocked: true, name: 'BankC'},
  {category: '7/1 ARM', price: '3.25%', stocked: false, name: 'BankD'},
  {category: '7/1 ARM', price: '2.75%', stocked: true, name: 'BankE'},
  {category: '7/1 ARM', price: '3.25%', stocked: false, name: 'BankF'}
];

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false,
      products: PRODUCTS
    };
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      <div>
        <h2>Find Loan</h2>
        <SearchBar
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly}
        onUserInput={this.handleUserInput}
        />
        <ProductTable
        products={this.state.products}
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly}
        />
      </div>
      );
  }
});

module.exports = FilterableProductTable;