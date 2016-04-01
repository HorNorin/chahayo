export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.isFinished = false;
  }

  componentDidUpdate() {
    if (!this.props.loading && !this.isFinished) {
      this.isFinished = true;
      if (this.props.onLoaded) {
        this.props.onLoaded();
      }
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="loading">
          <img src="img/loading.gif" />
          <div>Loading...</div>
        </div>
      );
    } else {
      return (
        <div>{this.props.children}</div>
      );
    }
  }
}
