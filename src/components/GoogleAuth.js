import React from 'react';


class GoogleAuth extends React.Component {
  state = { isSignedIn: null };


  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '928740437205-pechbq095osbgdod30ofj6c1dd9glpn9.apps.googleusercontent.com',
        scope: 'email',
        plugin_name: "streamy",
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({isSignedIn: this.auth.isSignedIn.get()});
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
      <button onClick={this.onSignOut} className='ui red google button'>
        <i className='google icon' />
        Sign Out
      </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className='ui red google button'>
          <i className='google icon' />
          Sign in with google
        </button>
      );
    };
  };

  render() {
    return(
      <div>{this.renderAuthButton()}</div>
    );
  };
};

export default GoogleAuth;
