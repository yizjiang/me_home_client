var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
//      this.refs.filterTextInput.getDOMNode().value,
//      this.refs.inStockOnlyInput.getDOMNode().checked
    );
  },
  render: function() {
    return (
      <form>
        <input
        type="text"
        placeholder="Search..."
        value={this.props.filterText}

        onChange={this.handleChange}
        />
        <p>
          <input
          type="checkbox"
          checked={this.props.inStockOnly}

          onChange={this.handleChange}
          />
                    {' '}
        Only show lowest
        </p>
      </form>
      );
  }
});

module.exports = SearchBar