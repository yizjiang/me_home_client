var ProductCategoryRow = require('./product_category_row.js');
var ProductRow = require('./product_row.js');

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      );
  }
});

module.exports = ProductTable